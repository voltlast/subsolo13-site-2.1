// Purple energy particles (canvas)
const canvas = document.getElementById('energy');
const ctx = canvas.getContext('2d', { alpha: false });

let W, H, particles = [], last = 0;
function size(){ W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
addEventListener('resize', size); size();

function spawn(n=120){
  particles.length = 0;
  for(let i=0;i<n;i++){
    particles.push({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*2 + 0.6,
      vx: (Math.random()-.5)*.6, vy: (Math.random()-.5)*.6,
      life: Math.random()*8 + 6
    });
  }
}
spawn();

function step(t){
  const dt = Math.min((t - last)/16, 2); last = t;
  ctx.fillStyle = '#090612';
  ctx.fillRect(0,0,W,H);

  for(const p of particles){
    p.x += p.vx * dt; p.y += p.vy * dt;
    if(p.x < -10) p.x = W+10; if(p.x > W+10) p.x = -10;
    if(p.y < -10) p.y = H+10; if(p.y > H+10) p.y = -10;
    p.life -= 0.01*dt; if(p.life <= 0){ p.life = Math.random()*8+6; }

    const glow = 0.35 + (p.life%1)*0.65;
    ctx.beginPath();
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18);
    grad.addColorStop(0, `rgba(186,80,255,${0.8*glow})`);
    grad.addColorStop(1, 'rgba(186,80,255,0)');
    ctx.fillStyle = grad;
    ctx.arc(p.x, p.y, 18, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.07)';
    ctx.fillRect(p.x-0.5, p.y-0.5, 1, 1);
  }
  requestAnimationFrame(step);
}
requestAnimationFrame(step);