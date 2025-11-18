"use client";

import React, { useState, useCallback } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import {
  ImageIcon,
  SparklesIcon,
  UploadIcon,
  LoadingSpinner,
  DownloadIcon,
} from "./icons";

interface BackgroundChangerProps {
  projectId: Id<"projects">;
}

export default function BackgroundChanger({ projectId }: BackgroundChangerProps) {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("a solid light grey background");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const editImageBackground = useAction(api.gemini.editImageBackground);
  const saveImage = useMutation(api.images.saveImage);

  const fileToBase64 = (file: File): Promise<{ base64Data: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(",")[1];
        if (base64Data) {
          resolve({ base64Data, mimeType: file.type });
        } else {
          reject(new Error("Could not extract base64 data from file."));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImage(file);
      setOriginalImageUrl(URL.createObjectURL(file));
      setEditedImageUrl(null);
      setError(null);
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError("Please upload an image and provide a prompt.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);

    try {
      const { base64Data, mimeType } = await fileToBase64(originalImage);

      const result = await editImageBackground({
        base64Image: base64Data,
        mimeType: mimeType,
        prompt: prompt,
      });

      if (result.success && result.imageData) {
        setEditedImageUrl(result.imageData);

        // Save to database
        await saveImage({
          projectId,
          originalImageUrl: originalImageUrl || "",
          editedImageUrl: result.imageData,
          prompt: prompt,
        });
      } else {
        throw new Error("The API did not return an image. Please try a different prompt.");
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt, editImageBackground, saveImage, projectId, originalImageUrl]);

  const handleDownload = () => {
    if (!editedImageUrl) return;

    const link = document.createElement("a");
    link.href = editedImageUrl;
    link.download = `edited-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ImagePlaceholder: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-600">
      <ImageIcon className="w-16 h-16 text-gray-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Controls Panel */}
        <div className="w-full lg:w-1/3 xl:w-1/4 bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col gap-6">
          <div>
            <label
              htmlFor="image-upload"
              className="text-lg font-medium text-gray-300 mb-2 block"
            >
              1. Upload Product Image
            </label>
            <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 hover:bg-gray-700/50 transition-colors">
              <input
                id="image-upload"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <UploadIcon className="w-10 h-10 text-gray-500 mb-2" />
                <p className="text-gray-400">
                  {originalImage
                    ? `Selected: ${originalImage.name}`
                    : "Click to upload or drag & drop"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="prompt-input"
              className="text-lg font-medium text-gray-300 mb-2 block"
            >
              2. Describe Background
            </label>
            <textarea
              id="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., a solid light blue background"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors placeholder-gray-500 text-gray-100"
              rows={3}
            />
          </div>

          <button
            onClick={handleGenerateClick}
            disabled={!originalImage || !prompt || isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Generate Background
              </>
            )}
          </button>

          {editedImageUrl && (
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300"
            >
              <DownloadIcon className="w-5 h-5" />
              Download Image
            </button>
          )}

          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        {/* Image Display */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-300">
              Original Image
            </h2>
            <div className="flex-grow aspect-square">
              {originalImageUrl ? (
                <img
                  src={originalImageUrl}
                  alt="Original product"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <ImagePlaceholder title="Upload an image" />
              )}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-300">
              Edited Image
            </h2>
            <div className="flex-grow aspect-square relative">
              {isLoading && (
                <div className="absolute inset-0 bg-gray-900/50 flex flex-col items-center justify-center z-10 rounded-lg">
                  <LoadingSpinner />
                  <p className="mt-2 text-gray-300">Editing with AI...</p>
                </div>
              )}
              {editedImageUrl ? (
                <img
                  src={editedImageUrl}
                  alt="Edited product"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                !isLoading && (
                  <ImagePlaceholder title="AI-generated image will appear here" />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
