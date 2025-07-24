const modules = [
  { key: "mapsButton", label: "Maps" },
  { key: "redditButton", label: "Reddit" },
  { key: "translateButton", label: "Translate" },
  { key: "chatgptButton", label: "ChatGPT" },
  { key: "advancedSearch", label: "Search ++" }
];

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "ru", name: "Русский" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "zh-CN", name: "简体中文" },
  { code: "zh-TW", name: "繁體中文" },
  { code: "ar", name: "العربية" },
  { code: "hi", name: "हिन्दी" }
];

const form = document.getElementById("options-form");
const tableBody = document.getElementById("table-body");
const status = document.getElementById("status");

function buildForm(savedPrefs = {}) {
  // Add module toggles
  modules.forEach(({ key, label }) => {
    const isChecked = savedPrefs[key] ?? true;

    const tr = document.createElement("tr");

    const tdLabel = document.createElement("td");
    const divLabel = document.createElement("div");
    divLabel.className = "btn btn-white btn-sm text-white";
    divLabel.textContent = label;

    const tdSwitch = document.createElement("td");
    const divSwitch = document.createElement("div");
    divSwitch.className = "form-check form-switch";

    const input = document.createElement("input");
    input.className = "form-check-input";
    input.type = "checkbox";
    input.id = key;
    input.checked = isChecked;
    input.addEventListener("change", saveOptions);

    divSwitch.appendChild(input);
    tdSwitch.appendChild(divSwitch);
    tdLabel.appendChild(divLabel);

    tr.appendChild(tdLabel);
    tr.appendChild(tdSwitch);
    tableBody.appendChild(tr);
  });

  // Add language settings in the dedicated section
  const languageSection = document.querySelector('.mb-4:nth-of-type(2)');

  const formGroup = document.createElement("div");
  formGroup.className = "form-group";

  const select = document.createElement("select");
  select.id = "defaultLanguage";
  select.className = "form-select";
  select.addEventListener("change", saveOptions);

  // Add language options
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Auto-detect";
  select.appendChild(defaultOption);

  languages.forEach(({ code, name }) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = name;
    select.appendChild(option);
  });

  // Set selected language
  select.value = savedPrefs.defaultLanguage || "";

  formGroup.appendChild(select);
  languageSection.appendChild(formGroup);
}

function saveOptions() {
  const prefs = {};
  modules.forEach(({ key }) => {
    prefs[key] = document.getElementById(key).checked;
  });

  // Save language preference
  const defaultLanguage = document.getElementById("defaultLanguage").value;

  // Save both module preferences and language preference
  chrome.storage.sync.set({ 
    activeModules: prefs,
    defaultLanguage: defaultLanguage
  }, () => {
    status.style.display = "block";
    setTimeout(() => {
      status.style.display = "none";
    }, 1500);
  }); 
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(["activeModules", "defaultLanguage"], (result) => {
    const prefs = {
      ...(result.activeModules || {}),
      defaultLanguage: result.defaultLanguage || ""
    };
    buildForm(prefs);
  });
});
