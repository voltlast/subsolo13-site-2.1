// Gate password + transition + audio control
const PASSWORD = '231225';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#gate-form');
  const input = document.querySelector('#pass');
  const portal = document.getElementById('portal');

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(input.value.trim() === PASSWORD){
        portal.classList.add('active');
        setTimeout(()=>{ location.href = 'shop.html'; }, 1800);
      }else{
        const card = document.querySelector('.gate');
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
      }
    });
  }

  const playBtn = document.getElementById('play-audio');
  const audio = document.getElementById('ritual-audio');
  if(playBtn && audio){
    playBtn.addEventListener('click', ()=>{
      if(audio.paused){
        audio.play().catch(()=>{});
        playBtn.textContent = 'Pausar ritual';
      }else{
        audio.pause();
        playBtn.textContent = 'Iniciar ritual (som)';
      }
    });
  }
});
