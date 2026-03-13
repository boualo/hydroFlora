(() => {
    const envCtx = document.getElementById("envChart")?.getContext("2d");
    const nutriCtx = document.getElementById("nutriChart")?.getContext("2d");
  
    const envState = document.getElementById("envState");
    const solarVal = document.getElementById("solarVal");
    const windVal = document.getElementById("windVal");
    const batVal = document.getElementById("batVal");
    const loadVal = document.getElementById("loadVal");
  
    const actGrid = document.getElementById("actGrid");
    const toggleShield = document.getElementById("toggleShield");
    const exportBtn = document.getElementById("exportBtn");
  
    const labels = Array.from({length: 18}, (_, i) => `${(18-i)*4}m`).reverse();
  
    const env = { co2: [], temp: [], hum: [] };
    const nut = { ph: [], ec: [], water: [] };
  
    for (let i=0;i<labels.length;i++){
      window.HF.sensors.tick();
      const s = window.HF.sensors.get();
      env.co2.push(Math.round(s.co2));
      env.temp.push(+s.temp.toFixed(2));
      env.hum.push(Math.round(s.hum));
      nut.ph.push(+s.ph.toFixed(2));
      nut.ec.push(+s.ec.toFixed(2));
      nut.water.push(Math.round(s.water));
    }
  
    const envChart = window.HF.charts.makeLine(envCtx, labels, [
      { label:"CO₂ (ppm)", data: env.co2, borderWidth:2, tension:.35 },
      { label:"Temp (°C)", data: env.temp, borderWidth:2, tension:.35 },
      { label:"Humidity (%)", data: env.hum, borderWidth:2, tension:.35 },
    ]);
  
    const nutriChart = window.HF.charts.makeLine(nutriCtx, labels, [
      { label:"pH", data: nut.ph, borderWidth:2, tension:.35 },
      { label:"EC", data: nut.ec, borderWidth:2, tension:.35 },
      { label:"Water (%)", data: nut.water, borderWidth:2, tension:.35 },
    ]);
  
    function renderAct(s){
      const items = [
        {k:"pump", t:"Pump"},
        {k:"valve", t:"Valve"},
        {k:"cover", t:"Greenhouse Cover"},
        {k:"dosing", t:"NPK Dosing"},
      ];
  
      actGrid.innerHTML = items.map(it => {
        const on = !!s.actuators[it.k];
        return `
          <div class="act">
            <div class="act-top">
              <div style="font-weight:900">${it.t}</div>
              <div class="switch ${on ? "on":""}" data-k="${it.k}"></div>
            </div>
            <div class="muted small" style="margin-top:8px">
              Status: <strong>${on ? "ON" : "OFF"}</strong>
            </div>
          </div>
        `;
      }).join("");
  
      actGrid.querySelectorAll(".switch").forEach(sw => {
        sw.addEventListener("click", () => {
          const k = sw.getAttribute("data-k");
          window.HF.sensors.toggleActuator(k);
          window.HF.toast(`${k} toggled (demo).`, "good");
          renderAct(window.HF.sensors.get());
        });
      });
    }
  
    function update(){
      window.HF.sensors.tick();
      const s = window.HF.sensors.get();
  
      // states
      envState.textContent = s.co2 > 460 ? "High CO₂ detected — shield active" : "Stable";
      solarVal.textContent = `${s.solar}%`;
      windVal.textContent = `${s.wind}%`;
      batVal.textContent = `${Math.round(s.battery)}%`;
      loadVal.textContent = s.actuators.pump ? "Normal+" : "Normal";
  
      // charts shift
      if (envChart){
        envChart.data.datasets[0].data.push(Math.round(s.co2));
        envChart.data.datasets[1].data.push(+s.temp.toFixed(2));
        envChart.data.datasets[2].data.push(Math.round(s.hum));
        envChart.data.datasets.forEach(ds => ds.data.shift());
        envChart.update("none");
      }
      if (nutriChart){
        nutriChart.data.datasets[0].data.push(+s.ph.toFixed(2));
        nutriChart.data.datasets[1].data.push(+s.ec.toFixed(2));
        nutriChart.data.datasets[2].data.push(Math.round(s.water));
        nutriChart.data.datasets.forEach(ds => ds.data.shift());
        nutriChart.update("none");
      }
    }
  
    toggleShield?.addEventListener("click", () => {
      window.HF.sensors.toggleShield();
      const s = window.HF.sensors.get();
      window.HF.toast(`Shield ${s.shield ? "enabled" : "disabled"} (demo).`, s.shield ? "warn" : "good");
      renderAct(s);
    });
  
    exportBtn?.addEventListener("click", () => {
      window.HF.toast("Snapshot exported (demo).", "good");
    });
  
    renderAct(window.HF.sensors.get());
    update();
    setInterval(update, 1200);
  })();
  