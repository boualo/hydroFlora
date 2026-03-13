(() => {
    // Cursor glow (lightweight)
    const glow = document.createElement("div");
    glow.style.position = "fixed";
    glow.style.left = "0";
    glow.style.top = "0";
    glow.style.width = "18px";
    glow.style.height = "18px";
    glow.style.borderRadius = "999px";
    glow.style.pointerEvents = "none";
    glow.style.zIndex = "100";
    glow.style.mixBlendMode = "screen";
    glow.style.background = "rgba(109,252,255,.25)";
    glow.style.boxShadow = "0 0 40px rgba(109,252,255,.22), 0 0 80px rgba(45,255,176,.10)";
    glow.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(glow);
  
    let x = window.innerWidth/2, y = window.innerHeight/2;
    let tx = x, ty = y;
  
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
    });
  
    function tick(){
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      glow.style.left = x + "px";
      glow.style.top = y + "px";
      requestAnimationFrame(tick);
    }
    tick();
  
    // Tilt card on landing (optional)
    const tilt = document.getElementById("tiltCard");
    if (tilt) {
      tilt.addEventListener("mousemove", (e) => {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `rotateX(${(-py*6).toFixed(2)}deg) rotateY(${(px*8).toFixed(2)}deg) translateY(-2px)`;
      });
      tilt.addEventListener("mouseleave", () => tilt.style.transform = "");
    }
  })();
  