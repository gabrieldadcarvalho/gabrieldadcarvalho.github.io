// Ajusta o canvas de fundo
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
        let currentPage = document.querySelector(".page");
        
        let sections = [...content.children]; // Captura todas as seções
        let tempPage = document.createElement("div"); // Nova página temporária
        tempPage.classList.add("page");
        tempPage.innerHTML = `<div class="sidebar">${document.querySelector(".sidebar").innerHTML}</div><div class="content"></div>`;
        let tempContent = tempPage.querySelector(".content");

        pageWrapper.innerHTML = ""; // Limpa páginas anteriores
        pageWrapper.appendChild(tempPage);

        let pageHeight = 297 * 3.77953; // Conversão mm -> px (A4)
        let usedHeight = 0;

        sections.forEach((section) => {
            let sectionClone = section.cloneNode(true);
            tempContent.appendChild(sectionClone);
            usedHeight += sectionClone.offsetHeight;

            if (usedHeight >= pageHeight) {
                let newPage = tempPage.cloneNode(true);
                pageWrapper.appendChild(newPage);
                tempContent.innerHTML = ""; // Limpa conteúdo para a próxima página
                usedHeight = sectionClone.offsetHeight;
                tempContent.appendChild(sectionClone);
            }
        });
    }

    autoPaginate();
});
