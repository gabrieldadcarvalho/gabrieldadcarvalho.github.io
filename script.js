// Combined data for the single pricing table
// You can curate this list as needed
const combinedPricingData = [
  {
    service: "Análise Exploratória de Dados",
    description: "Análise abrangente para identificar padrões, tendências e insights relevantes nos seus dados.",
    price: "R$ 1.500 / projeto"
  },
  {
    service: "Limpeza e Pré-processamento de Dados",
    description: "Transformação e padronização dos dados brutos para garantir qualidade e consistência na análise.",
    price: "R$ 500 / dataset"
  },
  {
    service: "Criação de Gráficos e Tabelas",
    description: "Visualização dos dados por meio de gráficos e tabelas que facilitam a interpretação das informações.",
    price: "R$ 700 / dataset"
  },
  {
    service: "Limpeza + Pré-processamento + Gráficos e Tabelas",
    description: "Pacote que combina a preparação dos dados com a criação de visualizações para insights rápidos.",
    price: "R$ 1.050 / dataset"
  },
  {
    service: "Pacote Completo: Limpeza, Gráficos e Análise Exploratória",
    description: "Serviço integrado que engloba a limpeza, visualização e análise aprofundada dos dados.",
    price: "R$ 2.150 / dataset"
  },
  {
    service: "Desenvolvimento de Dashboard",
    description: "Criação de painéis interativos para monitoramento em tempo real utilizando Power BI, R Shiny ou Streamlit.",
    price: "R$ 2.200 / dashboard"
  },
  {
    service: "Modelo Preditivo",
    description: "Desenvolvimento de modelos estatísticos para prever tendências e comportamentos futuros com precisão.",
    price: "R$ 3.000 / modelo"
  },
  {
    service: "Implementação de IA",
    description: "Soluções personalizadas de Inteligência Artificial (LLM, visão computacional, RNN) adaptadas às suas necessidades.",
    price: "A partir de R$ 3.500"
  },
  {
    service: "Web Scrapping",
    description: "Extração automatizada de dados de sites para alimentar suas análises e relatórios.",
    price: "A partir de R$ 1.500"
  },
];

// DOM elements - Only need the table now
const pricingTable = document.getElementById('pricing-table');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Directly load the single pricing table
    updateSinglePricingTable();

    // No other event listeners needed for tabs or modal
});
