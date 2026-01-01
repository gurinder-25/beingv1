# PWA Setup Instructions

Your BeingOne app is now configured as a Progressive Web App (PWA)! Follow these steps to make it installable.

## Step 1: Generate App Icons

You have 3 options:

### Option A: Use the Icon Generator (Easiest)
1. Open `public/generate-icons.html` in your browser
2. Right-click on each canvas and select "Save image as..."
3. Save as `icon-192.png` and `icon-512.png` in the `public` folder
4. Done!

### Option B: Use Online Tool
1. Go to https://www.pwabuilder.com/imageGenerator
2. Upload any square image (logo, screenshot, etc.)
3. Download the generated icons
4. Copy `icon-192.png` and `icon-512.png` to the `public` folder

### Option C: Create Manually
1. Create two PNG images: 192x192px and 512x512px
2. Black background with white "B" (or your custom logo)
3. Save as `icon-192.png` and `icon-512.png` in the `public` folder

## Step 2: Build and Serve

```bash
# Development
npm run dev

# Production build
npm run build
npm run preview
```

## Step 3: Test Installation

### On Desktop (Chrome):
1. Open the app in Chrome
2. Look for the install icon in the address bar (⊕ or computer icon)
3. Click "Install"

### On Mobile (Chrome/Safari):
1. Open the app in mobile browser
2. Tap the Share button (iOS) or Menu (Android)
3. Select "Add to Home Screen"

## Requirements for PWA Install Prompt

✅ HTTPS (or localhost for testing)
✅ Valid manifest.json
✅ Service worker registered
✅ 192x192 and 512x512 icons
✅ Valid start_url

## Files Created

- `public/manifest.json` - PWA configuration
- `public/sw.js` - Service worker for offline support
- `index.html` - Updated with PWA meta tags
- `public/generate-icons.html` - Icon generator tool

## Testing

1. Open DevTools (F12)
2. Go to "Application" tab
3. Check "Manifest" section - should show all icons and config
4. Check "Service Workers" - should show registered worker
5. Click "Add to home screen" under Manifest

## Troubleshooting

**Install button not showing?**
- Make sure you're on HTTPS or localhost
- Check that icons exist (icon-192.png and icon-512.png)
- Clear cache and reload

**Service worker not registering?**
- Check browser console for errors
- Make sure sw.js is in the public folder
- Try hard refresh (Ctrl+Shift+R)

**Icons not showing?**
- Generate the PNG icons using the HTML tool
- Make sure they're in the public folder
- Check file names match exactly: icon-192.png and icon-512.png
