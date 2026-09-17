const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let scrollPercent = 0;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Escuchar el desplazamiento (scroll)
window.addEventListener('scroll', () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollPercent = window.scrollY / (maxScroll || 1);
});

// Generar nodos para la red del fondo
const numNodes = 60;
const nodes = Array.from({ length: numNodes }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 1.5,
  vy: (Math.random() - 0.5) * 1.5,
  baseRadius: Math.random() * 2 + 1
}));

function animate() {
  ctx.clearRect(0, 0, width, height);

  // El radio de expansión y la distancia de conexión aumentan con el scroll
  const expansionFactor = 1 + scrollPercent * 2.5; 
  const maxDistance = 120 * expansionFactor;

  // Actualizar y dibujar nodos
  nodes.forEach((node, i) => {
    node.x += node.vx;
    node.y += node.vy;

    // Rebotar en bordes
    if (node.x < 0 || node.x > width) node.vx *= -1;
    if (node.y < 0 || node.y > height) node.vy *= -1;

    // Dibujar punto con expansión
    const currentRadius = node.baseRadius * (1 + scrollPercent * 1.5);
    ctx.beginPath();
    ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168, 85, 247, ${0.3 + scrollPercent * 0.5})`; // Se vuelve más brillante al bajar
    ctx.fill();

    // Dibujar conexiones entre nodos según la distancia
    for (let j = i + 1; j < nodes.length; j++) {
      const other = nodes[j];
      const dx = other.x - node.x;
      const dy = other.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(other.x, other.y);
        const alpha = (1 - dist / maxDistance) * (0.2 + scrollPercent * 0.4);
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`; // Líneas azules con transparencia
        ctx.lineWidth = 1 + scrollPercent;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animate);
}

animate();// Archivo de lógica interactiva para la web educativa
document.addEventListener("DOMContentLoaded", () => {
    console.log("Módulo de JavaScript inicializado correctamente.");
    
})
// Manejador del formulario de contacto que envía directamente a WhatsApp
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;

        // Construye la URL de WhatsApp con los datos del usuario
        const textoWhatsapp = `Hola equipo FLASHBOT, soy *${nombre}*.\n*Asunto:* ${asunto}\n*Mensaje:* ${mensaje}`;
        const urlWhatsapp = `https://wa.me/573112195664?text=${encodeURIComponent(textoWhatsapp)}`;

        formStatus.style.color = '#4ade80';
        formStatus.textContent = '¡Redirigiendo a WhatsApp...!';

        // Abre WhatsApp en una pestaña nueva
        setTimeout(() => {
            window.open(urlWhatsapp, '_blank');
            contactForm.reset();
            formStatus.textContent = '';
        }, 1000);
    });
}