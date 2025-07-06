export function run() {
  const navBar = document.querySelector('div[role="navigation"]');
  if (!navBar || document.querySelector('#advancedsearch-button')) return;

  const actualBtn = [...navBar.querySelectorAll('a')].find(a => a.innerText.toLowerCase().includes('tous'));
  if (!actualBtn) return;

  const advBtn = actualBtn.cloneNode(true);
  advBtn.id = 'advancedsearch-button';
  advBtn.innerText = 'Advanced Search';
  advBtn.href = '#';
  advBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showPopup();
  });

  actualBtn.parentNode.insertBefore(advBtn, actualBtn.nextSibling);
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
    border-radius: 10px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    font-family: sans-serif;
    color: #222;
  `;

  popup.innerHTML = `
    <h3 style="margin-top: 0; color: #1a73e8;">Advanced Search</h3>

    <div style="margin-bottom: 15px;">
      <h4 style="margin-bottom: 5px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Find pages with...</h4>
      <div style="display: grid; grid-template-columns: 180px 1fr; gap: 5px; align-items: center;">
        <label for="as_all">all these words:</label>
        <input placeholder="Type important words" id="as_all" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;"/>

        <label for="as_exact">this exact word or phrase:</label>
        <input placeholder="Put exact words in quotes" id="as_exact" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;"/>

        <label for="as_any">any of these words:</label>
        <input placeholder="Type OR between words" id="as_any" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;"/>

        <label for="as_none">none of these words:</label>
        <input placeholder="Put - in front of words" id="as_none" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;"/>

        <label for="as_numbers">numbers ranging from:</label>
        <div style="display: flex; gap: 5px;">
          <input placeholder="low" id="as_numbers_from" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 50%;"/>
          <input placeholder="high" id="as_numbers_to" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 50%;"/>
        </div>
      </div>
    </div>

    <div style="margin-bottom: 15px;">
      <h4 style="margin-bottom: 5px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Then narrow your results by...</h4>
      <div style="display: grid; grid-template-columns: 180px 1fr; gap: 5px; align-items: center;">
        <label for="as_site">site or domain:</label>
        <input placeholder="e.g., wikipedia.org, .edu" id="as_site" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;"/>

        <label>terms appearing:</label>
        <div>
          <select id="as_occt" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%;">
            <option value="">anywhere in the page</option>
            <option value="title">in the title of the page</option>
            <option value="url">in the URL of the page</option>
            <option value="body">in the text of the page</option>
            <option value="links">in links to the page</option>
          </select>
        </div>

        <label for="as_filetype">file type:</label>
        <select id="as_file" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%;">
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

        <label>usage rights:</label>
        <select id="as_rights" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%;">
          <option value="">not filtered by license</option>
          <option value="cc_publicdomain">free to use or share</option>
          <option value="cc_attribute">free to use or share, even commercially</option>
          <option value="cc_sharealike">free to use, share or modify</option>
          <option value="cc_noncommercial">free to use, share or modify, even commercially</option>
          <option value="cc_nonderived">free to use, share or modify, but not commercially</option>
        </select>
      </div>
    </div>

    <div style="margin-bottom: 15px;">
      <h4 style="margin-bottom: 5px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Filter by date and region</h4>
      <div style="display: grid; grid-template-columns: 180px 1fr; gap: 5px; align-items: center;">
        <label>last update:</label>
        <select id="as_time" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%;">
          <option value="">anytime</option>
          <option value="h">past hour</option>
          <option value="d">past 24 hours</option>
          <option value="w">past week</option>
          <option value="m">past month</option>
          <option value="y">past year</option>
        </select>

        <label>language:</label>
        <select id="as_lang" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%;">
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

        <label>region:</label>
        <select id="as_cr" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%;">
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

        <label>SafeSearch:</label>
        <select id="as_safesearch" style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%;">
          <option value="">Show most relevant results</option>
          <option value="active">Filter explicit results</option>
        </select>
      </div>
    </div>

    <div style="text-align:right; margin-top: 15px;">
      <button id="as_submit" style="background-color: #1a73e8; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-right: 10px;">
        🔍 Search
      </button>
      <button onclick="document.getElementById('advsearch-popup').remove()" style="background-color: #f8f9fa; color: #202124; border: 1px solid #dadce0; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
        Cancel
      </button>
    </div>
  `;

  document.body.appendChild(popup);

  // Load previous preferences
  chrome.storage.sync.get("advSearchPrefs", ({ advSearchPrefs }) => {
    if (!advSearchPrefs) return;
    for (const [key, val] of Object.entries(advSearchPrefs)) {
      const el = document.getElementById(key);
      if (el) el.value = val;
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
    if (time) {
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
