import React from "react";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";

export default function ProductsContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Please select a valid image file.");
      }
    }
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Image Uploader</h2>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageInput"
        />
        <label
          htmlFor="imageInput"
          className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Select Image
        </label>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {selectedImage && (
        <div className="mb-4">
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
      {selectedImage && (
        <Button onClick={handleClearImage} variant="destructive">
          Clear Image
        </Button>
      )}
    </div>
  );
}
