(async () => {
  const { activeModules = {} } = await chrome.storage.sync.get("activeModules");

  const activeKeys = Object.entries(activeModules)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key);

  chrome.runtime.sendMessage({ action: "updateBadge", count: activeKeys.length });

  for (const module of activeKeys) {
    try {
      const modUrl = chrome.runtime.getURL(`modules/${module}.js`);
      const mod = await import(modUrl);
      if (mod && typeof mod.run === 'function') {
        mod.run();
      }
    } catch (e) {
      console.error("Erreur lors du chargement du module:", module, e);
    }
  }
})();
