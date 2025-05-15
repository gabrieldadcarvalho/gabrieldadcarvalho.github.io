document.addEventListener("DOMContentLoaded", function () {
  const cvContainer = document.getElementById("cv-container");
  const languageButtons = document.querySelectorAll(".language-btn");

  // Função para carregar o currículo
  function loadCurriculum(lang) {
    const url = lang === "en" ? "curriculum_en.html" : "curriculum_pt.html";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o currículo.");
        }
        return response.text();
      })
      .then((html) => {
        cvContainer.innerHTML = html;
        updateActiveButton(lang);
      })
      .catch((error) => {
        cvContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
  }

  // Atualiza o botão ativo
  function updateActiveButton(lang) {
    languageButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  // Event listeners
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLang = button.dataset.lang;
      loadCurriculum(selectedLang);
    });
  });

  // Carrega o currículo padrão (PT)
  loadCurriculum("pt");
});
