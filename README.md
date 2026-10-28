# Shri Kanchan Dialysis Centre — Tailwind Website + Admin CMS

## What is included

- Public pages: Home, About, Services, Patient Resources, Gallery, News & Updates, Get Involved, Donate, and Contact.
- Sticky, responsive navigation with a larger logo and the brand text “Shri Kanchan Dialysis” and “Shri Krishan Kanchan Sewa Trust”.
- Home hero uses a real photograph of the centre entrance and highlights “Rajasthan’s First Free Dialysis Center”.
- About page with story, values, a journey timeline, facility/community images, and trustee cards loaded from published CMS profiles (existing names remain as a fallback until individual portraits are published).
- Services page with a dialysis-room hero image, service cards, and facility photographs.
- Gallery shows only published images placed in approved hospital/facility/dialysis/equipment/community-event categories. It is not filled with a static image list.
- News & Updates loads published CMS photos and videos. Patient posts appear only after the administrator confirms documented consent and publishes them.
- Private direct `/admin` route (not linked in public navigation), admin login, draft/publish, edit/delete, trustee profiles, and optional Cloudinary image/video upload.
- Express API with MongoDB persistence, HTTP-only JWT cookie sessions, rate limiting, Helmet, CORS allow-list, content validation, and admin-only content routes.

## 1. Run the frontend

Use Node.js 20 or newer.

```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Make sure the root `.env` contains:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

The public site shell can render without the CMS service, but Gallery, News, patient posts, and trustee profiles require the API and its database.

## 2. Configure and run the API

In a second terminal:

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Edit `server/.env` before starting. Required values:

- `MONGODB_URI`: a MongoDB local/Atlas connection string.
- `JWT_SECRET`: a unique random secret of at least 32 characters. For example, generate one using `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: the private initial administrator account. Password must be at least 12 characters and must not use example credentials.
- `FRONTEND_URL`: the exact frontend origin. Add any additional approved origins to `ALLOWED_ORIGINS`.

File uploads from the admin panel require `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Without them, the panel can save an existing HTTP(S) media URL but cannot persist uploaded files.

The server creates the configured administrator only if that email does not already exist. Public registration is disabled. Changing `ADMIN_PASSWORD` after account creation does not rotate an existing account's password.

Open `http://localhost:5173/admin` to sign in. Items remain drafts until **Publish this content** is checked and the item is saved. Gallery and News display only published records. The public patient-post API additionally filters for recorded consent.

## 3. Deploy frontend and API separately

1. Deploy the root Vite app. Configure `VITE_API_URL` to the deployed API base URL ending in `/api`.
2. Deploy the `server/` folder as a Node.js service and configure all server environment variables in the hosting provider's private settings.
3. Add the exact frontend origin to `FRONTEND_URL` or `ALLOWED_ORIGINS`.
4. Configure MongoDB network access and Cloudinary if file upload is required.
5. The `vercel.json` SPA rewrites allow direct frontend routes such as `/about`, `/services`, and `/admin` on Vercel.
6. Before launch, test admin sign-in/out, draft vs published content, uploads, responsive navigation, all public routes, and image/video playback in a real browser.

## Security and content notes

- Never commit real `.env` files, database credentials, Cloudinary secrets, JWT secrets, or production admin passwords.
- In production, serve the frontend and API over HTTPS. Admin cookies are `HttpOnly`; production cross-site deployment uses `SameSite=None; Secure`.
- The supplied website includes initial trustee names/roles in the About page. It does not include verified individual headshots for those names, so the existing group photo is shown until verified individual photos are added and published in `/admin`. Published trustee CMS cards require an image.
- Patient content should only be published after the organisation confirms valid documented consent. The code enforces the admin's consent confirmation but cannot independently verify the underlying document.
- Confirm the “first free” organisational claim, treatment/service claims, opening hours, trustee information, and donation recipient/account details with authorised centre staff before public launch or accepting contributions.

## Validation status

- JavaScript/JSX syntax checks pass for the frontend source files.
- `node --check` passes for all server source modules.
- Relative frontend imports resolve.
- The frontend production build could not be run in this environment because package installation timed out. Run `npm install && npm run build` in an environment with npm registry access before deployment.
- No live MongoDB or Cloudinary credentials were provided, so login, persistent CMS writes, and uploads have not been end-to-end tested here.
