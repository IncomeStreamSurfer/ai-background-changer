import { Doc, Id } from "./_generated/dataModel";

// Re-export common types for easier frontend usage
export type Project = Doc<"projects">;
export type Image = Doc<"images">;
export type ProjectId = Id<"projects">;
export type ImageId = Id<"images">;

// Response types for Gemini actions
export type EditBackgroundResponse = {
  success: boolean;
  imageData: string;
};

export type AnalyzeImageResponse = {
  success: boolean;
  suggestions: string;
};

export type BackgroundVariation = {
  style: string;
  imageData: string;
};

export type GenerateVariationsResponse = {
  success: boolean;
  variations: BackgroundVariation[];
};
