# Cloudflare Deployment Guide
## GATI Website Landing Page

This guide explains how to deploy your static React + Vite site to **Cloudflare Workers** (configured for static assets).

---

## Cloudflare Workers Configuration

This project is configured to deploy to **Cloudflare Workers** using static assets. The configuration is already set up in `wrangler.jsonc`.

### Configuration Files

**`wrangler.jsonc`** - Already created with:
- Static assets directory: `./dist`
- Single-page-application routing (for React Router support)
- Assets binding for potential Worker code integration

### Build & Deploy Process

1. **Build the project:**
   ```bash
   npm run build
   ```
   This creates the `dist/` folder with all static assets.

2. **Deploy to Cloudflare Workers:**
   ```bash
   npm run deploy
   ```
   Or manually:
   ```bash
   npx wrangler deploy
   ```

### Cloudflare Pages Integration

If deploying via **Cloudflare Pages** (connected to GitHub):

**Build Settings:**
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Deploy command:** `npx wrangler deploy`

**Environment Variables:**
- `NODE_VERSION`: `22` (or `20`)
- `CLOUDFLARE_API_TOKEN`: (Optional, for authenticated deployments)

### First-Time Setup

1. **Install Wrangler CLI** (if not already installed):
   ```bash
   npm install
   ```
   Wrangler is included in `devDependencies`.

2. **Authenticate with Cloudflare:**
   ```bash
   npx wrangler login
   ```
   This opens a browser to authenticate with your Cloudflare account.

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Local Development

Test the Workers deployment locally:
```bash
npm run preview
```
This starts a local server that mimics the Workers environment.

---

## Verification

After deployment, verify:

1. ✅ Build completes: `npm run build` creates `dist/` folder
2. ✅ Deployment succeeds: `npm run deploy` completes without errors
3. ✅ Site is accessible: Visit the provided `*.workers.dev` URL
4. ✅ All assets load: Check browser console for 404 errors

**Expected build output:**
```
dist/index.html                   0.44 kB
dist/assets/index-*.css           95.56 kB
dist/assets/index-*.js           282.89 kB
dist/images/...                   (all images)
```

**Deployment output should show:**
```
✨ Compiled Worker successfully
✨ Uploaded Worker
✨ Published Worker
```

---

## How It Works

According to the [Cloudflare Workers Static Assets documentation](https://developers.cloudflare.com/workers/static-assets/):

1. **Static Assets:** Files in `dist/` are automatically uploaded and served
2. **Routing:** Requests matching files in `dist/` are served directly
3. **SPA Support:** Non-matching requests return `index.html` (React Router support)
4. **Caching:** Cloudflare automatically caches static assets globally
5. **CDN:** Assets are served from the nearest Cloudflare edge location

### Routing Behavior

- **File exists in `dist/`:** Served directly (e.g., `/images/logo.svg`)
- **File doesn't exist:** Returns `index.html` (for React Router client-side routing)
- **Worker code:** Can be added later via `src/index.ts` if needed

---

## Troubleshooting

### Error: "Missing entry-point to Worker script or to assets directory"
- **Cause:** `wrangler.jsonc` is missing or incorrectly configured
- **Fix:** Ensure `wrangler.jsonc` exists with `assets.directory` set to `./dist`

### Error: "Build output directory not found"
- **Cause:** Build output directory is incorrect
- **Fix:** Set it to `dist` (not `./dist` or `/dist`)

### Error: "Build failed"
- **Cause:** Build command failed
- **Fix:** Test locally with `npm run build` first

### Images not loading
- **Cause:** Images in `public/` need to be copied to `dist/`
- **Fix:** Vite should handle this automatically. Check that `public/images/` exists in `dist/images/`

---

## Advanced: Adding Worker Code (Optional)

If you need to add server-side logic later, create `src/index.ts`:

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Custom API routes
    if (url.pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ message: "API endpoint" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Serve static assets
    return env.ASSETS.fetch(request);
  },
};
```

Then update `wrangler.jsonc`:
```jsonc
{
  "main": "src/index.ts",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  }
}
```

**Note:** For a pure static site, you don't need this. The current configuration is sufficient.

---

## References

- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Wrangler Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Vite Build Configuration](https://vitejs.dev/guide/build.html)

---

**Current Setup:** ✅ Configured for **Cloudflare Workers** with static assets support.

