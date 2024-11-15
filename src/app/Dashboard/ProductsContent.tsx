"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus, RotateCw, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { storage } from "./firebase";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdat: string;
  image_path: string;
  categoryid: number;
  material: string;
  subcategoryid: number;
}

type NewProduct = Omit<Product, "id" | "createdat">;

interface ProductsResponse {
  products: Product[];
  currentPage: number;
  totalProducts: number;
  totalPages: number;
  nextPage: number | null;
  limit: number;
}

export default function ProductListingPage() {
  const { toast } = useToast();
  const [activeModal, setActiveModal] = useState<"add" | "update" | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [removingProduct, setRemovingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image_path: "",
    categoryid: 0,
    material: "",
    subcategoryid: 0,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);
  const [updatingProductId, setUpdatingProductId] = useState<number | null>(
    null
  );
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: ProductsResponse = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error loading products. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "price" ||
      name === "stock" ||
      name === "categoryid" ||
      name === "subcategoryid"
        ? parseInt(value, 10)
        : value;

    if (updatingProductId !== null && productToUpdate) {
      setProductToUpdate((prev) => ({ ...prev!, [name]: updatedValue }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: updatedValue }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
    setUploadProgress(0);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!selectedImage && updatingProductId === null) {
      setError("Please select an image for the product");
      return;
    }

    try {
      let imageUrl =
        updatingProductId !== null ? productToUpdate!.image_path : "";

      if (selectedImage) {
        const storageRef = ref(storage, `products/${selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Upload error:", error);
              setError("Failed to upload image. Please try again.");
              reject(error);
            },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const productData =
        updatingProductId !== null
          ? { ...productToUpdate!, image_path: imageUrl }
          : { ...newProduct, image_path: imageUrl };

      const response = await fetch("/api/products/product", {
        method: updatingProductId !== null ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${updatingProductId !== null ? "update" : "add"} product ${
            response.statusText
          }`
        );
      }

      const updatedProduct = await response.json();

      if (updatingProductId !== null) {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === updatingProductId ? updatedProduct : p
          )
        );
        setUpdatingProductId(null);
      } else {
        setProducts((prevProducts) => [...prevProducts, updatedProduct]);
      }

      setActiveModal(null);
      resetForm();
      toast({
        title: `Product ${
          updatingProductId !== null ? "updated" : "added"
        } successfully`,
        description: `The product has been ${
          updatingProductId !== null ? "updated in" : "added to"
        } the catalog.`,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      toast({
        title: "Error",
        description: `Failed to ${
          updatingProductId !== null ? "update" : "add"
        } the product. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleProductRemove = async (productId: number) => {
    setRemovingProduct(true);
    try {
      const response = await fetch(`/api/products/product`, {
        method: "POST",
        body: JSON.stringify({ id: productId, method: "delete" }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product ${response.statusText}`);
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      toast({
        title: "Product removed",
        description: "The product has been removed from the catalog.",
      });
    } catch (error) {
      console.error("Error removing product:", error);
      toast({
        title: "Error",
        description: "Failed to remove the product. Please try again.",
        variant: "destructive",
      });
    }
    setRemovingProduct(false);
  };

  const handleUpdateProduct = (product: Product) => {
    setProductToUpdate({ ...product });
    setPreviewUrl(product.image_path);
    setUpdatingProductId(product.id);
    setActiveModal("update");
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image_path: "",
      categoryid: 0,
      material: "",
      subcategoryid: 0,
    });
    setProductToUpdate(null);
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
    setUploadProgress(0);
    setUpdatingProductId(null);
  };

  const renderProductForm = (isUpdate: boolean) => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={isUpdate ? "update-name" : "add-name"}>
          Product Name
        </Label>
        <Input
          id={isUpdate ? "update-name" : "add-name"}
          name="name"
          value={isUpdate ? productToUpdate?.name : newProduct.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={isUpdate ? "update-description" : "add-description"}>
          Description
        </Label>
        <Textarea
          id={isUpdate ? "update-description" : "add-description"}
          name="description"
          value={
            isUpdate ? productToUpdate?.description : newProduct.description
          }
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={isUpdate ? "update-price" : "add-price"}>Price</Label>
        <Input
          id={isUpdate ? "update-price" : "add-price"}
          name="price"
          type="number"
          step="0.01"
          value={isUpdate ? productToUpdate?.price : newProduct.price}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={isUpdate ? "update-stock" : "add-stock"}>Stock</Label>
        <Input
          id={isUpdate ? "update-stock" : "add-stock"}
          name="stock"
          type="number"
          value={isUpdate ? productToUpdate?.stock : newProduct.stock}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={isUpdate ? "update-material" : "add-material"}>
          Material
        </Label>
        <Input
          id={isUpdate ? "update-material" : "add-material"}
          name="material"
          value={isUpdate ? productToUpdate?.material : newProduct.material}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={isUpdate ? "update-categoryid" : "add-categoryid"}>
          Category ID
        </Label>
        <Input
          id={isUpdate ? "update-categoryid" : "add-categoryid"}
          name="categoryid"
          type="number"
          value={isUpdate ? productToUpdate?.categoryid : newProduct.categoryid}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label
          htmlFor={isUpdate ? "update-subcategoryid" : "add-subcategoryid"}
        >
          Subcategory ID
        </Label>
        <Input
          id={isUpdate ? "update-subcategoryid" : "add-subcategoryid"}
          name="subcategoryid"
          type="number"
          value={
            isUpdate ? productToUpdate?.subcategoryid : newProduct.subcategoryid
          }
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={isUpdate ? "update-imageInput" : "add-imageInput"}>
          Product Image
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id={isUpdate ? "update-imageInput" : "add-imageInput"}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <Label
            htmlFor={isUpdate ? "update-imageInput" : "add-imageInput"}
            className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            <Upload className="w-5 h-5 mr-2" />
            {isUpdate ? "Change Image" : "Select Image"}
          </Label>
          {(selectedImage || previewUrl) && (
            <Button
              type="button"
              onClick={handleClearImage}
              variant="destructive"
              size="icon"
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Clear image</span>
            </Button>
          )}
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm" role="alert">
          {error}
        </p>
      )}
      {previewUrl && (
        <div className="mt-2">
          <img
            src={previewUrl}
            alt="Product preview"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
            role="progressbar"
            aria-valuenow={uploadProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Upload progress"
          ></div>
        </div>
      )}
      <Button
        type="submit"
        className="w-full"
        disabled={uploadProgress > 0 && uploadProgress < 100}
      >
        {uploadProgress > 0 && uploadProgress < 100 ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : isUpdate ? (
          "Update Product"
        ) : (
          "Add Product"
        )}
      </Button>
    </form>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button
          onClick={() => {
            setProducts(Array);
            fetchProducts();
          }}
        >
          <RotateCw className="mr-2 h-4 w-4" /> Refresh products
        </Button>
        <Dialog
          open={activeModal === "add"}
          onOpenChange={(open) => {
            setActiveModal(open ? "add" : null);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setActiveModal("add")}>
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4">{renderProductForm(false)}</div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {products.map((product) => (
            <motion.div
              key={product.id}
              layoutId={`card-${product.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={product.image_path}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <p className="font-bold">${product.price}</p>
                  <p className="text-sm">Material: {product.material}</p>
                  <p className="text-sm">Stock: {product.stock}</p>
                </CardContent>
                <CardFooter>
                  <Dialog
                    open={
                      activeModal === "update" &&
                      updatingProductId === product.id
                    }
                    onOpenChange={(open) => {
                      setActiveModal(open ? "update" : null);
                      setUpdatingProductId(open ? product.id : null);
                      if (!open) resetForm();
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="w-full mx-2"
                        onClick={() => handleUpdateProduct(product)}
                      >
                        Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                      </DialogHeader>
                      <div className="p-4 space-y-4">
                        {renderProductForm(true)}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    className="w-full mx-2"
                    variant="destructive"
                    disabled={removingProduct}
                    onClick={() => handleProductRemove(product.id)}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
