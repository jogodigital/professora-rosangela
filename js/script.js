// ====== NUVENS ANIMADAS NO SVG DE FUNDO ======
(function(){
  const svg = document.querySelector('.bg-stage');
  const layer = document.getElementById('clouds');

  function spawnCloud({y=100, scale=1, speed=20}={}){
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#cloud-shape');
    const startX = -200 - Math.random()*300;
    const driftY = y + (Math.random()*60 - 30);
    use.setAttribute('transform', `translate(${startX}, ${driftY}) scale(${scale})`);
    use.style.opacity = (0.7 + Math.random()*0.3).toFixed(2);
    layer.appendChild(use);

    const width = svg.viewBox.baseVal.width || 1440;
    const endX = width + 300;
        const pxPerSec = speed + Math.random()*25; // velocidade aleatória
        const total = (endX - startX) / pxPerSec;

        let x = startX; let last = performance.now();
        function step(now){
          const dt = (now - last) / 1000; last = now;
          x += pxPerSec * dt;
          use.setAttribute('transform', `translate(${x}, ${driftY}) scale(${scale})`);
          if(x < endX) requestAnimationFrame(step); else use.remove();
        }
        requestAnimationFrame(step);
      }

      // Spawner de nuvens em camadas
      function startClouds(){
        const rows = [120, 220, 340, 460, 580];
        rows.forEach((y, i)=>{
          // spawn inicial por linha
          for(let k=0; k<3; k++){
            spawnCloud({ y: y + Math.random()*40 - 20, scale: 0.6 + i*0.12, speed: 12 + i*5 });
          }
          // spawn contínuo
          setInterval(()=> spawnCloud({ y, scale: 0.6 + i*0.12, speed: 12 + i*5 }), 3500 + i*900);
        });
      }
      startClouds();
    })();

    // ====== MINI ILUSTRAÇÃO NA MOCKUP (CANVAS) ======
    (function(){

      function drawSky(){
        const g = ctx.createLinearGradient(0,0,0,canvas.height);
        g.addColorStop(0,'#cfeeff'); g.addColorStop(1,'#eaf6ff');
        ctx.fillStyle = g; ctx.fillRect(0,0,canvas.width, canvas.height);
      }      

      function puffyCloud(x,y,s=1){
        ctx.save(); ctx.translate(x,y); ctx.scale(s,s);
        ctx.fillStyle = 'rgba(255,255,255,.95)';
        ctx.beginPath();
        ctx.arc(0,0,16,0,Math.PI*2);
        ctx.arc(20,-6,14,0,Math.PI*2);
        ctx.arc(38,0,18,0,Math.PI*2);
        ctx.arc(18,8,14,0,Math.PI*2);
        ctx.fill(); ctx.restore();
      }

      let t = 0;
      function draw(){
        drawSky();
        // nuvens
        for(let i=0;i<5;i++){
          puffyCloud((i*120 + (t*20) % (canvas.width+200)) - 100, 40 + i*12, 0.9);
        }       
        
        requestAnimationFrame(()=>{ t += 0.016; draw(); });
      }
    })();