// @ts-nocheck
(function () {

    var KEY = "portfolioPrefs";
    var defaults = { theme: "light", accent: "#4f46e5", size: "normal" };
    var zoomMap = { normal: 1, large: 1.12, xl: 1.25 };
    var accents = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

    var isPortfolioPage = !!document.getElementById("portfolio");
    var prefs = load();

    function load() {
        try {
            var s = JSON.parse(localStorage.getItem(KEY) || "{}");
            return {
                theme: s.theme || defaults.theme,
                accent: s.accent || defaults.accent,
                size: s.size || defaults.size
            };
        } catch (e) {
            return { theme: defaults.theme, accent: defaults.accent, size: defaults.size };
        }
    }

    function save() {
        try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) {}
    }

    function isDark() {
        if (prefs.theme === "dark") { return true; }
        if (prefs.theme === "auto") {
            return window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    }

    function apply() {

        var a = prefs.accent;
        var grad = "linear-gradient(135deg," + a + ",color-mix(in srgb," + a + " 70%,#000))";
        var css = "";

        css += "body{zoom:" + zoomMap[prefs.size] + ";}";

        css += ".topnav,header,.save-btn:not(.secondary-btn),#saveBtn,.create-btn,.view-btn,.back-link{background:" + grad + " !important;}";
        css += ".section-title,main>h1{color:" + a + " !important;}";
        css += ".secondary-btn{color:" + a + " !important;border-color:" + a + " !important;}";
        css += ".opt.selected,.card.mine{border-color:" + a + " !important;}";
        css += ".template{color:" + a + " !important;}";
        css += "input:focus,textarea:focus,select:focus{border-color:" + a + " !important;}";

        if (isDark() && !isPortfolioPage) {
            css += "body{background:#0f172a !important;color:#e5e7eb !important;}";
            css += ".form-card,.card,.opt,.message{background:#1e293b !important;color:#e5e7eb !important;}";
            css += ".card h2,.opt h2{color:#f1f5f9 !important;}";
            css += ".card p,.opt span,p.sub,label{color:#cbd5e1 !important;}";
            css += "input,textarea,select{background:#0f172a !important;color:#f1f5f9 !important;border-color:#334155 !important;}";
            css += ".template{background:#0f172a !important;}";
            css += ".section-title{border-bottom-color:#334155 !important;}";
            css += ".secondary-btn{background:#1e293b !important;}";
            css += ".refresh-btn{background:#334155 !important;color:#f1f5f9 !important;}";
            css += "div.error:not(.status){background:#450a0a !important;color:#fecaca !important;}";
            css += ".avatar{background:#0f172a !important;}";
        }

        var el = document.getElementById("prefsStyle");
        if (!el) {
            el = document.createElement("style");
            el.id = "prefsStyle";
            document.head.appendChild(el);
        }
        el.textContent = css;
    }

    function buildPanel() {

        var ps = document.createElement("style");
        ps.textContent =
            "#prefsBtn{position:fixed;right:16px;bottom:16px;width:52px;height:52px;border-radius:50%;border:none;background:#111827;color:#fff;font-size:24px;box-shadow:0 4px 14px rgba(0,0,0,.3);z-index:9999;cursor:pointer;padding:0;}" +
            "#prefsPanel{display:none;position:fixed;right:16px;bottom:80px;width:280px;max-width:calc(100vw - 32px);padding:16px;border-radius:16px;background:#fff;color:#111827;box-shadow:0 8px 30px rgba(0,0,0,.3);z-index:9999;font-family:Arial,sans-serif;}" +
            "#prefsPanel h3{font-size:16px;margin:0 0 12px;}" +
            "#prefsPanel h4{font-size:12px;margin:12px 0 6px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;}" +
            "#prefsPanel .row{display:flex;gap:6px;flex-wrap:wrap;}" +
            "#prefsPanel button{flex:1;padding:9px 6px;border:2px solid #e5e7eb;border-radius:10px;background:#f9fafb;color:#111827;font-size:13px;font-weight:bold;cursor:pointer;}" +
            "#prefsPanel button.on{border-color:#111827;background:#111827;color:#fff;}" +
            "#prefsPanel button.sw{flex:0 0 36px;height:36px;padding:0;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 2px #e5e7eb;}" +
            "#prefsPanel button.sw.on{box-shadow:0 0 0 3px #111827;}" +
            "#prefsPanel button.reset{margin-top:14px;width:100%;flex:none;}";
        document.head.appendChild(ps);

        var btn = document.createElement("button");
        btn.id = "prefsBtn";
        btn.setAttribute("aria-label", "Preferences");
        btn.textContent = "⚙️";

        var panel = document.createElement("div");
        panel.id = "prefsPanel";

        var html = "<h3>Preferences</h3>";

        html += "<h4>Theme</h4><div class='row'>" +
            "<button data-k='theme' data-v='light'>Light</button>" +
            "<button data-k='theme' data-v='dark'>Dark</button>" +
            "<button data-k='theme' data-v='auto'>Auto</button></div>";

        html += "<h4>Accent color</h4><div class='row'>";
        accents.forEach(function (c) {
            html += "<button class='sw' data-k='accent' data-v='" + c + "' style='background:" + c + "'></button>";
        });
        html += "</div>";

        html += "<h4>Text size</h4><div class='row'>" +
            "<button data-k='size' data-v='normal'>Normal</button>" +
            "<button data-k='size' data-v='large'>Large</button>" +
            "<button data-k='size' data-v='xl'>Extra</button></div>";

        html += "<button class='reset' data-k='reset'>Reset to default</button>";

        panel.innerHTML = html;

        function mark() {
            panel.querySelectorAll("button[data-k]").forEach(function (b) {
                var k = b.getAttribute("data-k");
                if (k === "reset") { return; }
                b.classList.toggle("on", prefs[k] === b.getAttribute("data-v"));
            });
        }

        btn.onclick = function () {
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        };

        panel.addEventListener("click", function (e) {
            var b = e.target.closest("button[data-k]");
            if (!b) { return; }

            var k = b.getAttribute("data-k");

            if (k === "reset") {
                prefs = { theme: defaults.theme, accent: defaults.accent, size: defaults.size };
            } else {
                prefs[k] = b.getAttribute("data-v");
            }

            save();
            apply();
            mark();
        });

        document.body.appendChild(btn);
        document.body.appendChild(panel);
        mark();
    }

    apply();
    buildPanel();

})();