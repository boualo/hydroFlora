(() => {
    window.HF = window.HF || {};
  
    const icons = {
      good: "✓",
      warn: "!",
      bad: "×"
    };
  
    window.HF.toast = (message, type="good", title="HydroFlora") => {
      const host = document.getElementById("toastHost");
      if (!host) return;
  
      const t = document.createElement("div");
      t.className = `toast glass ${type}`;
      t.innerHTML = `
        <div class="ic">${icons[type] || "•"}</div>
        <div>
          <div class="t">${title}</div>
          <div class="m">${message}</div>
        </div>
      `;
      host.appendChild(t);
      setTimeout(() => t.style.opacity = "0", 2600);
      setTimeout(() => t.remove(), 3200);
    };
  })();
  