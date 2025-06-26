document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('modules-form');
  const status = document.getElementById('status');

  const { activeModules = [] } = await chrome.storage.sync.get("activeModules");

  activeModules.forEach(id => {
    const checkbox = document.getElementById(id);
    if (checkbox) checkbox.checked = true;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const selected = [...form.querySelectorAll('input:checked')].map(i => i.value);
    await chrome.storage.sync.set({ activeModules: selected });
    status.textContent = "Préférences enregistrées ✔️";

    chrome.runtime.sendMessage({ action: "updateBadge", count: selected.length });
  });
});