# Tenzin Academy content manager

## What changed
- Added `admin.html`, a small content manager for faculty, gallery entries and school contact details.
- Added `content.json` as the website's structured content source.
- The public faculty and gallery pages now load their data from `content.json`, while retaining the original built-in data as a fallback.

## Run locally
From the project directory:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/admin.html`. The editor uses browser local storage for drafts.

## Publish edits
1. Make changes in the content manager.
2. Select **Download content file**.
3. Replace the website's existing `content.json` on the hosting service with the downloaded file.
4. Refresh the public website.

Faculty photo files must also be uploaded to the website's root folder. Enter the exact filename in the editor.

## Important security and deployment notes
This is a static-site content editor. It does not provide user authentication or write directly to the live server. Do not expose `admin.html` publicly as a protected administrator area until server-side authentication and write permissions are added. The existing Google Apps Script endpoint currently handles form submissions; its source and authorization model were not available in this repository, so this change does not use it for content administration.

The editor currently manages faculty, gallery and school details. Other page copy, fee calculations, admission requirements and academic programme descriptions remain in their existing page files and are not yet editable here.
