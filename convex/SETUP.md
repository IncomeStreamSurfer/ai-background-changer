# Convex Backend Setup for Product Background Changer

This document outlines the Convex backend implementation for the product background changer application.

## Environment Variables

Add the following environment variable to your Convex deployment:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### Setting Environment Variables in Convex

1. **Via Dashboard:**
   - Go to your Convex dashboard
   - Navigate to Settings > Environment Variables
   - Add `GEMINI_API_KEY` with your Google AI API key

2. **Via CLI:**
   ```bash
   npx convex env set GEMINI_API_KEY your_api_key_here
   ```

## Database Schema

### Projects Table
- `name`: string - Project name
- `userId`: string - Owner's user ID (from Clerk)
- `createdAt`: number - Creation timestamp
- `updatedAt`: number - Last update timestamp
- **Indexes:** `by_userId`

### Images Table
- `projectId`: Id<"projects"> - Reference to parent project
- `originalImageUrl`: string - URL/data of original image
- `editedImageUrl`: string - URL/data of edited image
- `prompt`: string - Prompt used for editing
- `userId`: string - Owner's user ID (from Clerk)
- `createdAt`: number - Creation timestamp
- **Indexes:** `by_projectId`, `by_userId`

## API Reference

### Projects API (`convex/projects.ts`)

#### Mutations
- `createProject({ name })` - Create a new project
- `deleteProject({ projectId })` - Delete a project and all its images
- `updateProject({ projectId, name })` - Update project name

#### Queries
- `listProjects()` - Get all projects for authenticated user
- `getProject({ projectId })` - Get a single project by ID

### Images API (`convex/images.ts`)

#### Mutations
- `saveImage({ projectId, originalImageUrl, editedImageUrl, prompt })` - Save an image pair

#### Queries
- `getProjectImages({ projectId })` - Get all images for a project
- `deleteImage({ imageId })` - Delete an image
- `getImage({ imageId })` - Get a single image by ID
- `listAllImages()` - Get all images across all projects for authenticated user

### Gemini AI API (`convex/gemini.ts`)

#### Actions
- `editImageBackground({ base64Image, mimeType, prompt })` - Edit image background with custom prompt
  - Returns: `{ success: true, imageData: "data:image/png;base64,..." }`

- `analyzeImageForBackgroundPrompt({ base64Image, mimeType })` - Get AI suggestions for backgrounds
  - Returns: `{ success: true, suggestions: "style1, style2, style3" }`

- `generateBackgroundVariations({ base64Image, mimeType, backgroundStyles })` - Generate multiple variations
  - Returns: `{ success: true, variations: [{ style, imageData }] }`

## Authentication

All functions require authentication via Clerk. They check for `ctx.auth.getUserIdentity()` and will throw an error if the user is not logged in.

## Usage Examples

### Frontend Usage

```typescript
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Create a project
const createProject = useMutation(api.projects.createProject);
const projectId = await createProject({ name: "My Project" });

// List projects
const projects = useQuery(api.projects.listProjects);

// Edit an image background
const editBackground = useAction(api.gemini.editImageBackground);
const result = await editBackground({
  base64Image: imageData,
  mimeType: "image/png",
  prompt: "modern minimalist studio with soft lighting"
});

// Save the edited image
const saveImage = useMutation(api.images.saveImage);
await saveImage({
  projectId,
  originalImageUrl: originalData,
  editedImageUrl: result.imageData,
  prompt: "modern minimalist studio"
});

// Get project images
const images = useQuery(api.images.getProjectImages, { projectId });
```

## Features

1. **Project Management**
   - Create, list, update, and delete projects
   - Automatic ownership tracking via Clerk authentication

2. **Image Management**
   - Save original and edited image pairs
   - Track prompts used for editing
   - Query images by project or across all projects
   - Cascade delete images when project is deleted

3. **AI Image Editing**
   - Edit backgrounds using Gemini 2.5 Flash Image
   - Generate background suggestions using Gemini AI
   - Create multiple variations in parallel
   - Maintain product quality while changing backgrounds

## Security

- All mutations and queries verify user authentication
- Users can only access their own projects and images
- Ownership checks prevent unauthorized access
- API key stored securely in environment variables

## Next Steps

1. Set the `GEMINI_API_KEY` environment variable
2. Deploy your schema: `npx convex deploy`
3. Test the API functions via the Convex dashboard
4. Integrate with your Next.js frontend
