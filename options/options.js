// Import custom i18n module
import { initI18n, getMessage, setLanguage } from '../modules/i18n.js';

// Module definitions will be populated after i18n is initialized
let modules = [];

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

async function buildForm(savedPrefs = {}) {
  // Add module toggles
  for (const { key, label } of modules) {
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
  }

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
  defaultOption.textContent = await getMessage("autoDetect");
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

  // Get the previous language setting to check if it changed
  chrome.storage.sync.get(["defaultLanguage"], (result) => {
    const previousLanguage = result.defaultLanguage || "";

    // Update the current language in the i18n module
    setLanguage(defaultLanguage);

    // Save both module preferences and language preference
    chrome.storage.sync.set({ 
      activeModules: prefs,
      defaultLanguage: defaultLanguage
    }, () => {
      status.style.display = "block";
      setTimeout(() => {
        status.style.display = "none";
      }, 1500);

      // If language changed, reload the extension
      if (previousLanguage !== defaultLanguage) {
        // Reload all extension pages to apply the new language
        chrome.runtime.sendMessage({ action: "reloadExtension" });
        // Reload the current options page
        setTimeout(() => {
          window.location.reload();
        }, 1600);
      }
    }); 
  });
}

// Function to replace i18n message placeholders in the HTML
async function replaceI18nMessages() {
  // First, handle elements with direct text content
  const elements = document.querySelectorAll('*');
  for (const element of elements) {
    if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
      const text = element.textContent.trim();
      if (text.match(/^__MSG_\w+__$/)) {
        const messageName = text.match(/__MSG_(\w+)__/)[1];
        const translatedMessage = await getMessage(messageName);
        if (translatedMessage) {
          element.textContent = translatedMessage;
        }
      }
    }
  }

  // Then, handle title tag specifically
  const title = document.querySelector('title');
  if (title && title.textContent.trim().match(/^__MSG_\w+__$/)) {
    const messageName = title.textContent.trim().match(/__MSG_(\w+)__/)[1];
    const translatedMessage = await getMessage(messageName);
    if (translatedMessage) {
      title.textContent = translatedMessage;
    }
  }

  // Finally, handle text nodes that are direct children of elements
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while (node = walker.nextNode()) {
    const text = node.nodeValue.trim();
    if (text.match(/^__MSG_\w+__$/)) {
      const messageName = text.match(/__MSG_(\w+)__/)[1];
      const translatedMessage = await getMessage(messageName);
      if (translatedMessage) {
        node.nodeValue = translatedMessage;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize i18n module
  await initI18n();

  // Initialize modules array with translated labels
  modules = [
    { key: "mapsButton", label: await getMessage("mapsModule") },
    { key: "redditButton", label: await getMessage("redditModule") },
    { key: "translateButton", label: await getMessage("translateModule") },
    { key: "chatgptButton", label: await getMessage("chatgptModule") },
    { key: "advancedSearch", label: await getMessage("advancedSearchModule") }
  ];

  // Replace i18n message placeholders
  await replaceI18nMessages();

  chrome.storage.sync.get(["activeModules", "defaultLanguage"], async (result) => {
    const prefs = {
      ...(result.activeModules || {}),
      defaultLanguage: result.defaultLanguage || ""
    };

    // Update the current language in the i18n module
    setLanguage(prefs.defaultLanguage);

    await buildForm(prefs);
  });
});
