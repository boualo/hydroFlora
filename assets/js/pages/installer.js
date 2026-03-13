(() => {
    const stepsEl = document.getElementById("steps");
    const panel = document.getElementById("panel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const finishBtn = document.getElementById("finishBtn");
  
    const steps = [
      { t:"Connect gateway", s:"Wi-Fi / LTE / MQTT bridge", view: gatewayView },
      { t:"Attach sensors", s:"pH / EC / CO₂ / Level", view: sensorsView },
      { t:"Calibrate pH & EC", s:"2-point calibration", view: calibView },
      { t:"Test actuators", s:"Pump / Valve / Cover", view: actuatorsView },
      { t:"Validate shield", s:"CO₂ trigger behavior", view: shieldView },
      { t:"Finalize", s:"Save config & handover", view: finishView },
    ];
  
    let i = 0;
  
    function renderSteps(){
      stepsEl.innerHTML = steps.map((x, idx) => `
        <div class="step ${idx===i ? "active":""} ${idx<i ? "done":""}">
          <div class="l">
            <div class="n">${idx+1}</div>
            <div>
              <div class="t">${x.t}</div>
              <div class="s">${x.s}</div>
            </div>
          </div>
          <div class="muted small">${idx<i ? "✓" : (idx===i ? "…" : "")}</div>
        </div>
      `).join("");
    }
  
    function renderPanel(){
      panel.innerHTML = steps[i].view();
      prevBtn.disabled = i===0;
      nextBtn.textContent = (i===steps.length-1) ? "Done" : "Next";
    }
  
    prevBtn?.addEventListener("click", () => { if (i>0){ i--; renderSteps(); renderPanel(); } });
    nextBtn?.addEventListener("click", () => {
      if (i < steps.length-1){
        window.HF.toast("Step validated (demo).", "good");
        i++;
        renderSteps(); renderPanel();
      } else {
        window.HF.toast("Setup completed — handover ready.", "good");
      }
    });
  
    finishBtn?.addEventListener("click", () => {
      window.HF.toast("Configuration saved (demo).", "good");
    });
  
    function gatewayView(){
      return `
        <h2>Connect gateway</h2>
        <p>Bind the rooftop module to HydroFlora cloud (simulated).</p>
        <div class="hr"></div>
        <label class="field">
          <span class="muted small">Gateway ID</span>
          <input class="input" value="GW-CASA-R1-8842" />
        </label>
        <label class="field" style="margin-top:10px">
          <span class="muted small">Network</span>
          <select class="input">
            <option>Wi-Fi</option>
            <option>LTE</option>
            <option>Ethernet</option>
          </select>
        </label>
        <div class="hr"></div>
        <button class="btn btn-primary" onclick="window.HF.toast('Gateway linked (demo).','good')">Link gateway</button>
      `;
    }
  
    function sensorsView(){
      return `
        <h2>Attach sensors</h2>
        <p>Confirm sensor presence and signal integrity.</p>
        <div class="hr"></div>
        <div class="grid-2" style="grid-template-columns:1fr 1fr; gap:10px;">
          ${sensorCard("pH sensor","Online","good")}
          ${sensorCard("EC sensor","Online","good")}
          ${sensorCard("CO₂ sensor","Online","warn")}
          ${sensorCard("Water level","Online","good")}
        </div>
        <div class="hr"></div>
        <button class="btn btn-soft" onclick="window.HF.toast('Sensor scan completed (demo).','good')">Scan</button>
      `;
    }
  
    function calibView(){
      return `
        <h2>Calibrate pH & EC</h2>
        <p>2-point calibration to ensure accurate dosing.</p>
        <div class="hr"></div>
        <div class="grid-2" style="grid-template-columns:1fr 1fr; gap:10px;">
          <div class="glass" style="border-radius:22px; padding:14px;">
            <div style="font-weight:900">pH Calibration</div>
            <div class="muted small" style="margin-top:6px">Use buffer 4.0 and 7.0</div>
            <div class="hr"></div>
            <button class="btn btn-soft" onclick="window.HF.toast('pH calibrated (demo).','good')">Calibrate</button>
          </div>
          <div class="glass" style="border-radius:22px; padding:14px;">
            <div style="font-weight:900">EC Calibration</div>
            <div class="muted small" style="margin-top:6px">Use standard 1.41 mS/cm</div>
            <div class="hr"></div>
            <button class="btn btn-soft" onclick="window.HF.toast('EC calibrated (demo).','good')">Calibrate</button>
          </div>
        </div>
      `;
    }
  
    function actuatorsView(){
      return `
        <h2>Test actuators</h2>
        <p>Verify pump, valve, and greenhouse cover motion.</p>
        <div class="hr"></div>
        <div class="grid-2" style="grid-template-columns:1fr 1fr; gap:10px;">
          ${actCard("Pump test","Run for 10s")}
          ${actCard("Valve test","Open/Close")}
          ${actCard("Cover test","Deploy/Retract")}
          ${actCard("Dosing test","Micro-dose")}
        </div>
      `;
    }
  
    function shieldView(){
      return `
        <h2>Validate CO₂ shield</h2>
        <p>Simulate exhaust peak and confirm automatic cover deployment.</p>
        <div class="hr"></div>
        <button class="btn btn-primary" onclick="window.HF.toast('CO₂ spike simulated — cover deployed (demo).','warn')">Simulate CO₂ spike</button>
        <div class="hr"></div>
        <div class="muted">Expected behavior: CO₂ threshold triggers cover, ventilation adjusts, alert logged.</div>
      `;
    }
  
    function finishView(){
      return `
        <h2>Finalize & handover</h2>
        <p>Save configuration and generate a handover report (prototype).</p>
        <div class="hr"></div>
        <button class="btn btn-primary" onclick="window.HF.toast('Handover PDF generated (demo).','good')">Generate report</button>
        <div class="hr"></div>
        <div class="muted">You can now switch to User dashboard to monitor the module.</div>
      `;
    }
  
    function sensorCard(name, st, kind){
      const c = kind === "warn" ? "rgba(255,211,107,.95)" : "rgba(45,255,176,.95)";
      return `
        <div class="glass" style="border-radius:22px; padding:14px;">
          <div style="font-weight:900">${name}</div>
          <div class="muted small" style="margin-top:6px">Status: <strong style="color:${c}">${st}</strong></div>
        </div>
      `;
    }
    function actCard(name, desc){
      return `
        <div class="glass" style="border-radius:22px; padding:14px;">
          <div style="font-weight:900">${name}</div>
          <div class="muted small" style="margin-top:6px">${desc}</div>
          <div class="hr"></div>
          <button class="btn btn-soft" onclick="window.HF.toast('${name} executed (demo).','good')">Run</button>
        </div>
      `;
    }
  
    renderSteps();
    renderPanel();
  })();
  