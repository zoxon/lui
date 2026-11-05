// Runs synchronously in <head> before any stylesheet, so the saved or system
// theme is applied on first paint. Keep the logic in sync with
// ThemeToggleClient.getInitialTheme().
export const THEME_INIT_SCRIPT = '(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.dataset.theme="dark"}catch(e){}})()'
