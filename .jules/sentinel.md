## 2026-05-26 - XSS Protection and Session Hardening
**Vulnerability:** Extensive XSS surface area due to unsanitized data injection via `innerHTML` and insecure session persistence in `localStorage`.
**Learning:** Multi-page static apps often lack centralized sanitization. `innerHTML` was used for search results, portal data, and faculty lists. Authentication used `localStorage`, which persisted beyond the session.
**Prevention:** Implement a global `app.escapeHTML` utility. Always sanitize data before `innerHTML` injection. Use `sessionStorage` for sensitive session identifiers. Use `<base target="_self">` to prevent tabnabbing. Validate URL protocols (e.g., `http://`, `https://`) before passing to `window.open` to prevent `javascript:` URI attacks.
