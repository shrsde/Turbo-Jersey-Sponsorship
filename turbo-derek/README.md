# Turbo Derek Pricing Framework

Interactive sponsorship pricing framework for the Derek/Theocy conversation.

---

## Deploy to Vercel (5 minutes, free)

### Option A — Drag-and-drop (easiest)

1. Go to **https://vercel.com/signup** and create a free account (use your email or GitHub)
2. Once logged in, click **"Add New..."** → **"Project"**
3. On the import page, look for **"Clone Template"** or scroll down to **"Deploy by importing a Git Repository"**
4. Actually, for the drag-and-drop path: go to **https://vercel.com/new** → click the **"Deploy"** button at bottom → **"Upload Folder"**
5. Drag this entire `turbo-derek` folder into the upload area
6. Vercel will auto-detect Next.js. Click **"Deploy"**
7. Wait ~60 seconds
8. Your live URL appears — something like `turbo-derek-pricing.vercel.app`

### Option B — Via GitHub (if you prefer)

1. Create a new GitHub repo (private or public)
2. Upload this folder to the repo
3. In Vercel, click **"Add New..." → "Project"**
4. Import your GitHub repo
5. Click **"Deploy"**
6. Done

### Option C — Vercel CLI (if you're comfortable with terminal)

```bash
cd turbo-derek
npx vercel
```

Follow the prompts. Done in 30 seconds.

---

## Your shareable URL

Once deployed, you'll get a URL like:
- `https://turbo-derek-pricing.vercel.app` (default)
- or a custom subdomain you can name in Vercel settings

**To customize the URL:**
- In Vercel dashboard → Settings → Domains → add a custom name like `derek-pricing.vercel.app` or hook up a custom domain like `derek.goturbo.ca`

---

## What Derek sees

- Fully interactive: scenario toggles, section expand/collapse, Framing A/B switch, math breakdown
- Works on any device (phone, tablet, desktop)
- No login required
- Loads in under a second

---

## Making updates

If you need to change numbers or copy:
1. Edit `src/app/page.js`
2. Re-upload via Vercel dashboard OR push to GitHub (if you used Option B)
3. Vercel auto-deploys in ~60 seconds

---

## Project structure

```
turbo-derek/
├── package.json          # Dependencies
├── next.config.js        # Next.js config
├── README.md             # This file
└── src/
    └── app/
        ├── layout.js     # Root layout + fonts
        └── page.js       # The Derek pricing component
```

---

Built for Jessica at Turbo Sports & Performance Centre.
