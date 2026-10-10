(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const savedKey = "kf-saved";
  const getSaved = () => JSON.parse(localStorage.getItem(savedKey) || "[]");
  const setSaved = (ids) => localStorage.setItem(savedKey, JSON.stringify(ids));

  function dropList(items) {
    return items.map((c) => `<a href="${KF.catPath(c.slug)}">${c.label}</a>`).join("");
  }

  function header() {
    const home = KF.asset("");
    return `
      <div class="promo-stack">
        <div class="promo-bar green"><a href="${KF.site.signup}" target="_blank" rel="noopener">Kakobuy coupons · Sign up with invite 9v88f · Free shipping deals</a></div>
        <div class="promo-bar violet">Browse sheet links as cards — open any find on Kakobuy in one tap</div>
      </div>
      <header class="site-header">
        <div class="wrap header-row">
          <button class="menu-btn" data-open="nav" aria-label="Menu">☰</button>
          <a class="brand" href="${home || "/"}">
            <span class="brand-mark">
              <img src="${KF.asset("img/k.svg")}" alt="kakobuy spreadsheet" width="34" height="44" />
            </span>
            <span class="brand-copy">
              <strong>kakobuy <span>spreadsheet</span></strong>
              <small>www.kakobuysheetlink.com</small>
            </span>
          </a>
          <nav class="nav">
            <a href="${home || "/"}" data-nav="home">Home</a>
            <div class="drop" data-nav="apparel">
              <button class="linkish" type="button" aria-haspopup="true">All Categories ▾</button>
              <div class="drop-panel">${dropList([...KF.nav.apparel, ...KF.nav.lifestyle])}</div>
            </div>
            <a href="${KF.findsPath()}" data-nav="shop">Spreadsheet</a>
            <a href="${KF.site.signup}" target="_blank" rel="noopener" data-nav="agent">Kakobuy</a>
            <a href="${KF.asset("guides.html")}" data-nav="guides">How to</a>
          </nav>
          <div class="header-tools">
            <label class="search-inline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
              <input id="header-search" placeholder="Search finds…" autocomplete="off" />
            </label>
            <button class="icon-btn search-btn" data-open="search" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7"/>
                <path d="M20 20l-3.5-3.5"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div class="overlay" id="overlay"></div>
      <aside class="mobile-nav" id="mobile-nav">
        <a href="${home || "/"}" data-nav="home">Home</a>
        <a href="${KF.findsPath()}" data-nav="shop">Spreadsheet</a>
        ${[...KF.nav.apparel, ...KF.nav.lifestyle].map((c) => `<a href="${KF.catPath(c.slug)}">${c.label}</a>`).join("")}
        <a href="${KF.site.signup}" target="_blank" rel="noopener">Open Kakobuy</a>
        <a href="${KF.asset("guides.html")}" data-nav="guides">How to</a>
      </aside>
      <div class="search-modal" id="search-modal" role="dialog" aria-modal="true" aria-label="Search">
        <label class="search-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <input class="search-input" id="global-search" placeholder="Search reps, brands, items…" autocomplete="off" />
          <kbd class="search-esc" data-close-search>Esc</kbd>
        </label>
        <div class="search-browse" id="search-browse">
          <div class="search-block">
            <h3>Popular</h3>
            <div class="search-popular">
              ${["Jordan 4", "Moncler", "Stone Island", "Chrome Hearts", "Corteiz", "Ralph Lauren", "Nike Tech", "Trapstar"].map((term) =>
                `<a href="${KF.findsPath()}?q=${encodeURIComponent(term)}">${term}</a>`
              ).join("")}
            </div>
          </div>
          <div class="search-block">
            <h3>Categories</h3>
            <div class="search-cats">
              <a href="${KF.catPath("shoes")}"><span class="search-cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 14h12l4 2v2H3v-2z"/><path d="M4 14V10c2-2 5-3 8-2"/></svg></span><span>Shoes</span></a>
              <a href="${KF.catPath("t-shirts")}"><span class="search-cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 5l-4 3v3l4-1v9h8V10l4 1V8l-4-3-2 2h-4L8 5z"/></svg></span><span>T-shirts</span></a>
              <a href="${KF.catPath("hoodies")}"><span class="search-cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 6c0-2 2-3 4-3s4 1 4 3v2l3 2v4l-3-1v8H8v-8l-3 1v-4l3-2V6z"/></svg></span><span>Hoodies</span></a>
              <a href="${KF.catPath("jackets")}"><span class="search-cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 5l-4 4v10h4v-6h8v6h4V9l-4-4-2 2h-4L8 5z"/></svg></span><span>Jackets</span></a>
              <a href="${KF.catPath("pants")}"><span class="search-cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 4h8l1 16h-4l-1-8-1 8H7L8 4z"/></svg></span><span>Pants</span></a>
              <a href="${KF.catPath("accessories")}"><span class="search-cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 9h12l1 11H5L6 9z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/></svg></span><span>Bags</span></a>
              <a href="${KF.catPath("watches")}"><span class="search-cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="6"/><path d="M10 4h4M10 20h4M12 9v3l2 1"/></svg></span><span>Watches</span></a>
              <a href="${KF.catPath("accessories")}"><span class="search-cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l2.5 5.5L20 10l-4.5 3.5L17 20l-5-3-5 3 1.5-6.5L4 10l5.5-1.5L12 3z"/></svg></span><span>Accessories</span></a>
            </div>
          </div>
        </div>
        <div class="search-hits" id="search-hits" hidden></div>
      </div>
      <div class="toast" id="toast"></div>
      <div class="float-dock" aria-label="Quick links">
        <a class="kakobuy" href="${KF.site.signup}" target="_blank" rel="noopener" title="Kakobuy">KB</a>
        <a href="${KF.findsPath()}" title="All finds">📋</a>
        <a href="${KF.asset("guides.html")}" title="Guides">❓</a>
      </div>
    `;
  }

  function footer() {
    const home = KF.asset("") || "/";
    return `
      <footer class="site-footer">
        <div class="wrap">
          <div class="footer-grid">
            <div class="footer-col">
              <a class="footer-brand" href="${home}">kakobuy <span>spreadsheet</span></a>
              <p>A Finds-style Kakobuy spreadsheet site: browse sheet links as product cards, then checkout on Kakobuy. Independent directory — not affiliated with Kakobuy.</p>
            </div>
            <div class="footer-col">
              <h3>Categories</h3>
              <a href="${KF.catPath("shoes")}">Shoes</a>
              <a href="${KF.catPath("hoodies")}">Hoodies</a>
              <a href="${KF.catPath("t-shirts")}">T-Shirts</a>
              <a href="${KF.catPath("jackets")}">Jackets</a>
              <a href="${KF.findsPath()}">All finds</a>
            </div>
            <div class="footer-col">
              <h3>Kakobuy</h3>
              <a href="${KF.site.signup}" target="_blank" rel="noopener">Sign up / coupons</a>
              <a href="${KF.asset("guides.html")}">How to buy</a>
              <a href="${KF.asset("guide.html")}?slug=read-qc">Read QC</a>
              <a href="${KF.site.sheetUrl}" target="_blank" rel="noopener">Classic sheet</a>
            </div>
            <div class="footer-col">
              <h3>Site</h3>
              <a href="${KF.asset("about.html")}">About</a>
              <a href="${KF.asset("privacy.html")}">Privacy</a>
              <a href="${KF.asset("terms.html")}">Terms</a>
            </div>
          </div>
          <p class="footer-note">© ${new Date().getFullYear()} kakobuysheetlink.com · Informational catalog only. Product links open Kakobuy with referral code 9v88f.</p>
        </div>
      </footer>
    `;
  }

  function stars(rating) {
    const n = Math.max(0, Math.min(5, Number(rating) || 0));
    let full = Math.floor(n + 1e-9);
    const frac = n - full;
    let half = false;
    if (frac >= 0.75 && full < 5) full += 1;
    else if (frac >= 0.25 && full < 5) half = true;
    const empty = 5 - full - (half ? 1 : 0);
    const glyphs = `${"★".repeat(full)}${half ? '<span class="star-half">★</span>' : ""}${"☆".repeat(empty)}`;
    return `<span class="stars" aria-label="${n.toFixed(1)} out of 5">${glyphs}</span>`;
  }

  function productCard(p) {
    return `
      <a class="product-card" href="${KF.itemPath(p)}" data-id="${p.id}">
        <div class="thumb"><img src="${KF.asset(p.image)}" alt="${p.title}" loading="lazy" decoding="async" /></div>
        <h3>${p.title}</h3>
        <div class="price">${KF.priceLabel(p.price)}</div>
      </a>
    `;
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 1600);
  }

  function renderSaved() {
    const ids = getSaved();
    const count = $("#saved-count");
    if (count) count.textContent = ids.length;
    const list = $("#saved-list");
    if (!list) return;
    const items = KF.products.filter((p) => ids.includes(p.id));
    list.innerHTML = items.length
      ? items.map((p) => `<p><a href="${KF.itemPath(p)}">${p.title}</a> · ${KF.money(p.price)}</p>`).join("")
      : "<p>No saved finds yet.</p>";
  }

  function closeAll() {
    $("#overlay").classList.remove("show");
    $("#mobile-nav").classList.remove("show");
    $("#search-modal").classList.remove("show");
  }

  function openPanel(name) {
    closeAll();
    $("#overlay").classList.add("show");
    if (name === "nav") $("#mobile-nav").classList.add("show");
    if (name === "search") {
      $("#search-modal").classList.add("show");
      const input = $("#global-search");
      const browse = $("#search-browse");
      const hits = $("#search-hits");
      if (browse) browse.hidden = false;
      if (hits) {
        hits.hidden = true;
        hits.innerHTML = "";
      }
      if (input) {
        input.value = "";
        input.focus();
      }
    }
  }

  function currentNav() {
    const page = document.body.dataset.page || "";
    const cat = document.body.dataset.cat || new URLSearchParams(location.search).get("cat") || "";
    const apparel = new Set(KF.nav.apparel.map((c) => c.slug));
    const lifestyle = new Set(KF.nav.lifestyle.map((c) => c.slug));
    if (page === "home") return "home";
    if (page === "guides" || page === "guide" || page === "author") return "guides";
    if ((page === "shop" || page === "item") && apparel.has(cat)) return "apparel";
    if ((page === "shop" || page === "item") && lifestyle.has(cat)) return "lifestyle";
    if (page === "shop" || page === "item" || page === "brands") return "shop";
    return "";
  }

  function markCurrentNav() {
    const key = currentNav();
    document.querySelectorAll("[data-nav]").forEach((el) => {
      el.classList.toggle("is-on", el.dataset.nav === key);
    });
  }

  function bindChrome() {
    document.body.insertAdjacentHTML("afterbegin", header());
    document.body.insertAdjacentHTML("beforeend", footer());
    renderSaved();
    markCurrentNav();
    document.querySelectorAll("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => openPanel(btn.dataset.open));
    });
    $("#overlay").addEventListener("click", closeAll);
    const searchInput = $("#global-search");
    const hitsBox = $("#search-hits");
    const browseBox = $("#search-browse");
    let suggestIndex = null;
    let activeHit = -1;

    document.querySelectorAll("[data-close-search]").forEach((el) => {
      el.addEventListener("click", closeAll);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAll();
    });

    function ensureIndex() {
      if (suggestIndex) return suggestIndex;
      const map = new Map();
      function add(raw) {
        const text = String(raw || "").replace(/\s+/g, " ").trim();
        if (text.length < 2 || text.length > 40) return;
        if (/^\d+$/.test(text)) return;
        const key = text.toLowerCase();
        const cur = map.get(key);
        if (cur) cur.n += 1;
        else map.set(key, { text, n: 1 });
      }
      const catLabel = {};
      [...KF.nav.apparel, ...KF.nav.lifestyle].forEach((c) => { catLabel[c.slug] = c.label; });
      KF.products.forEach((p) => {
        add(p.collection);
        const label = catLabel[p.category] || p.category;
        add(label);
        if (p.collection && label) add(`${p.collection} ${label}`);
        const words = String(p.title || "").split(/[^a-zA-Z0-9+]+/).filter((w) => w.length > 1);
        for (let i = 0; i < words.length; i++) {
          add(words[i]);
          if (words[i + 1]) add(`${words[i]} ${words[i + 1]}`);
          if (words[i + 1] && words[i + 2]) add(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
        }
      });
      suggestIndex = [...map.values()];
      return suggestIndex;
    }

    function markQuery(text, q) {
      const i = text.toLowerCase().indexOf(q.toLowerCase());
      if (i < 0) return text.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
      const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
      return `${esc(text.slice(0, i))}<mark>${esc(text.slice(i, i + q.length))}</mark>${esc(text.slice(i + q.length))}`;
    }

    function suggestionsFor(q) {
      const ql = q.toLowerCase();
      if (!ql) return [];
      return ensureIndex()
        .filter((item) => item.text.toLowerCase().includes(ql))
        .map((item) => {
          const key = item.text.toLowerCase();
          return { text: item.text, n: item.n, starts: key.startsWith(ql), key };
        })
        .filter((item) => item.key !== ql)
        .sort((a, b) => {
          if (a.starts !== b.starts) return a.starts ? -1 : 1;
          if (b.n !== a.n) return b.n - a.n;
          return a.text.length - b.text.length;
        })
        .slice(0, 10);
    }

    function renderHits(q) {
      activeHit = -1;
      if (!q) {
        hitsBox.innerHTML = "";
        hitsBox.hidden = true;
        if (browseBox) browseBox.hidden = false;
        return;
      }
      if (browseBox) browseBox.hidden = true;
      hitsBox.hidden = false;
      const items = suggestionsFor(q);
      hitsBox.innerHTML = items.length
        ? items.map((item) => `
            <a class="search-suggest" href="${KF.findsPath()}?q=${encodeURIComponent(item.text)}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
              </svg>
              <span>${markQuery(item.text, q)}</span>
            </a>
          `).join("")
        : `<p class="search-empty">No matches.</p>`;
    }

    function goSearch(value) {
      const q = (value != null ? value : searchInput.value).trim();
      if (!q) return;
      KF.track("search", { search_term: q });
      location.href = KF.findsPath() + "?q=" + encodeURIComponent(q);
    }
    const headerSearch = $("#header-search");
    if (headerSearch) {
      const openFromHeader = () => openPanel("search");
      headerSearch.addEventListener("focus", openFromHeader);
      headerSearch.addEventListener("click", openFromHeader);
      headerSearch.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          goSearch(headerSearch.value);
        }
      });
    }



    searchInput.addEventListener("input", () => {
      renderHits(searchInput.value.trim());
    });
    searchInput.addEventListener("keydown", (e) => {
      const links = [...hitsBox.querySelectorAll(".search-suggest")];
      if (e.key === "ArrowDown" && links.length) {
        e.preventDefault();
        activeHit = (activeHit + 1) % links.length;
        links.forEach((el, i) => el.classList.toggle("is-on", i === activeHit));
        return;
      }
      if (e.key === "ArrowUp" && links.length) {
        e.preventDefault();
        activeHit = (activeHit - 1 + links.length) % links.length;
        links.forEach((el, i) => el.classList.toggle("is-on", i === activeHit));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (activeHit >= 0 && links[activeHit]) {
          const term = links[activeHit].textContent.replace(/\s+/g, " ").trim();
          KF.track("search", { search_term: term });
          location.href = links[activeHit].href;
          return;
        }
        goSearch();
      }
    });

    document.addEventListener("click", (e) => {
      const suggest = e.target.closest("a.search-suggest");
      if (suggest) {
        const term = suggest.textContent.replace(/\s+/g, " ").trim();
        if (term) KF.track("search", { search_term: term });
        return;
      }
      const kakobuy = e.target.closest("a[href*='kakobuy.com']");
      if (kakobuy) {
        const href = kakobuy.href || "";
        if (/\/register/i.test(href)) {
          KF.track("signup_kakobuy", { link_url: href, page_path: location.pathname });
        } else {
          const id = document.body.dataset.itemId || kakobuy.dataset.buy || "";
          const item = id
            ? (KF.products || []).find((p) => String(p.id) === String(id))
            : null;
          if (item) {
            KF.track("buy_kakobuy", {
              agent: "kakobuy",
              item_id: String(item.id),
              item_name: KF.itemName(item),
              currency: "USD",
              value: Number(item.price) || 0,
              items: KF.gaItem(item),
              link_url: href,
              page_path: location.pathname,
            });
          } else {
            KF.track("buy_kakobuy", {
              agent: "kakobuy",
              link_url: href,
              page_path: location.pathname,
            });
          }
        }
      }
      const out = e.target.closest("a[href]");
      if (out) {
        let url;
        try { url = new URL(out.href, location.href); } catch (_) { url = null; }
        if (url && url.origin !== location.origin && (url.protocol === "http:" || url.protocol === "https:")) {
          const params = {
            event_category: "outbound",
            event_label: (out.textContent || out.getAttribute("aria-label") || "link").trim().slice(0, 80),
            link_url: out.href,
            link_domain: url.hostname,
            outbound: true,
            page_path: location.pathname,
          };
          const id = document.body.dataset.itemId || out.dataset.buy || "";
          const item = id ? (KF.products || []).find((p) => String(p.id) === String(id)) : null;
          if (item) {
            params.item_id = String(item.id);
            params.item_name = KF.itemName(item);
            params.currency = "USD";
            params.value = Number(item.price) || 0;
            params.items = KF.gaItem(item);
          }
          KF.track("click", params);
          KF.track("outbound_click", params);
        }
      }
      if (kakobuy) return;
      const card = e.target.closest("a.product-card");
      if (card) {
        const id = card.getAttribute("data-id") || "";
        const item = (KF.products || []).find((p) => String(p.id) === String(id));
        if (item) {
          KF.track("select_item", {
            item_id: String(item.id),
            item_name: KF.itemName(item),
            item_list_name: document.body.dataset.page || "",
            items: KF.gaItem(item),
          });
        }
        return;
      }
      const shopLink = e.target.closest("a[href]");
      if (!shopLink) return;
      let dest;
      try {
        dest = new URL(shopLink.getAttribute("href"), location.href);
      } catch (_) {
        return;
      }
      const q = dest.searchParams.get("q") || "";
      const sort = dest.searchParams.get("sort") || "";
      const qc = dest.searchParams.get("qc") || "";
      const catMatch = dest.pathname.match(/^\/([a-z0-9-]+)\/?$/i);
      const known = new Set([...KF.nav.apparel, ...KF.nav.lifestyle].map((c) => c.slug));
      const cat = dest.searchParams.get("cat") || (catMatch && known.has(catMatch[1]) ? catMatch[1] : "");
      if (!q && !cat && !sort && qc !== "1") return;
      if (q) {
        KF.track("search", { search_term: q });
        return;
      }
      if (cat) KF.track("filter", { filter_type: "category", filter_value: cat });
      if (sort && sort !== "latest") KF.track("filter", { filter_type: "sort", filter_value: sort });
      if (qc === "1") KF.track("filter", { filter_type: "qc", filter_value: "1" });
    });
  }

  KF.ui = { productCard, toast, bindChrome, getSaved, setSaved, renderSaved, stars };
})();
