## 2025-05-15 - [XSS Protection & Session Hardening]
**Vulnerability:** Widespread use of `innerHTML` with unsanitized data from Firebase/LocalStorage and insecure global `<base target="_blank">` configuration.
**Learning:** The application lacked a centralized HTML escaping utility, leading to multiple XSS vectors in the portal. Additionally, the global `<base>` tag created a risk for reverse tabnabbing across all links.
**Prevention:** Always use `textContent` or a robust `escapeHTML` utility when injecting dynamic data. Standardize session storage to `sessionStorage` for sensitive portals to ensure data is cleared on tab closure. Use `<base target="_self">` to ensure internal navigation is secure by default.
