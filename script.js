// Espera a página carregar completamente
window.addEventListener('load', function() {
  
  const audio = document.getElementById('background-music');
  if (!audio) return;

  // Trava para garantir que a música só comece uma vez por visita
  let hasStarted = false; 

  // Função que será chamada na primeira interação do usuário
  function startMusicOnInteraction() {
    // Se a música já começou nesta visita, não faz nada
    if (hasStarted) return; 
    hasStarted = true;
    
    // Remove os "ouvintes" para que esta função não seja chamada novamente
    document.removeEventListener('scroll', startMusicOnInteraction);
    document.removeEventListener('click', startMusicOnInteraction);
    document.removeEventListener('touchstart', startMusicOnInteraction);

    console.log("Interação detectada! Iniciando música com fade-in a partir de 0s.");

    // --- Lógica do Fade-in ---
    const targetVolume = 0.15;
    const fadeDuration = 4000; // 4 segundos
    const fadeSteps = 50;
    const stepInterval = fadeDuration / fadeSteps;
    const volumeStep = targetVolume / fadeSteps;

    // REQUISITO 1: Começa o áudio com volume 0 e a partir do segundo 0
    audio.volume = 0;
    audio.currentTime = 0; // Alterado de 11 para 0
    
    // O play AGORA vai funcionar, pois foi acionado por uma interação do usuário
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        // O play foi bem-sucedido, então inicia o fade-in
        const fadeInterval = setInterval(function() {
          if (audio.volume < targetVolume) {
            audio.volume = Math.min(targetVolume, audio.volume + volumeStep);
          } else {
            clearInterval(fadeInterval);
          }
        }, stepInterval);
      }).catch(error => {
        console.error("Erro ao tocar o áudio mesmo após interação:", error);
      });
    }
  }

  // --- Configura os "Ouvintes" de Interação ---
  // REQUISITO 2: A música SEMPRE esperará pela interação do usuário em cada visita.
  // Não tentamos mais o autoplay, garantindo que o comportamento seja consistente.
  document.addEventListener('scroll', startMusicOnInteraction);
  document.addEventListener('click', startMusicOnInteraction);
  document.addEventListener('touchstart', startMusicOnInteraction);
  
  // --- Inicia os Efeitos Visuais ---
  createParticles();
  createBurningPapers();
});


// --- FUNÇÕES DE EFEITOS VISUAIS (sem alterações) ---
function createParticles() {
  const container = document.getElementById('particle-container');
  if (!container) return;
  const numberOfParticles = 50;
  for (let i = 0; i < numberOfParticles; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    p.style.top = `${Math.random() * 100}vh`;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 15;
    p.style.animation = `moveParticles ${duration}s linear ${delay}s infinite`;
    p.style.setProperty('--x-end', (Math.random() - 0.5) * 2);
    p.style.setProperty('--y-end', (Math.random() - 0.5) * 2);
    container.appendChild(p);
  }
}

function createBurningPapers() {
  const container = document.getElementById('burning-paper-container');
  if (!container) return;
  const numberOfPapers = 15;
  for (let i = 0; i < numberOfPapers; i++) {
    const paper = document.createElement('div');
    paper.className = 'burning-paper';
    const size = Math.random() * 50 + 20;
    const floatDuration = Math.random() * 15 + 20;
    const rotateDuration = Math.random() * 10 + 5;
    const delay = Math.random() * 20;
    paper.style.width = `${size}px`;
    paper.style.height = `${size * 1.4}px`;
    paper.style.animationDuration = `${floatDuration}s, ${rotateDuration}s`;
    paper.style.animationDelay = `${delay}s`;
    paper.style.setProperty('--x-start', `${Math.random() * 80 + 10}vw`);
    paper.style.setProperty('--x-end', `${Math.random() * 80 + 10}vw`);
    container.appendChild(paper);
  }
}
