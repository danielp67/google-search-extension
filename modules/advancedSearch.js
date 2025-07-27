// Import custom i18n module
import { initI18n, getMessage } from './i18n.js';

export async function run() {
  // Initialize i18n module
  await initI18n();

  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar || document.querySelector('#advancedsearch-button')) return;

  // Find a navigation button to clone - try multiple languages
  const buttonTexts = ['tous', 'all', 'alle', 'todos', 'tutti', 'tudo', 'все', 'すべて', '모두', '全部', 'الكل', 'सभी'];
  let actualBtn = null;

  for (const text of buttonTexts) {
    actualBtn = [...navBar.querySelectorAll('a')].find(a => 
      a.innerText.toLowerCase().includes(text)
    );
    if (actualBtn) break;
  }

  // If no button was found, try to use the first button in the navigation bar
  if (!actualBtn && navBar.querySelectorAll('a').length > 0) {
    actualBtn = navBar.querySelectorAll('a')[0];
  }

  if (!actualBtn) return;

  const advBtn = actualBtn.cloneNode(true);
  advBtn.id = 'advancedsearch-button';

  // Clear the anchor text
  advBtn.innerText = '';

  // Create a div inside the anchor
  const innerDiv = document.createElement('div');
  innerDiv.className = "YmvwI";
  innerDiv.innerText = await getMessage("advancedSearch");
  advBtn.appendChild(innerDiv);

  advBtn.href = '#';
  advBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPopup();
  });

  // Clone the parent div (which has role="listitem")
  const parentDiv = actualBtn.parentNode;
  const newParentDiv = parentDiv.cloneNode(false); // shallow clone without children

  // Add the ChatGPT button to the new div
  newParentDiv.appendChild(advBtn);

  // Insert the new div after the original div
  parentDiv.parentNode.insertBefore(newParentDiv, parentDiv.nextSibling);

 // actualBtn.parentNode.insertBefore(advBtn, actualBtn.nextSibling);
}

