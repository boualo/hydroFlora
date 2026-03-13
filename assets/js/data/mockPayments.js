(() => {
    window.HF = window.HF || {};
  
    const payments = [
      { month:"2025-12", amount:320, status:"pending", invoice:"#INV-1205" },
      { month:"2025-11", amount:320, status:"paid", invoice:"#INV-1194" },
      { month:"2025-10", amount:320, status:"paid", invoice:"#INV-1181" },
      { month:"2025-09", amount:320, status:"paid", invoice:"#INV-1170" },
      { month:"2025-08", amount:320, status:"paid", invoice:"#INV-1156" }
    ];
  
    const impact = {
      waterSaved: "12,400 L",
      greenArea: "120 m²",
      foodProduced: "148 kg",
      co2Avoided: "62 kg"
    };
  
    window.HF.payments = {
      list: () => payments.map(x => ({...x})),
      impact: () => ({...impact})
    };
  })();
  