const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Configurações para a animação de partículas
const colors = ["#00ff99", "#8e44ad"]; // verde e roxo
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

document.addEventListener("DOMContentLoaded", function () {
    function autoPaginate() {
        let content = document.getElementById("content");
        let pageWrapper = document.getElementById("pageWrapper");
        let sections = [...content.children]; // Captura todas as seções
        
        let pageHeight = 297 * 3.77953; // Conversão de mm para px (A4)
        let usedHeight = 0;
        let currentPage = null;
        let firstPage = true; // Flag para definir se é a primeira página

        // Função para criar uma nova página
        function createNewPage() {
            let newPage = document.createElement("div");
            newPage.classList.add("page");
            newPage.innerHTML = `
                ${firstPage ? `<div class="sidebar">${document.querySelector(".sidebar").innerHTML}</div>` : ""}
                <div class="content"></div>
            `;
            firstPage = false;
            pageWrapper.appendChild(newPage);
            return newPage.querySelector(".content");
        }

        pageWrapper.innerHTML = ""; // Limpa páginas anteriores
        let tempContent = createNewPage(); // Cria a primeira página

        sections.forEach((section) => {
            let sectionClone = section.cloneNode(true);
            tempContent.appendChild(sectionClone);
            usedHeight += sectionClone.offsetHeight;

            if (usedHeight >= pageHeight) {
                usedHeight = sectionClone.offsetHeight; // Reinicia altura usada
                tempContent = createNewPage(); // Cria uma nova página
                tempContent.appendChild(sectionClone); // Move a seção excedente
            }
        });
    }

    autoPaginate();
});