function showPopup() {
  if (document.getElementById('advsearch-popup')) return;

  const popup = document.createElement('div');
  popup.id = 'advsearch-popup';
  popup.style = `
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    background: white;
    padding: 20px;
    border-radius: 12px;
    max-width: 650px;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    font-family: 'Google Sans', Arial, sans-serif;
    color: #202124;
    transition: all 0.3s ease;
  `;

  // Add a semi-transparent overlay behind the popup
  const overlay = document.createElement('div');
  overlay.id = 'advsearch-overlay';
  overlay.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 9998;
  `;
  overlay.addEventListener('click', () => {
    document.getElementById('advsearch-popup').remove();
    overlay.remove();
  });
  document.body.appendChild(overlay);

  popup.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
      <h3 style="margin: 0; color: #1a73e8; font-size: 20px; font-weight: 500;">Advanced Search</h3>
      <button id="as_close" style="background: none; border: none; cursor: pointer; font-size: 20px; color: #5f6368; padding: 5px;">×</button>
    </div>

    <div style="margin-bottom: 20px; background: #f8f9fa; border-radius: 8px; padding: 15px;">
      <h4 style="margin-top: 0; margin-bottom: 12px; color: #202124; font-size: 16px; font-weight: 500; border-bottom: 1px solid #dadce0; padding-bottom: 8px;">Find pages with...</h4>
      <div style="display: grid; grid-template-columns: 180px 1fr; gap: 10px; align-items: center;">
        <label for="as_all" style="font-size: 14px; color: #5f6368;">all these words:</label>
        <input placeholder="Type important words" id="as_all" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124;"/>

        <label for="as_exact" style="font-size: 14px; color: #5f6368;">this exact word or phrase:</label>
        <input placeholder="Put exact words in quotes" id="as_exact" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124;"/>

        <label for="as_any" style="font-size: 14px; color: #5f6368;">any of these words:</label>
        <input placeholder="Type OR between words" id="as_any" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124;"/>

        <label for="as_none" style="font-size: 14px; color: #5f6368;">none of these words:</label>
        <input placeholder="Put - in front of words" id="as_none" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124;"/>

        <label for="as_numbers" style="font-size: 14px; color: #5f6368;">numbers ranging from:</label>
        <div style="display: flex; gap: 10px;">
          <input placeholder="low" id="as_numbers_from" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 50%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124;"/>
          <input placeholder="high" id="as_numbers_to" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 50%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124;"/>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 20px; background: #f8f9fa; border-radius: 8px; padding: 15px;">
      <h4 style="margin-top: 0; margin-bottom: 12px; color: #202124; font-size: 16px; font-weight: 500; border-bottom: 1px solid #dadce0; padding-bottom: 8px;">Then narrow your results by...</h4>
      <div style="display: grid; grid-template-columns: 180px 1fr; gap: 10px; align-items: center;">
        <label for="as_site" style="font-size: 14px; color: #5f6368;">site or domain:</label>
        <input placeholder="e.g., wikipedia.org, .edu" id="as_site" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124;"/>

        <label style="font-size: 14px; color: #5f6368;">terms appearing:</label>
        <div>
          <select id="as_occt" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124; appearance: none; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%235F6368\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center;">
            <option value="">anywhere in the page</option>
            <option value="title">in the title of the page</option>
            <option value="url">in the URL of the page</option>
            <option value="body">in the text of the page</option>
            <option value="links">in links to the page</option>
          </select>
        </div>

        <label for="as_filetype" style="font-size: 14px; color: #5f6368;">file type:</label>
        <select id="as_file" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124; appearance: none; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%235F6368\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center;">
          <option value="">any format</option>
          <option value="pdf">PDF (.pdf)</option>
          <option value="doc">Microsoft Word (.doc)</option>
          <option value="docx">Microsoft Word (.docx)</option>
          <option value="ppt">PowerPoint (.ppt)</option>
          <option value="pptx">PowerPoint (.pptx)</option>
          <option value="xls">Excel (.xls)</option>
          <option value="xlsx">Excel (.xlsx)</option>
          <option value="txt">Text (.txt)</option>
          <option value="rtf">Rich Text (.rtf)</option>
          <option value="csv">CSV (.csv)</option>
          <option value="html">HTML (.html)</option>
          <option value="xml">XML (.xml)</option>
          <option value="json">JSON (.json)</option>
        </select>

        <label style="font-size: 14px; color: #5f6368;">usage rights:</label>
        <select id="as_rights" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124; appearance: none; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%235F6368\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center;">
          <option value="">not filtered by license</option>
          <option value="cc_publicdomain">free to use or share</option>
          <option value="cc_attribute">free to use or share, even commercially</option>
          <option value="cc_sharealike">free to use, share or modify</option>
          <option value="cc_noncommercial">free to use, share or modify, even commercially</option>
          <option value="cc_nonderived">free to use, share or modify, but not commercially</option>
        </select>
      </div>
    </div>

    <div style="margin-bottom: 20px; background: #f8f9fa; border-radius: 8px; padding: 15px;">
      <h4 style="margin-top: 0; margin-bottom: 12px; color: #202124; font-size: 16px; font-weight: 500; border-bottom: 1px solid #dadce0; padding-bottom: 8px;">Filter by date and region</h4>
      <div style="display: grid; grid-template-columns: 180px 1fr; gap: 10px; align-items: center;">
        <label style="font-size: 14px; color: #5f6368;">last update:</label>
        <select id="as_time" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124; appearance: none; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%235F6368\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center;">
          <option value="">anytime</option>
          <option value="h">past hour</option>
          <option value="d">past 24 hours</option>
          <option value="w">past week</option>
          <option value="m">past month</option>
          <option value="y">past year</option>
          <option value="custom">custom range...</option>
        </select>

        <div id="as_date_range_container" style="display: none; grid-column: span 2; margin-top: 10px;">
          <div style="display: grid; grid-template-columns: 180px 1fr; gap: 10px; align-items: center;">
            <label for="as_date_from" style="font-size: 14px; color: #5f6368;">from date:</label>
            <input type="date" id="as_date_from" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124;"/>

            <label for="as_date_to" style="font-size: 14px; color: #5f6368;">to date:</label>
            <input type="date" id="as_date_to" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124;"/>
          </div>
        </div>

        <label style="font-size: 14px; color: #5f6368;">language:</label>
        <select id="as_lang" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124; appearance: none; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%235F6368\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center;">
          <option value="">any language</option>
          <option value="lang_en">English</option>
          <option value="lang_fr">French</option>
          <option value="lang_de">German</option>
          <option value="lang_es">Spanish</option>
          <option value="lang_it">Italian</option>
          <option value="lang_pt">Portuguese</option>
          <option value="lang_ru">Russian</option>
          <option value="lang_ja">Japanese</option>
          <option value="lang_ko">Korean</option>
          <option value="lang_zh-CN">Chinese (Simplified)</option>
          <option value="lang_zh-TW">Chinese (Traditional)</option>
          <option value="lang_ar">Arabic</option>
          <option value="lang_hi">Hindi</option>
        </select>

        <label style="font-size: 14px; color: #5f6368;">region:</label>
        <select id="as_cr" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124; appearance: none; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%235F6368\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center;">
          <option value="">any region</option>
          <option value="countryUS">United States</option>
          <option value="countryGB">United Kingdom</option>
          <option value="countryFR">France</option>
          <option value="countryDE">Germany</option>
          <option value="countryCA">Canada</option>
          <option value="countryAU">Australia</option>
          <option value="countryJP">Japan</option>
          <option value="countryIN">India</option>
          <option value="countryBR">Brazil</option>
          <option value="countryRU">Russia</option>
          <option value="countryCN">China</option>
        </select>

        <label style="font-size: 14px; color: #5f6368;">SafeSearch:</label>
        <select id="as_safesearch" style="padding: 10px; border: 1px solid #dadce0; border-radius: 8px; width: 100%; box-sizing: border-box; transition: border-color 0.2s; font-size: 14px; color: #202124; appearance: none; background-image: url('data:image/svg+xml;utf8,<svg fill=\"%235F6368\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>'); background-repeat: no-repeat; background-position: right 10px center;">
          <option value="">Show most relevant results</option>
          <option value="active">Filter explicit results</option>
        </select>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; margin-top: 20px; gap: 10px;">
      <button onclick="document.getElementById('advsearch-popup').remove(); document.getElementById('advsearch-overlay').remove();" style="background-color: #f8f9fa; color: #5f6368; border: 1px solid #dadce0; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background-color 0.2s;">
        Cancel
      </button>
      <button id="as_submit" style="background-color: #1a73e8; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background-color 0.2s;">
        🔍 Search
      </button>
    </div>
  `;

  document.body.appendChild(popup);

  // Add event listener for close button
  document.getElementById('as_close').addEventListener('click', () => {
    document.getElementById('advsearch-popup').remove();
    document.getElementById('advsearch-overlay').remove();
  });

  // Add event listener for time dropdown to show/hide date range inputs
  document.getElementById('as_time').addEventListener('change', (e) => {
    const dateRangeContainer = document.getElementById('as_date_range_container');
    if (e.target.value === 'custom') {
      dateRangeContainer.style.display = 'block';
    } else {
      dateRangeContainer.style.display = 'none';
    }
  });

  // Load previous preferences and default language
  chrome.storage.sync.get(["advSearchPrefs", "defaultLanguage"], (result) => {
    const { advSearchPrefs, defaultLanguage } = result;

    // Set form values from saved preferences
    if (advSearchPrefs) {
      for (const [key, val] of Object.entries(advSearchPrefs)) {
        const el = document.getElementById(key);
        if (el) el.value = val;
      }

      // Show date range container if custom time range was selected
      if (advSearchPrefs.as_time === 'custom') {
        document.getElementById('as_date_range_container').style.display = 'block';
      }
    }

    // Set language from user's default language preference if not already set
    if (defaultLanguage && (!advSearchPrefs || !advSearchPrefs.as_lang)) {
      const langSelect = document.getElementById('as_lang');
      // Convert the language code to the format expected by Google (lang_XX)
      // Only if defaultLanguage is not empty and not already in the correct format
      const googleLangCode = defaultLanguage.startsWith('lang_') ? 
        defaultLanguage : (defaultLanguage ? `lang_${defaultLanguage}` : '');

      // Check if the language is in the dropdown
      const langExists = googleLangCode && [...langSelect.options].some(opt => opt.value === googleLangCode);

      if (langExists) {
        langSelect.value = googleLangCode;
      }
    }
  });

  document.getElementById('as_submit').addEventListener('click', () => {
    // Get all form values
    const all = document.getElementById('as_all').value;
    const exact = document.getElementById('as_exact').value;
    const any = document.getElementById('as_any').value;
    const none = document.getElementById('as_none').value;
    const numbersFrom = document.getElementById('as_numbers_from').value;
    const numbersTo = document.getElementById('as_numbers_to').value;
    const site = document.getElementById('as_site').value;
    const occt = document.getElementById('as_occt').value;
    const file = document.getElementById('as_file').value;
    const rights = document.getElementById('as_rights').value;
    const time = document.getElementById('as_time').value;
    const dateFrom = document.getElementById('as_date_from').value;
    const dateTo = document.getElementById('as_date_to').value;
    const lang = document.getElementById('as_lang').value;
    const cr = document.getElementById('as_cr').value;
    const safeSearch = document.getElementById('as_safesearch').value;

    // Save preferences
    const prefs = { 
      as_all: all, 
      as_exact: exact, 
      as_any: any,
      as_none: none, 
      as_numbers_from: numbersFrom,
      as_numbers_to: numbersTo,
      as_site: site, 
      as_occt: occt,
      as_time: time, 
      as_date_from: dateFrom,
      as_date_to: dateTo,
      as_lang: lang, 
      as_file: file,
      as_rights: rights,
      as_cr: cr,
      as_safesearch: safeSearch
    };
    chrome.storage.sync.set({ advSearchPrefs: prefs });

    // Build query string
    let query = '';
    if (all) query += ' ' + all;
    if (exact) query += ` "${exact}"`;
    if (any) {
      // Convert space-separated words to OR syntax
      const anyWords = any.split(' ').filter(word => word.trim() !== '');
      if (anyWords.length > 0) {
        query += ' ' + anyWords.join(' OR ');
      }
    }
    if (none) {
      // Handle multiple words by adding - to each
      const noneWords = none.split(' ').filter(word => word.trim() !== '');
      if (noneWords.length > 0) {
        query += ' -' + noneWords.join(' -');
      }
    }
    if (numbersFrom && numbersTo) {
      query += ` ${numbersFrom}..${numbersTo}`;
    }
    if (site) query += ` site:${site}`;
    if (file) query += ` filetype:${file}`;

    // Create search URL
    const url = new URL('https://www.google.com/search');
    url.searchParams.set('q', query.trim());

    // Add advanced parameters
    let tbs = '';

    // Time period
    if (time === 'custom' && dateFrom && dateTo) {
      // Format dates as YYYYMMDD for Google's API
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
      };

      const fromFormatted = formatDate(dateFrom);
      const toFormatted = formatDate(dateTo);

      tbs += `cdr:1,cd_min:${fromFormatted},cd_max:${toFormatted}`;
    } else if (time && time !== 'custom') {
      tbs += `qdr:${time}`;
    }

    // Usage rights
    if (rights) {
      if (tbs) tbs += ',';
      tbs += `sur:${rights}`;
    }

    // Apply tbs parameter if any filters are set
    if (tbs) {
      url.searchParams.set('tbs', tbs);
    }

    // Language
    if (lang) {
      url.searchParams.set('lr', lang);
    }

    // Region/Country
    if (cr) {
      url.searchParams.set('cr', cr);
    }

    // Terms appearing in specific part of page
    if (occt) {
      url.searchParams.set('as_occt', occt);
    }

    // SafeSearch
    if (safeSearch) {
      url.searchParams.set('safe', safeSearch);
    }

    window.location.href = url.toString();
  });
}
