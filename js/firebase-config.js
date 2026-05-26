// Centralized Data Layer for Tenzin Academy Portal
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwTEA-dn3wfC6yvVwOjJqqyIah8owda_JuwlFLdW7hTVp0przXRXwQdAzb7TjKbZZPn/exec';

const dataStore = {
  _cache: {},
  listeners: {},

  get: async (node) => {
    if (dataStore._cache[node]) return dataStore._cache[node];
    const val = localStorage.getItem('tenzin_' + node);
    const parsed = val ? JSON.parse(val) : null;
    dataStore._cache[node] = parsed;
    return parsed;
  },

  set: async (node, val) => {
    dataStore._cache[node] = val;
    localStorage.setItem('tenzin_' + node, JSON.stringify(val));
    if (dataStore.listeners[node]) {
      dataStore.listeners[node].forEach(cb => cb(val));
    }
    return true;
  },

  onValue: (node, cb) => {
    if (!dataStore.listeners[node]) dataStore.listeners[node] = [];
    dataStore.listeners[node].push(cb);
    dataStore.get(node).then(val => cb(val));
  }
};

function syncToAppsScript(data) {
  if (!SCRIPT_URL) return;
  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).catch(err => console.warn('Background sync failed:', err));
}

(function seedDatabaseIfEmpty() {
    dataStore.get('accounts').then(accs => {
        if (!accs) {
            dataStore.set('accounts', []);
            dataStore.set('students', []);
            dataStore.set('teachers', []);
            dataStore.set('assignments', []);
            dataStore.set('notices', []);
            dataStore.set('resources', []);
            dataStore.set('leaves', []);
        }
    });
})();
