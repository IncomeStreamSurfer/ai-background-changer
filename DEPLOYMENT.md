# Deployment Guide - AI Background Changer

Your application is ready to deploy! The code has been pushed to GitHub at:
**https://github.com/IncomeStreamSurfer/ai-background-changer**

## Digital Ocean Deployment Issue

The provided API key is returning authentication errors. This could mean:
1. The token has expired
2. The token doesn't have write permissions for App Platform
3. The token scope needs to be updated

## Option 1: Deploy via Digital Ocean Dashboard (Recommended)

1. Go to https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Select "GitHub" as source
4. Authorize Digital Ocean to access your GitHub account
5. Select repository: `IncomeStreamSurfer/ai-background-changer`
6. Select branch: `main`
7. Digital Ocean will auto-detect it's a Next.js app
8. Configure the app:
   - **Build Command**: `npm install && npm run build`
   - **Run Command**: `npm start`
   - **HTTP Port**: 3000

9. Add Environment Variables in the dashboard:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_CONVEX_URL=https://flexible-sturgeon-695.convex.cloud
   CONVEX_DEPLOYMENT=dev:flexible-sturgeon-695
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dG9nZXRoZXItZG9nLTQzLmNsZXJrLmFjY291bnRzLmRldiQ
   CLERK_SECRET_KEY=sk_test_xQ5ler6ARaI6DI2XOIMHTKJiczi47BIqpK6IXt8kyj
   CLERK_JWT_ISSUER_DOMAIN=https://together-dog-43.clerk.accounts.dev
   ```

10. Select your plan (Basic is fine to start)
11. Click "Create Resources"
12. Wait for deployment (usually 5-10 minutes)

## Option 2: Deploy via CLI with New API Key

If you want to use the CLI, generate a new API token with full permissions:

1. Go to https://cloud.digitalocean.com/account/api/tokens
2. Click "Generate New Token"
3. Name it "App Platform Deployment"
4. Select **ALL scopes** (especially "write" for apps)
5. Copy the new token
6. Run:
   ```bash
   doctl auth init --access-token YOUR_NEW_TOKEN
   doctl apps create --spec .do/app.yaml
   ```

## Option 3: Deploy to Vercel (Alternative)

Since this is a Next.js app, Vercel is the easiest option:

1. Go to https://vercel.com
2. Import your GitHub repository
3. Add the same environment variables
4. Click Deploy

## After Deployment

Once deployed, you'll need to:

1. **Update Clerk Settings:**
   - Go to https://dashboard.clerk.com
   - Add your production URL to allowed domains
   - Update redirect URLs

2. **Update Convex Settings:**
   - The app is currently using the dev deployment
   - Consider creating a production Convex deployment

3. **Test the Application:**
   - Sign up/Sign in
   - Create a project
   - Upload an image
   - Test background changing

## Current Status

✅ Code pushed to GitHub: https://github.com/IncomeStreamSurfer/ai-background-changer
✅ App spec created at `.do/app.yaml`
❌ Digital Ocean API authentication failed (need new token or manual deployment)

## Need Help?

If you run into issues:
1. Check the Digital Ocean build logs
2. Verify all environment variables are set correctly
3. Ensure Clerk and Convex are configured for production URLs
4. Check that the Gemini API key is valid
