import { v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenAI, Modality } from "@google/genai";

// Initialize Google AI client
function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it to your Convex environment variables.");
  }
  return new GoogleGenAI({ apiKey });
}

// Edit image background using Gemini AI
export const editImageBackground = action({
  args: {
    base64Image: v.string(),
    mimeType: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to edit images");
    }

    try {
      const ai = getAIClient();

      // Prepare the image data
      const imagePart = {
        inlineData: {
          data: args.base64Image.replace(/^data:image\/\w+;base64,/, ""), // Remove data URL prefix if present
          mimeType: args.mimeType,
        },
      };

      // Prepare the text prompt for background editing
      const textPart = {
        text: `Edit this product image: ${args.prompt}. Maintain the original product but change the background as described. Keep the product sharp and well-defined.`
      };

      // Call Gemini API to edit the image
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: { parts: [imagePart, textPart] },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      // Extract the edited image from the response
      const firstPart = response.candidates?.[0]?.content?.parts?.[0];
      if (firstPart && "inlineData" in firstPart && firstPart.inlineData) {
        // Return as base64 data URL
        return {
          success: true,
          imageData: `data:image/png;base64,${firstPart.inlineData.data}`,
        };
      }

      throw new Error("Could not find image data in the Gemini API response.");
    } catch (error) {
      console.error("Error editing image background:", error);
      throw new Error(
        `Failed to edit image background: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
});

// Analyze image to generate a background change prompt suggestion
export const analyzeImageForBackgroundPrompt = action({
  args: {
    base64Image: v.string(),
    mimeType: v.string(),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to analyze images");
    }

    try {
      const ai = getAIClient();

      const imagePart = {
        inlineData: {
          data: args.base64Image.replace(/^data:image\/\w+;base64,/, ""),
          mimeType: args.mimeType,
        },
      };

      const textPart = {
        text: `Analyze this product image. Identify the main product/subject. Suggest 3-5 different background settings that would showcase this product well.
        For example: "modern minimalist studio", "outdoor nature setting", "luxury showroom", "vibrant gradient", etc.
        Keep suggestions short and descriptive. Output as a comma-separated list only, no explanations.`,
      };

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [imagePart, textPart] },
      });

      return {
        success: true,
        suggestions: response.text?.trim() || "modern studio, outdoor setting, gradient background",
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      throw new Error(
        `Failed to analyze image: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
});

// Generate multiple background variations for a product image
export const generateBackgroundVariations = action({
  args: {
    base64Image: v.string(),
    mimeType: v.string(),
    backgroundStyles: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to generate variations");
    }

    try {
      const ai = getAIClient();

      const imagePart = {
        inlineData: {
          data: args.base64Image.replace(/^data:image\/\w+;base64,/, ""),
          mimeType: args.mimeType,
        },
      };

      // Generate variations in parallel
      const generationPromises = args.backgroundStyles.map(async (style) => {
        const textPart = {
          text: `Edit this product image: Change the background to ${style}. Maintain the original product perfectly but completely replace the background. Keep the product sharp and well-defined.`,
        };

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-image",
          contents: { parts: [imagePart, textPart] },
          config: {
            responseModalities: [Modality.IMAGE],
          },
        });

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart && "inlineData" in firstPart && firstPart.inlineData) {
          return {
            style,
            imageData: `data:image/png;base64,${firstPart.inlineData.data}`,
          };
        }

        throw new Error(`Failed to generate variation for style: ${style}`);
      });

      const variations = await Promise.all(generationPromises);

      return {
        success: true,
        variations,
      };
    } catch (error) {
      console.error("Error generating background variations:", error);
      throw new Error(
        `Failed to generate variations: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
});
