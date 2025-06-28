export function run() {
  const queryInput = document.querySelector('input[name="q"]');
  if (!queryInput) return;

  // Ne pas réinjecter si déjà présent
  if (document.getElementById("advanced-search-box")) return;

  const container = document.createElement("div");
  container.id = "advanced-search-box";
  container.style.cssText = `
    background: #f8f9fa;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 8px 0;
    font-family: Arial, sans-serif;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  `;
console.log("advancedSearch");

  const exact = document.createElement("input");
  exact.placeholder = 'Mot(s) exact(s)...';
  exact.style.flex = '1';

  const without = document.createElement("input");
  without.placeholder = 'Sans ces mots...';
  without.style.flex = '1';

  const site = document.createElement("input");
  site.placeholder = 'Site spécifique (ex: lemonde.fr)';
  site.style.flex = '1';

  const button = document.createElement("button");
  button.textContent = "🔍 Appliquer";
  button.style.cssText = `
    padding: 6px 12px;
    background: #1a73e8;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;

  container.appendChild(exact);
  container.appendChild(without);
  container.appendChild(site);
  container.appendChild(button);

  const parent = queryInput.closest('form');
  parent?.parentNode?.insertBefore(container, parent.nextSibling);

  button.onclick = () => {
    let query = queryInput.value.trim();
    if (exact.value) query += ` "${exact.value}"`;
    if (without.value) query += ` -${without.value.split(" ").join(" -")}`;
    if (site.value) query += ` site:${site.value}`;

    queryInput.value = query;
    parent?.submit();
  };
}
