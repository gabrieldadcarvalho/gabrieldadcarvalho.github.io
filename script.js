// Animação de grafos dinâmicos com partículas (verde e roxo)
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#00ff99", "#8e44ad"]; // verde e roxo
const numParticles = 50;
const maxDistance = 120;
let particlesArray = [];

class Particle {
  constructor(x, y, size, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    let size = Math.random() * 3 + 2;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speedX = (Math.random() - 0.5) * 2;
    let speedY = (Math.random() - 0.5) * 2;
    let color = colors[Math.floor(Math.random() * colors.length)];
    particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < maxDistance) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Função de paginação simples:
// Se o conteúdo do <main class="content"> ultrapassar um limite (PAGE_HEIGHT),
// as seções que excederem serão movidas para uma nova "folha" (nova div.page) criada dinamicamente.
function paginate() {
  const PAGE_HEIGHT = 1400; // altura máxima da página em px (deve ser igual à altura definida em .page)
  const pagesContainer = document.getElementById("pages-container");
  const firstPage = pagesContainer.querySelector(".page");
  const contentArea = firstPage.querySelector(".content");
  // Obtem todas as seções do conteúdo
  const sections = Array.from(contentArea.querySelectorAll("section"));
  let currentPage = firstPage;
  
  sections.forEach(section => {
    // Se a altura do currentPage exceder o limite, cria uma nova página
    if (currentPage.scrollHeight > PAGE_HEIGHT) {
      // Cria nova página sem a sidebar (para manter o cabeçalho somente na primeira folha)
      const newPage = document.createElement("div");
      newPage.classList.add("page");
      const newContainer = document.createElement("div");
      newContainer.classList.add("container-content");
      const newMain = document.createElement("main");
      newMain.classList.add("content");
      newContainer.appendChild(newMain);
      newPage.appendChild(newContainer);
      pagesContainer.appendChild(newPage);
      currentPage = newPage;
    }
    // Move a seção atual para o currentPage
    currentPage.querySelector(".content").appendChild(section);
  });
}

window.addEventListener("load", paginate);
