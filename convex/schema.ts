import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Schema for the product background changer application
export default defineSchema({
  projects: defineTable({
    name: v.string(),
    userId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  images: defineTable({
    projectId: v.id("projects"),
    originalImageUrl: v.string(),
    editedImageUrl: v.string(),
    prompt: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  })
    .index("by_projectId", ["projectId"])
    .index("by_userId", ["userId"]),
});
