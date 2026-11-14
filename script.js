// Abre o vídeo do FitFlow ao clicar no card
const modal = document.getElementById('video-modal');
const video = document.getElementById('fitflow-video');

document.getElementById('open-fitflow').addEventListener('click', () => {
  modal.showModal();
  video.currentTime = 0;
  video.play().catch(() => {});
});

const fechar = () => { video.pause(); modal.close(); };
document.getElementById('close-video').addEventListener('click', fechar);
modal.addEventListener('click', (e) => { if (e.target === modal) fechar(); }); // clique fora fecha
modal.addEventListener('cancel', () => video.pause()); // tecla Esc

document.getElementById('ano').textContent = new Date().getFullYear();
