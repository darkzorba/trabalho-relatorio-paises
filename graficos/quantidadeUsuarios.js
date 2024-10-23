import { getCSS, tickConfig } from "./common.js";

const url = 'https://restcountries.com/v3.1/all';

async function quantidadeUsuariosPorPais() {
    try {
        const res = await fetch(url);
        const dados = await res.json();

        const paisesOrdenados = dados.sort((a, b) => b.population - a.population);

        const paisesFiltrados = paisesOrdenados.slice(0, 4);

        const nomesPaises = [];
        const populacoes = [];
        const areas = [];
        const capitais = [];

        paisesFiltrados.forEach(pais => {
            nomesPaises.push(pais.name.common);
            populacoes.push(pais.population);
            areas.push(pais.area);
            capitais.push(pais.capital ? pais.capital[0] : 'N/A');
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
            {
                x: nomesPaises,
                y: capitais.map(capital => capital.length),
                name: 'Tamanho da Capital (caracteres)',
                type: 'bar',
                marker: {
                    color: getCSS('--tertiary-color'),
                },
            },
        ];

        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            title: {
                text: 'Comparação das 4 maiores potências mundiais',
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

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

quantidadeUsuariosPorPais();
