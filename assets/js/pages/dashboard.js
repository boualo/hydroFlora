(() => {
    const phVal = document.getElementById("phVal");
    const ecVal = document.getElementById("ecVal");
    const co2Val = document.getElementById("co2Val");
    const wVal = document.getElementById("wVal");
  
    const phBadge = document.getElementById("phBadge");
    const ecBadge = document.getElementById("ecBadge");
    const co2Badge = document.getElementById("co2Badge");
    const wBadge = document.getElementById("wBadge");
  
    const recoList = document.getElementById("recoList");
    const waterSaved = document.getElementById("waterSaved");
    const co2Avoided = document.getElementById("co2Avoided");
    const nextHarvest = document.getElementById("nextHarvest");
  
    const simulateSpike = document.getElementById("simulateSpike");
    const openQuickActions = document.getElementById("openQuickActions");
  
    // chart buffers
    const labels = Array.from({length: 20}, (_, i) => `${(20-i)*3}m`).reverse();
    const phSeries = [];
    const co2Series = [];
    const ecSeries = [];
  
    // init
    for (let i=0;i<labels.length;i++){
      window.HF.sensors.tick();
      const s = window.HF.sensors.get();
      phSeries.push(s.ph);
      ecSeries.push(s.ec);
      co2Series.push(s.co2);
    }
  
    const ctx = document.getElementById("trendChart")?.getContext("2d");
    const chart = window.HF.charts.makeLine(ctx, labels, [
      {
      label:"CO₂ (ppm)",
      data: co2Series,
      borderWidth:2,
      tension:.35,
      yAxisID:"y"
      },

      {
      label:"pH",
      data: phSeries,
      borderWidth:2,
      tension:.35,
      yAxisID:"y"
      },

      {
      label:"EC",
      data: ecSeries,
      borderWidth:2,
      tension:.35,
      yAxisID:"y1"
      }

    ]);
  
    function setBadge(el, kind, text){
        if(!el) return;

        el.classList.remove("good","warn","bad");
        el.classList.add(kind);
        el.textContent = text;
      }



 window.runAI = async function(){

try{

const s = window.HF.sensors.get()

let response = await fetch("http://127.0.0.1:5000/predict",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
temp: s.temp,
hum: s.hum,
ph: s.ph,
ec: s.ec,
co2: s.co2,
water: s.water,
n: s.npk?.n ?? 120,
p: s.npk?.p ?? 50,
k: s.npk?.k ?? 140
})

})

let data = await response.json()

console.log("AI response:",data)

updateDashboard(data)

}catch(error){

console.error("AI request error:",error)

}

}


 function updateDashboard(data){
  console.log("updateDashboard called", data)

// ALERTS
let alertsDiv = document.getElementById("alerts")

if(!alertsDiv) return

alertsDiv.innerHTML = ""

if(data.alerts && data.alerts.length > 0){

data.alerts.forEach(alert=>{
alertsDiv.innerHTML += "<p>⚠ "+alert+"</p>"
})

}else{

alertsDiv.innerHTML = "<p style='color:green'>System normal</p>"

}


// SENSOR HEALTH
if(data.sensor_status){

updateSensor("tempStatus",data.sensor_status.temp)
updateSensor("phStatus",data.sensor_status.ph)
updateSensor("ecStatus",data.sensor_status.ec)
updateSensor("co2Status",data.sensor_status.co2)
updateSensor("npkStatus",data.sensor_status.npk)

// halo animation
highlightCard("ph",data.sensor_status.ph)
highlightCard("ec",data.sensor_status.ec)
highlightCard("co2",data.sensor_status.co2)
highlightCard("npk",data.sensor_status.npk)

}

}

function updateSensor(id,status){

let el = document.getElementById(id)

if(!el) return

let msgId = id.replace("Status","Msg")
let msg = document.getElementById(msgId)

if(status === "ok"){

el.innerHTML = "<span style='color:#2ecc71'>OK</span>"

if(msg) msg.innerText = "Device operating normally"

}else{

el.innerHTML = "<span style='color:#e74c3c'>Fault</span>"

if(msg) msg.innerText = "Sensor malfunction detected"

}

}




