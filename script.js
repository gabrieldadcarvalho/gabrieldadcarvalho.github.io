document.addEventListener("DOMContentLoaded", function () {
  // Armazena o HTML original da sidebar antes de limpar o wrapper
  const originalSidebarHTML = document.querySelector(".sidebar").innerHTML;

  function createNewPage() {
    let newPage = document.createElement("div");
    newPage.classList.add("page");
    newPage.innerHTML = `<div class="sidebar">${originalSidebarHTML}</div><div class="content"></div>`;
    return newPage;
  }

  function autoPaginate() {
    // Pega todas as seções do conteúdo (ignorando os elementos de quebra de página)
    let contentContainer = document.getElementById("content");
    let sections = Array.from(contentContainer.children).filter(
      el => !el.classList.contains("page-break")
    );

    let pageWrapper = document.getElementById("pageWrapper");
    pageWrapper.innerHTML = "";

    // Define a altura da página A4 em pixels (1mm ≈ 3.77953px)
    let pageHeight = 297 * 3.77953;

    // Cria a primeira página
    let currentPage = createNewPage();
    pageWrapper.appendChild(currentPage);
    let currentContent = currentPage.querySelector(".content");

    sections.forEach((section) => {
      // Tenta adicionar a seção à página corrente
      currentContent.appendChild(section);
      // Se o conteúdo ultrapassar o limite, remova a seção da página corrente
      // e adicione-a à nova página
      if (currentContent.offsetHeight > pageHeight) {
        currentContent.removeChild(section);
        currentPage = createNewPage();
        pageWrapper.appendChild(currentPage);
        currentContent = currentPage.querySelector(".content");
        currentContent.appendChild(section);
      }
    });
  }

  autoPaginate();
});

// Código de animação de partículas
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const colors = ["#00ff99", "#8e44ad"];
const numParticles = 80;
const maxDistance = 150;
let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 2;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < maxDistance) {
        ctx.strokeStyle = "rgb(0, 0, 0)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  drawConnections();
  requestAnimationFrame(animate);
}

animate();
