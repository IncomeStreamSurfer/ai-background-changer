# Quick API Reference

## Projects

### Create Project
```typescript
const projectId = await createProject({ name: "My Project" });
```

### List Projects
```typescript
const projects = useQuery(api.projects.listProjects);
// Returns: Project[] with { _id, name, userId, createdAt, updatedAt }
```

### Delete Project
```typescript
await deleteProject({ projectId });
// Also deletes all associated images
```

### Update Project
```typescript
await updateProject({ projectId, name: "New Name" });
```

## Images

### Save Image
```typescript
await saveImage({
  projectId,
  originalImageUrl: "data:image/png;base64,...",
  editedImageUrl: "data:image/png;base64,...",
  prompt: "modern studio background"
});
```

### Get Project Images
```typescript
const images = useQuery(api.images.getProjectImages, { projectId });
// Returns: Image[] with all image details
```

### Delete Image
```typescript
await deleteImage({ imageId });
```

### List All User Images
```typescript
const allImages = useQuery(api.images.listAllImages);
// Returns all images across all projects for current user
```

## AI Background Editing

### Edit Single Background
```typescript
const result = await editBackground({
  base64Image: "base64string...",
  mimeType: "image/png",
  prompt: "luxury showroom with soft lighting"
});
// Returns: { success: true, imageData: "data:image/png;base64,..." }
```

### Get AI Suggestions
```typescript
const suggestions = await analyzeImage({
  base64Image: "base64string...",
  mimeType: "image/png"
});
// Returns: { success: true, suggestions: "modern studio, outdoor setting, gradient" }
```

### Generate Multiple Variations
```typescript
const variations = await generateVariations({
  base64Image: "base64string...",
  mimeType: "image/png",
  backgroundStyles: ["modern studio", "outdoor nature", "luxury showroom"]
});
// Returns: { success: true, variations: [{ style, imageData }, ...] }
```

## Common Patterns

### Complete Workflow
```typescript
// 1. Create project
const projectId = await createProject({ name: "Product Photos" });

// 2. Edit image
const edited = await editBackground({
  base64Image: originalImage,
  mimeType: "image/png",
  prompt: "modern minimalist background"
});

// 3. Save result
await saveImage({
  projectId,
  originalImageUrl: originalImage,
  editedImageUrl: edited.imageData,
  prompt: "modern minimalist background"
});

// 4. View all project images
const images = useQuery(api.images.getProjectImages, { projectId });
```

### Batch Processing
```typescript
// Get AI suggestions first
const { suggestions } = await analyzeImage({
  base64Image: image,
  mimeType: "image/png"
});

// Parse suggestions and generate variations
const styles = suggestions.split(",").map(s => s.trim());
const { variations } = await generateVariations({
  base64Image: image,
  mimeType: "image/png",
  backgroundStyles: styles
});

// Save all variations
for (const variation of variations) {
  await saveImage({
    projectId,
    originalImageUrl: image,
    editedImageUrl: variation.imageData,
    prompt: variation.style
  });
}
```

## Error Handling

All functions throw errors with descriptive messages:
- "Unauthorized: Must be logged in..." - User not authenticated
- "Project not found" - Invalid project ID
- "Unauthorized: You can only..." - User doesn't own the resource
- "GEMINI_API_KEY not configured" - Missing environment variable
- "Failed to edit image background: ..." - AI processing error

Handle with try/catch:
```typescript
try {
  const result = await editBackground({ ... });
} catch (error) {
  console.error("Failed to edit:", error.message);
  // Show error to user
}
```
