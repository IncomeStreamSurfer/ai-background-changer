import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save an image pair (original and edited)
export const saveImage = mutation({
  args: {
    projectId: v.id("projects"),
    originalImageUrl: v.string(),
    editedImageUrl: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to save an image");
    }

    const userId = identity.subject;

    // Verify project ownership
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (project.userId !== userId) {
      throw new Error("Unauthorized: You can only save images to your own projects");
    }

    // Save the image
    const imageId = await ctx.db.insert("images", {
      projectId: args.projectId,
      originalImageUrl: args.originalImageUrl,
      editedImageUrl: args.editedImageUrl,
      prompt: args.prompt,
      userId,
      createdAt: Date.now(),
    });

    return imageId;
  },
});

// Get all images for a project
export const getProjectImages = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to view images");
    }

    const userId = identity.subject;

    // Verify project ownership
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (project.userId !== userId) {
      throw new Error("Unauthorized: You can only view images from your own projects");
    }

    // Get all images for the project
    const images = await ctx.db
      .query("images")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();

    return images;
  },
});

// Delete an image
export const deleteImage = mutation({
  args: {
    imageId: v.id("images"),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to delete an image");
    }

    const userId = identity.subject;

    // Verify image ownership
    const image = await ctx.db.get(args.imageId);
    if (!image) {
      throw new Error("Image not found");
    }
    if (image.userId !== userId) {
      throw new Error("Unauthorized: You can only delete your own images");
    }

    // Delete the image
    await ctx.db.delete(args.imageId);

    return { success: true };
  },
});

// Get a single image by ID
export const getImage = query({
  args: {
    imageId: v.id("images"),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to view an image");
    }

    const userId = identity.subject;

    // Get the image
    const image = await ctx.db.get(args.imageId);
    if (!image) {
      throw new Error("Image not found");
    }
    if (image.userId !== userId) {
      throw new Error("Unauthorized: You can only view your own images");
    }

    return image;
  },
});

// Get all images for the authenticated user across all projects
export const listAllImages = query({
  handler: async (ctx) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to list images");
    }

    const userId = identity.subject;

    const images = await ctx.db
      .query("images")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return images;
  },
});
