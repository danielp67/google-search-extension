(async () => {
  const { activeModules = [] } = await chrome.storage.sync.get("activeModules");

  chrome.runtime.sendMessage({ action: "updateBadge", count: activeModules.length });

  for (const module of activeModules) {
    try {
      const mod = await import(`../modules/${module}.js`);
        if (mod && typeof mod.run === 'function') {
        mod.run();
      }
    } catch (e) {
      console.error("Erreur lors du chargement du module:", module, e);
    }
  }
})();