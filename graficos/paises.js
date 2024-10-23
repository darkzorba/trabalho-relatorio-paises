import { getCSS, tickConfig } from "./common.js";

const url = 'https://restcountries.com/v3.1/all';

async function carregarInformacoesPaises() {
    try {
        const res = await fetch(url);
        const dados = await res.json();


        const paisesLimitados = dados.slice(0, 40);

        const informacoesContainer = document.getElementById('informacoes-paises');


        paisesLimitados.forEach(pais => {
            const nome = pais.name.common;
            const populacao = pais.population.toLocaleString();
            const area = pais.area ? pais.area.toLocaleString() : 'N/A';
            const capital = pais.capital ? pais.capital[0] : 'N/A';

            const infoHTML = `
                <div class="pais-info">
                    <h3>${nome}</h3>
                    <p><strong>Capital:</strong> ${capital}</p>
                    <p><strong>População:</strong> ${populacao} habitantes</p>
                    <p><strong>Área:</strong> ${area} km²</p>
                </div>
            `;
            informacoesContainer.innerHTML += infoHTML;
        });

        criarGrafico(paisesLimitados);

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

async function criarGrafico(paisesLimitados) {
    const nomesPaises = [];
    const populacoes = [];
    const areas = [];

    paisesLimitados.forEach(pais => {
        nomesPaises.push(pais.name.common);
        populacoes.push(pais.population);
        areas.push(pais.area || 0);
    });

    const dadosGrafico = [
        {
            x: nomesPaises,
            y: populacoes,
            name: 'População',
            type: 'bar',
            marker: {
                color: getCSS('--primary-color'),
            },
        },
        {
            x: nomesPaises,
            y: areas,
            name: 'Área (km²)',
            type: 'bar',
            marker: {
                color: getCSS('--secondary-color'),
            },
        },
    ];

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: 'Comparação de População e Área dos Países (Limite de 40)',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                size: 30,
                font: getCSS('--font'),
            },
        },
        xaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Países',
                font: {
                    color: getCSS('--secondary-color'),
                },
            },
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Valores',
                font: {
                    color: getCSS('--secondary-color'),
                },
            },
        },
    };

    const grafico = document.createElement('div');
    grafico.className = 'grafico';
    document.getElementById('graficos-container').appendChild(grafico);
    Plotly.newPlot(grafico, dadosGrafico, layout);
}

carregarInformacoesPaises();
