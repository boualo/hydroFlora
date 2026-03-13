(() => {
    window.HF = window.HF || {};
  
    const state = {
      ph: 6.1,
      ec: 1.9,
      co2: 425,
      water: 68,
      temp: 22.4,
      hum: 56,
      solar: 62,
      wind: 38,
      battery: 82,
      npk:{
           n:120,
           p:50,
           k:140
          },
      shield: true,
      actuators: {
        pump: true,
        valve: true,
        cover: true,
        dosing: false
      }
    };
  
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  
    function step(){
      // smooth-ish variations
      const n = (s) => (Math.random() - 0.5) * s;
  
      state.ph = clamp(state.ph + n(0.05), 5.6, 6.5);
      state.ec = clamp(state.ec + n(0.06), 1.4, 2.4);
      state.co2 = clamp(state.co2 + n(6) + 3*Math.sin(Date.now()/8000), 390, 520);
      state.water = clamp(state.water + n(1.2), 40, 95);
      state.temp = clamp(state.temp + n(0.18), 18, 30);
      state.hum  = clamp(state.hum + n(0.9), 35, 80);
      state.npk.n = clamp(state.npk.n + n(2),80,200);
      state.npk.p = clamp(state.npk.p + n(1),30,100);
      state.npk.k = clamp(state.npk.k + n(2),80,200);
  
      // energy blend
      const s = clamp(55 + 15*Math.sin(Date.now()/10000) + n(3), 10, 90);
      state.solar = Math.round(s);
      state.wind = 100 - state.solar;
      state.battery = clamp(state.battery + n(0.25) - (state.actuators.pump ? 0.06 : 0.02), 30, 98);
  
      // shield logic
      state.shield = state.co2 > 430 ? true : (state.co2 < 420 ? false : state.shield);
      state.actuators.cover = state.shield;
    }
  
    window.HF.sensors = {
      get: () => ({...state, actuators: {...state.actuators}}),
      spikeCO2: () => { state.co2 = 490; state.shield = true; state.actuators.cover = true; },
      toggleShield: () => { state.shield = !state.shield; state.actuators.cover = state.shield; },
      toggleActuator: (k) => { state.actuators[k] = !state.actuators[k]; },
      tick: step
    };
  })();
  