(() => {
    // Simple reveal-on-scroll
    const els = [];
    document.querySelectorAll(".card, .role, .kpi, .mini-card, .metric").forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      els.push(el);
    });
  
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.style.transition = "opacity .55s ease, transform .55s ease";
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
        io.unobserve(e.target);
      }
    }, { threshold: 0.08 });
  
    els.forEach(el => io.observe(el));
  })();
  