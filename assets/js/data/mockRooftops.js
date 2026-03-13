(() => {
    window.HF = window.HF || {};
    const now = () => new Date().toLocaleString();
  
    const rooftops = [
      { id:"Casa-R1", city:"Casablanca", status:"good", co2:418, water:71, battery:86, last: now(), notes:"Stable hydroponics. Shield standby." },
      { id:"Rabat-R2", city:"Rabat", status:"warn", co2:441, water:63, battery:72, last: now(), notes:"CO₂ peaks near traffic hours. Cover active." },
      { id:"Marr-R3", city:"Marrakech", status:"good", co2:425, water:78, battery:80, last: now(), notes:"Energy mix optimized, water stable." },
      { id:"Tng-R4", city:"Tangier", status:"bad", co2:502, water:49, battery:41, last: now(), notes:"Sensor drift suspected + low battery." },
      { id:"Agd-R5", city:"Agadir", status:"warn", co2:437, water:58, battery:66, last: now(), notes:"Water level oscillations." }
    ];
  
    let tickets = 6;
  
    function jitter(){
      for (const r of rooftops){
        r.co2 = Math.max(390, Math.min(520, Math.round(r.co2 + (Math.random()-0.5)*14)));
        r.water = Math.max(35, Math.min(95, Math.round(r.water + (Math.random()-0.5)*4)));
        r.battery = Math.max(25, Math.min(98, Math.round(r.battery + (Math.random()-0.5)*3)));
  
        // status heuristic
        if (r.battery < 45 || r.co2 > 485 || r.water < 45) r.status = "bad";
        else if (r.co2 > 435 || r.water < 60 || r.battery < 70) r.status = "warn";
        else r.status = "good";
        r.last = now();
      }
      tickets += Math.random() < 0.08 ? 1 : 0;
    }
  
    window.HF.rooftops = {
      list: () => rooftops.map(x => ({...x})),
      stats: () => {
        const all = rooftops.length;
        const good = rooftops.filter(x => x.status==="good").length;
        const warn = rooftops.filter(x => x.status==="warn").length;
        const bad  = rooftops.filter(x => x.status==="bad").length;
        return { all, good, warn, bad, tickets };
      },
      tick: jitter
    };
  })();
  