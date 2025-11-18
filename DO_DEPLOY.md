# QUICK DIGITAL OCEAN DEPLOYMENT

## 🚀 Deploy in 5 Minutes

Your code is at: **https://github.com/IncomeStreamSurfer/ai-background-changer**

### Step 1: Go to Digital Ocean
1. Visit: https://cloud.digitalocean.com/apps/new
2. Click **"Create App"**

### Step 2: Connect GitHub
1. Select **GitHub** as source
2. Authorize Digital Ocean
3. Choose repository: `IncomeStreamSurfer/ai-background-changer`
4. Branch: `main`
5. Click **Next**

### Step 3: Configure Build
- **Build Command**: `npm run build`
- **Run Command**: `npm start`
- **HTTP Port**: `3000`
- Click **Next**

### Step 4: Add Environment Variables
Click "Edit" next to environment variables and add these:

```
NODE_ENV=production
NEXT_PUBLIC_CONVEX_URL=https://flexible-sturgeon-695.convex.cloud
CONVEX_DEPLOYMENT=dev:flexible-sturgeon-695
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dG9nZXRoZXItZG9nLTQzLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_xQ5ler6ARaI6DI2XOIMHTKJiczi47BIqpK6IXt8kyj
CLERK_JWT_ISSUER_DOMAIN=https://together-dog-43.clerk.accounts.dev
```

### Step 5: Deploy
1. Choose **Basic** plan ($5/month or free trial)
2. Click **"Create Resources"**
3. Wait 5-10 minutes for deployment

### Done!
Your app will be live at a URL like: `https://ai-background-changer-xxxxx.ondigitalocean.app`

---

## Alternative: Use The Dashboard Link
Just go to: https://cloud.digitalocean.com/apps/new

Then select your GitHub repo and follow the wizard!
