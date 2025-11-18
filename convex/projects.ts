import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new project
export const createProject = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to create a project");
    }

    const userId = identity.subject;
    const now = Date.now();

    const projectId = await ctx.db.insert("projects", {
      name: args.name,
      userId,
      createdAt: now,
      updatedAt: now,
    });

    return projectId;
  },
});

// List all projects for the authenticated user
export const listProjects = query({
  handler: async (ctx) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to list projects");
    }

    const userId = identity.subject;

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return projects;
  },
});

// Delete a project and all its associated images
export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to delete a project");
    }

    const userId = identity.subject;

    // Verify project ownership
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (project.userId !== userId) {
      throw new Error("Unauthorized: You can only delete your own projects");
    }

    // Delete all images associated with the project
    const images = await ctx.db
      .query("images")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .collect();

    for (const image of images) {
      await ctx.db.delete(image._id);
    }

    // Delete the project
    await ctx.db.delete(args.projectId);

    return { success: true };
  },
});

// Update project name
export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to update a project");
    }

    const userId = identity.subject;

    // Verify project ownership
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (project.userId !== userId) {
      throw new Error("Unauthorized: You can only update your own projects");
    }

    // Update the project
    await ctx.db.patch(args.projectId, {
      name: args.name,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get a single project by ID
export const getProject = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    // Check authentication
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Must be logged in to view a project");
    }

    const userId = identity.subject;

    // Get the project
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    if (project.userId !== userId) {
      throw new Error("Unauthorized: You can only view your own projects");
    }

    return project;
  },
});
