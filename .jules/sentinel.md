## 2026-05-23 - [XSS and Session Inconsistency]
**Vulnerability:** Widespread XSS vulnerabilities in the Portal and main app due to unsafe `innerHTML` usage with user-controllable data. Also, `login.html` uses `localStorage` for session data while `portal.html` expects `sessionStorage`, causing a session bypass/failure.
**Learning:** The application lacks a centralized sanitization strategy, relying on `innerHTML` for dynamic rendering. Inconsistent use of Web Storage APIs can lead to broken authentication flows and security gaps.
**Prevention:** Implement a global `escapeHTML` utility and ensure all dynamic data rendered via `innerHTML` is sanitized. Standardize on `sessionStorage` for sensitive session identifiers to ensure they are cleared when the browser tab is closed.
