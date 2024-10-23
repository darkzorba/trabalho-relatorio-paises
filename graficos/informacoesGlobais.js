const url = 'https://restcountries.com/v3.1/all';

async function vizualizarInformacoes() {
    try {
        const res = await fetch(url);
        const dados = await res.json();

        const paisesOrdenados = dados.sort((a, b) => b.population - a.population);

        const paisesFiltrados = paisesOrdenados.slice(0, 4);

        let maiorPopulacao = 0;
        let maiorArea = 0;
        let maiorCapital = '';
        let paisMaiorPopulacao = '';
        let paisMaiorArea = '';
        let paisMaiorCapital = '';

        let posicaoBrasilPopulacao = 1;
        let posicaoBrasilArea = 1;

        paisesFiltrados.forEach(pais => {
            const populacao = pais.population;
            const area = pais.area;
            const capital = pais.capital ? pais.capital[0] : 'N/A';

            if (populacao > maiorPopulacao) {
                maiorPopulacao = populacao;
                paisMaiorPopulacao = pais.name.common;
            }

            if (area > maiorArea) {
                maiorArea = area;
                paisMaiorArea = pais.name.common;
            }

            if (capital.length > maiorCapital.length) {
                maiorCapital = capital;
                paisMaiorCapital = pais.name.common;
            }
        });

        paisesFiltrados.forEach(pais => {
            if (pais.name.common === 'Brazil') {
                return;
            }
            if (pais.population > dados.find(p => p.name.common === 'Brazil').population) {
                posicaoBrasilPopulacao++;
            }
            if (pais.area > dados.find(p => p.name.common === 'Brazil').area) {
                posicaoBrasilArea++;
            }
        });

        const brasil = dados.find(p => p.name.common === 'Brazil');

        const textoInformativo = `
            <p>
                Você sabia que o país com a <span>maior capital</span> entre os escolhidos é a <span>${paisMaiorCapital}
                </span>, com sua capital <span>${maiorCapital}</span>? 
                A <span>${paisMaiorCapital}</span> também lidera o ranking em <span>população</span> e <span>área</span>:
            </p>
            <ul>
                <li><strong>1º lugar em população</strong>: A <span>${paisMaiorPopulacao}</span> tem uma população de 
                aproximadamente <span>${maiorPopulacao.toLocaleString()} habitantes</span>.</li>
                <li><strong>1º lugar em área</strong>: Com uma extensão territorial de <span>${maiorArea.toLocaleString()} 
                km²</span>, a <span>${paisMaiorArea}</span> é o maior país entre os selecionados.</li>
            </ul>
            <p>
                Agora, falando do <span>Brasil</span>, ele ocupa o <span>${posicaoBrasilPopulacao}º lugar</span> 
                em população entre os países escolhidos, com aproximadamente <span>${brasil.population.toLocaleString()} 
                habitantes</span>, e o <span>${posicaoBrasilArea}º lugar</span> em área, com uma extensão de 
                <span>${brasil.area.toLocaleString()} km²</span>. 
                Já a capital do <span>Brasil</span>, <span>Brasília</span>, é uma das cidades mais planejadas do mundo, 
                mas em termos de tamanho populacional, fica atrás de <span>${maiorCapital}</span>.
            </p>
        `;

        document.getElementById('graficos-container').innerHTML = textoInformativo;

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

vizualizarInformacoes();
