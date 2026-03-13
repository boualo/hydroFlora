(() => {
    const rows = document.getElementById("rows");
    const q = document.getElementById("q");
    const status = document.getElementById("status");
    const reset = document.getElementById("reset");
  
    const kOnline = document.getElementById("kOnline");
    const kWarn = document.getElementById("kWarn");
    const kBad = document.getElementById("kBad");
    const kTickets = document.getElementById("kTickets");
    const hotAlerts = document.getElementById("hotAlerts");
  
    function badge(st){
      const cls = st;
      const label = st === "good" ? "Good" : (st === "warn" ? "Warning" : "Critical");
      return `<span class="row-badge ${cls}">${label}</span>`;
    }
  
    function render(){
      const all = window.HF.rooftops.list();
      const qq = (q?.value || "").toLowerCase().trim();
      const st = status?.value || "all";
  
      const filtered = all.filter(r => {
        const okQ = !qq || (r.id.toLowerCase().includes(qq) || r.city.toLowerCase().includes(qq));
        const okS = st === "all" ? true : r.status === st;
        return okQ && okS;
      });
  
      rows.innerHTML = filtered.map(r => `
        <tr data-id="${r.id}">
          <td><strong>${r.id}</strong></td>
          <td>${r.city}</td>
          <td>${badge(r.status)}</td>
          <td>${r.co2} ppm</td>
          <td>${r.water}%</td>
          <td>${r.battery}%</td>
          <td class="muted">${r.last}</td>
        </tr>
      `).join("");
  
      rows.querySelectorAll("tr").forEach(tr => {
        tr.addEventListener("click", () => {
          const id = tr.getAttribute("data-id");
          const r = all.find(x => x.id === id);
          window.HF.modal?.open?.("Rooftop details", `
            <div class="grid-2" style="grid-template-columns:1fr 1fr; gap:10px;">
              <div class="glass" style="border-radius:18px; padding:12px;">
                <div class="muted small">Rooftop</div>
                <div style="font-weight:950; font-size:1.2rem">${r.id}</div>
                <div class="muted small" style="margin-top:6px">City: ${r.city}</div>
              </div>
              <div class="glass" style="border-radius:18px; padding:12px;">
                <div class="muted small">Status</div>
                <div style="margin-top:8px">${badge(r.status)}</div>
                <div class="muted small" style="margin-top:8px">Last ping: ${r.last}</div>
              </div>
            </div>
            <div class="hr"></div>
            <div class="muted small">Notes</div>
            <div style="margin-top:6px">${r.notes}</div>
            <div class="hr"></div>
            <button class="btn btn-primary" onclick="window.HF.toast('Ticket created (demo).','good')">Open ticket</button>
          `);
        });
      });
  
      const stats = window.HF.rooftops.stats();
      kOnline.textContent = stats.all;
      kWarn.textContent = stats.warn;
      kBad.textContent = stats.bad;
      kTickets.textContent = stats.tickets;
  
      const hot = [...all]
        .sort((a,b) => (b.status.localeCompare(a.status)) || (b.co2 - a.co2))
        .slice(0,3);
  
      hotAlerts.innerHTML = hot.map(r => `
        <div class="hot">
          <div class="t">${r.id} · ${r.city}</div>
          <div class="m">${r.status === "bad" ? "Critical condition" : "Attention required"} — CO₂ ${r.co2} ppm · Water ${r.water}% · Battery ${r.battery}%</div>
        </div>
      `).join("");
    }
  
    // Add modal helper if not loaded via app.js page: ensure it exists
    if (!window.HF.modal){
      window.HF.modal = {
        open(title, html){
          const bd = document.getElementById("modalBackdrop");
          const m = document.getElementById("modal");
          const t = document.getElementById("modalTitle");
          const b = document.getElementById("modalBody");
          if (!bd || !m || !t || !b) return;
          t.textContent = title || "Details";
          b.innerHTML = html || "";
          bd.hidden = false; m.hidden = false;
          const close = () => window.HF.modal.close();
          document.getElementById("modalClose")?.addEventListener("click", close, { once:true });
          bd.addEventListener("click", close, { once:true });
        },
        close(){
          const bd = document.getElementById("modalBackdrop");
          const m = document.getElementById("modal");
          if (bd) bd.hidden = true;
          if (m) m.hidden = true;
        }
      };
    }
  
    q?.addEventListener("input", render);
    status?.addEventListener("change", render);
    reset?.addEventListener("click", () => { q.value=""; status.value="all"; render(); });
  
    document.getElementById("createTicket")?.addEventListener("click", () => {
      window.HF.toast("Ticket created (demo).", "good");
    });
  
    render();
    setInterval(() => { window.HF.rooftops.tick(); render(); }, 1600);
  })();
  