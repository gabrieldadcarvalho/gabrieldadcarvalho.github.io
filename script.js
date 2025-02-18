document.addEventListener("DOMContentLoaded", function () {
  // Armazena o HTML original da sidebar
  const originalSidebarHTML = document.querySelector(".sidebar").innerHTML;

  function createNewPage() {
    let newPage = document.createElement("div");
    newPage.classList.add("page");
    newPage.innerHTML = `<div class="sidebar">${originalSidebarHTML}</div><div class="content"></div>`;
    return newPage;
  }

  // Função que "divide" uma seção caso ela não caiba inteiramente na página atual
  function splitSection(section, availableSpace, pageHeight, currentContent, pageWrapper) {
    // Cria um novo container para os elementos da seção que couberem na página
    let newSection = document.createElement(section.tagName);
    newSection.className = section.className;
    // Obtem os nós filhos (incluindo texto e elementos)
    let children = Array.from(section.childNodes);
    
    children.forEach(child => {
      newSection.appendChild(child);
      currentContent.appendChild(newSection);
      // Se ultrapassar o espaço disponível...
      if (currentContent.offsetHeight > pageHeight) {
        // Remova o último nó adicionado
        newSection.removeChild(child);
        // Cria uma nova página para continuar
        let newPageObj = createNewPage();
        pageWrapper.appendChild(newPageObj);
        currentContent = newPageObj.querySelector(".content");
        // Cria um novo container para a continuação da seção
        newSection = document.createElement(section.tagName);
        newSection.className = section.className;
        // Adiciona o nó que não coube na nova página
        newSection.appendChild(child);
        currentContent.appendChild(newSection);
      }
    });
  }

  function autoPaginate() {
    // Captura todas as seções do conteúdo original
    let contentContainer = document.getElementById("content");
    let sections = Array.from(contentContainer.children).filter(
      el => !el.classList.contains("page-break")
    );

    let pageWrapper = document.getElementById("pageWrapper");
    // Limpa o wrapper para iniciar a paginação
    pageWrapper.innerHTML = "";

    // Altura da página A4 em pixels (1mm ≈ 3.77953px)
    let pageHeight = 297 * 3.77953;

    // Cria a primeira página
    let currentPage = createNewPage();
    pageWrapper.appendChild(currentPage);
    let currentContent = currentPage.querySelector(".content");

    sections.forEach(section => {
      // Clone completo da seção para testar se ela cabe
      let fullClone = section.cloneNode(true);
      currentContent.appendChild(fullClone);
      if (currentContent.offsetHeight <= pageHeight) {
        // Se couber, a seção é mantida e continuamos
        return;
      } else {
        // Se não couber, remova o clone e faça a divisão da seção
        currentContent.removeChild(fullClone);
        splitSection(section, pageHeight - currentContent.offsetHeight, pageHeight, currentContent, pageWrapper);
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
