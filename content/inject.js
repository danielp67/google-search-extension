(async () => {
  const { activeModules = [] } = await chrome.storage.sync.get("activeModules");

  chrome.runtime.sendMessage({ action: "updateBadge", count: activeModules.length });
      console.log("Chargement du module:");

  for (const module of activeModules) {
    try {
      const mod = await import(`../modules/${module}.js`);
      console.log("Chargement du module:", module);
      if (mod && typeof mod.run === 'function') {
        mod.run();
      }
    } catch (e) {
      console.error("Erreur lors du chargement du module:", module, e);
    }
  }
})();