function highlightCard(sensor,status){

const card = document.querySelector(`[data-open="${sensor}"]`)

if(!card) return

card.classList.remove("sensor-alert")

if(status === "bad"){

card.classList.add("sensor-alert")

}

}
  
    function recos(s){
      const list = [];
      if (s.co2 > 440) list.push({t:"CO₂ high — greenhouse shield ON", d:"Cover deployed automatically to protect crops from exhaust peaks."});
      else list.push({t:"CO₂ stable", d:"Shield standby. Monitoring city air variations."});
  
      if (s.ph < 5.8) list.push({t:"pH too low", d:"Suggestion: add base solution gradually and recheck after 10 minutes."});
      else if (s.ph > 6.3) list.push({t:"pH too high", d:"Suggestion: add pH down solution slowly, avoid overshoot."});
      else list.push({t:"pH optimal", d:"No action needed. Keep dosing schedule unchanged."});
  
      if (s.ec < 1.6) list.push({t:"EC low", d:"Nutrient concentration may be weak. Consider micro-dosing NPK."});
      else if (s.ec > 2.2) list.push({t:"EC high", d:"Dilute solution slightly to reduce conductivity and prevent stress."});
      else list.push({t:"EC stable", d:"Nutrient conductivity is within recommended range."});
  
      if (s.water < 55) list.push({t:"Water level dropping", d:"Closed-loop refill recommended. Check filter and reservoir valves."});
      else list.push({t:"Water loop healthy", d:"Recycling system maintains stable levels."});
  
      return list.slice(0,4);
    }
  
    function renderReco(items){
      recoList.innerHTML = items.map(x => `
        <div class="reco-item">
          <div class="reco-top">
            <div class="reco-title">${x.t}</div>
            <span class="badge good">AI</span>
          </div>
          <div class="reco-desc">${x.d}</div>
        </div>
      `).join("");
    }




  
    function update(){
      window.HF.sensors.tick();
      const s = window.HF.sensors.get();
  
      phVal.textContent = s.ph.toFixed(1);
      ecVal.textContent = s.ec.toFixed(1);
      co2Val.textContent = Math.round(s.co2);
      wVal.textContent = Math.round(s.water);
  
      // badges
      setBadge(phBadge, s.ph < 5.8 || s.ph > 6.3 ? "warn" : "good", s.ph < 5.8 ? "Low" : (s.ph > 6.3 ? "High" : "Optimal"));
      setBadge(ecBadge, s.ec < 1.6 || s.ec > 2.2 ? "warn" : "good", s.ec < 1.6 ? "Low" : (s.ec > 2.2 ? "High" : "Stable"));
      setBadge(co2Badge, s.co2 > 460 ? "bad" : (s.co2 > 435 ? "warn" : "good"), s.co2 > 460 ? "Critical" : (s.co2 > 435 ? "High" : "OK"));
      setBadge(wBadge, s.water < 55 ? "warn" : "good", s.water < 55 ? "Low" : "OK");
  
      // impact (fake)
      if (waterSaved){
  waterSaved.textContent = `${Math.round(34 + 18*Math.sin(Date.now()/12000))} L`;
}

if (co2Avoided){
  co2Avoided.textContent = `${(1.4 + 0.5*Math.abs(Math.sin(Date.now()/15000))).toFixed(1)} kg`;
}

if (nextHarvest){
  nextHarvest.textContent = `${Math.round(5 + 2*Math.sin(Date.now()/20000))} days`;
}
      // recommendations
      renderReco(recos(s));
  
      // chart
      if (chart){
        chart.data.labels.push("");
        chart.data.labels.shift();
        chart.data.datasets[0].data.push(Math.round(s.co2));
        chart.data.datasets[1].data.push(+s.ph.toFixed(2));
        chart.data.datasets[2].data.push(+s.ec.toFixed(2));
         for (const ds of chart.data.datasets){
         ds.data.shift();
           }

        chart.update("none");
      }
    }
  
    // interactions
    simulateSpike?.addEventListener("click", () => {
      window.HF.sensors.spikeCO2();
      window.HF.toast("CO₂ spike simulated — greenhouse cover engaged.", "warn");
    });
  
    openQuickActions?.addEventListener("click", () => {
      window.HF.modal.open("Quick actions", `
        <div class="grid-2" style="grid-template-columns:1fr 1fr; gap:10px;">
          <button class="btn btn-soft" onclick="window.HF.toast('Pump boosted for 30s (demo).','good')">Boost Pump</button>
          <button class="btn btn-soft" onclick="window.HF.toast('Micro dosing NPK started (demo).','good')">Micro Dose NPK</button>
          <button class="btn btn-soft" onclick="window.HF.toast('Filter backwash scheduled (demo).','good')">Backwash Filter</button>
          <button class="btn btn-soft" onclick="window.HF.toast('Greenhouse cover toggled (demo).','warn')">Toggle Cover</button>
        </div>
        <div class="hr"></div>
        <div class="muted">These actions are simulated (static prototype).</div>
      `);
    });
  
    document.querySelectorAll(".kpi").forEach(k => {
      k.addEventListener("click", () => {
        const key = k.getAttribute("data-open");
        window.HF.modal.open("Metric details", `
          <div class="muted">Metric: <strong>${key}</strong></div>
          <div class="hr"></div>
          <p>In a real system, this page would show calibration, thresholds, and actionable analytics.</p>
          <button class="btn btn-primary" onclick="window.HF.toast('Threshold updated (demo).','good')">Update threshold</button>
        `);
      });
    });
  async function predictWater() {

    const data = {
        pH: parseFloat(phVal.textContent),
        TDS: parseFloat(ecVal.textContent),
        water_level: parseFloat(wVal.textContent) / 100,
        DHT_temp: 2000,
        DHT_humidity: 40,
        water_temp: 1300
    };

    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    console.log("Prediction:", result);

    if(result.water_change_needed == 1){
        document.getElementById("model_response").innerText = "Water change needed!";
        document.getElementById("model_response").style.color = "red";
    }
    else{
        document.getElementById("model_response").innerText = "Water conditions are good.";
        document.getElementById("model_response").style.color = "green";
    }

}
setInterval(predictWater, 5000);
    update();
    setInterval(update,1200);   // simulation capteurs
    setInterval(runAI,3000);    // analyse AI
   
  })();
  