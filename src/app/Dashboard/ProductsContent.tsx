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
import { Loader2, Minus, Plus, Upload, X } from "lucide-react";
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  useEffect(() => {
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

    fetchProducts();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "stock" ||
        name === "categoryid" ||
        name === "subcategoryid"
          ? parseInt(value, 10)
          : value,
    }));
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

    if (!selectedImage) {
      setError("Please select an image for the product");
      return;
    }

    try {
      const storageRef = ref(storage, `products/${selectedImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

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
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const productToAdd: NewProduct = {
            ...newProduct,
            image_path: downloadURL,
          };

          const response = await fetch("/api/products/product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productToAdd),
          });

          if (!response.ok) {
            throw new Error(`Failed to add product ${response.statusText}`);
          }

          const addedProduct = await response.json();
          setProducts((prevProducts) => [...prevProducts, addedProduct]);
          setIsModalOpen(false);
          resetForm();
          toast({
            title: "Product added successfully",
            description: "The new product has been added to the catalog.",
          });
        }
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      toast({
        title: "Error",
        description: "Failed to add the product. Please try again.",
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
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
    setUploadProgress(0);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Listing</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  name="material"
                  value={newProduct.material}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryid">Category ID</Label>
                <Input
                  id="categoryid"
                  name="categoryid"
                  type="number"
                  value={newProduct.categoryid}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategoryid">Subcategory ID</Label>
                <Input
                  id="subcategoryid"
                  name="subcategoryid"
                  type="number"
                  value={newProduct.subcategoryid}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageInput">Product Image</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="imageInput"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Select Image
                  </Label>
                  {selectedImage && (
                    <Button
                      type="button"
                      onClick={handleClearImage}
                      variant="destructive"
                      size="icon"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
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
                ) : (
                  "Add Product"
                )}
              </Button>
            </form>
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
                  <Button className="w-full mx-2" onClick={() => {}}>
                    View Details
                  </Button>
                  <Button
                    className="w-full mx-2"
                    variant="destructive"
                    disabled={removingProduct}
                    onClick={() => handleProductRemove(product.id)}
                  >
                    Remove this Product
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
