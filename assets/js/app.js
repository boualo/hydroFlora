(() => {
    window.HF = window.HF || {};
  
    /* =========================
       THEME SWITCH (Light/Dark)
       ========================= */
    const THEME_KEY = "hf_theme"; // "light" | "dark"
  
    function applyTheme(mode) {
      document.documentElement.classList.toggle("theme-dark", mode === "dark");
      localStorage.setItem(THEME_KEY, mode);
      updateToggleUI();
    }
  
    function currentTheme() {
      return document.documentElement.classList.contains("theme-dark") ? "dark" : "light";
    }
  
    function updateToggleUI() {
      const btn = document.getElementById("themeToggle");
      if (!btn) return;
  
      const icon = btn.querySelector(".icon");
      const isDark = currentTheme() === "dark";
  
      if (icon) icon.textContent = isDark ? "☀" : "☾";
      btn.title = isDark ? "Switch to Light" : "Switch to Dark";
      btn.setAttribute("aria-label", btn.title);
    }
  
    // Init theme from storage (default = light)
    const saved = localStorage.getItem(THEME_KEY) || "light";
    if (saved === "dark") document.documentElement.classList.add("theme-dark");
    updateToggleUI();
  
    // Click handler
    document.addEventListener("click", (e) => {
      const t = e.target.closest("#themeToggle");
      if (!t) return;
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  
    /* =========================
       STARFIELD (only if canvas exists)
       ========================= */
    const c = document.getElementById("starfield");
    if (c) {
      const ctx = c.getContext("2d");
      let w, h, stars;
  
      function resize(){
        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
        stars = Array.from({length: Math.min(220, Math.floor(w*h/12000))}).map(() => ({
          x: Math.random()*w,
          y: Math.random()*h,
          z: Math.random()*1,
          r: Math.random()*1.6 + 0.2
        }));
      }
  
      window.addEventListener("resize", resize);
      resize();
  
      let t = 0;
      function draw(){
        t += 0.01;
        ctx.clearRect(0,0,w,h);
        for (const s of stars){
          s.y += 0.18 + 0.22*s.z;
          if (s.y > h) { s.y = -10; s.x = Math.random()*w; }
          const tw = 0.5 + 0.5*Math.sin(t + s.x*0.002);
          ctx.globalAlpha = 0.18 + 0.22*tw;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
          ctx.fillStyle = "white";
          ctx.fill();
        }
        requestAnimationFrame(draw);
      }
      draw();
    }
  
    /* =========================
       MODAL HELPERS
       ========================= */
    window.HF.modal = {
      open(title, html) {
        const bd = document.getElementById("modalBackdrop");
        const m = document.getElementById("modal");
        const t = document.getElementById("modalTitle");
        const b = document.getElementById("modalBody");
        if (!bd || !m || !t || !b) return;
  
        t.textContent = title || "Details";
        b.innerHTML = html || "";
        bd.hidden = false;
        m.hidden = false;
  
        const close = () => window.HF.modal.close();
        document.getElementById("modalClose")?.addEventListener("click", close, { once:true });
        bd.addEventListener("click", close, { once:true });
      },
      close() {
        const bd = document.getElementById("modalBackdrop");
        const m = document.getElementById("modal");
        if (bd) bd.hidden = true;
        if (m) m.hidden = true;
      }
    };
  })();
  