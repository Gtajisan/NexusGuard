# Nexus Guard v4.0

**Smart Aincrad CF Bypass & JS Injector**  
A Chrome/Edge/Brave extension with a clean Apple-style glassmorphism UI.

---

## Features

- Apple-style transparent glassmorphism UI
- License key authentication via secure API
- Automatic version check with update prompt
- 30-second countdown sync timer with animated ring
- CF bypass payload injection into authorized target domains
- Side Panel (Desktop) + Popup (Mobile) hybrid support
- Manifest V3 compliant

---

## Project Structure

```
extracted_extension/
├── manifest.json       # Extension configuration (MV3)
├── popup.html          # Main UI
├── background.js       # Service worker
├── css/
│   └── style.css       # Glassmorphism styles
├── js/
│   └── popup.js        # Core logic
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## How to Load Locally (Development)

1. Open Chrome / Edge / Brave and go to `chrome://extensions/`
2. Enable **Developer Mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `extracted_extension/` folder
5. The extension icon will appear in your toolbar

---

## How to Upload to Chrome Web Store

### Prerequisites
- A Google account
- A one-time $5 developer registration fee at [https://chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)

### Steps

1. **Package the extension**
   - Zip the contents of the `extracted_extension/` folder (not the folder itself — zip the files inside it)
   - Name it `nexus-guard-v4.zip`

2. **Go to Chrome Web Store Developer Dashboard**
   - Visit [https://chrome.google.com/webstore/devconsole](https://chrome.google.com/webstore/devconsole)
   - Sign in with your Google account

3. **Create a new item**
   - Click **New Item**
   - Upload your `nexus-guard-v4.zip` file

4. **Fill in store listing details**
   - **Name:** Nexus Guard
   - **Short description:** Smart Aincrad CF Bypass & JS Injector
   - **Category:** Productivity or Developer Tools
   - **Language:** English
   - Upload screenshots (1280×800 or 640×400)
   - Upload a promotional tile (440×280)

5. **Privacy & Permissions**
   - Justify each permission the extension uses in the "Single Purpose" section
   - `tabs` — to detect active tab URL
   - `scripting` — to inject the bypass payload
   - `storage` — to persist the license key and device ID
   - `activeTab` — to interact with the current tab
   - `sidePanel` — to open as a side panel on desktop

6. **Submit for review**
   - Click **Submit for Review**
   - Google reviews typically take 1–3 business days

---

## How to Upload to Microsoft Edge Add-ons

1. Visit [https://partner.microsoft.com/en-us/dashboard/microsoftedge/](https://partner.microsoft.com/en-us/dashboard/microsoftedge/)
2. Sign in with a Microsoft account
3. Click **Create new extension**
4. Upload the same `nexus-guard-v4.zip` package
5. Fill in the listing details and submit for review
6. Edge reviews typically take 1–7 business days

---

## How to Upload to Firefox Add-ons (AMO)

> Note: Firefox uses Manifest V2. To publish on Firefox, you'll need a separate MV2 build.

1. Visit [https://addons.mozilla.org/en-US/developers/](https://addons.mozilla.org/en-US/developers/)
2. Sign in or create a Firefox account
3. Click **Submit a New Add-on**
4. Upload your zip and follow the review process

---

## How to Upload to Opera Add-ons

1. Visit [https://addons.opera.com/developer/](https://addons.opera.com/developer/)
2. Sign in and submit the same Chrome-compatible zip

---

## Packaging Tips

- Always zip the **contents** of `extracted_extension/`, not the folder itself
- Make sure `manifest.json` is at the root of the zip
- Remove any development/debug files before packaging
- Test with **Load unpacked** locally before submitting

---

## Developer

**Ahmed Numan**  
Lead Developer — Web Automation & Browser Extension Specialist  
Portfolio: [https://ahmednuman.netlify.app](https://ahmednuman.netlify.app)  
Telegram: [https://t.me/ImUnknownBro2](https://t.me/ImUnknownBro2)  
Channel: [https://t.me/aincradnexus](https://t.me/aincradnexus)

---

## License

© 2026 Ahmed Numan. All rights reserved.  
Unauthorized redistribution is prohibited.
