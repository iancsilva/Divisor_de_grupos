const botaoProximo = document.getElementById("bNext");
const botaoVoltar = document.getElementById("bBack");
const botaoRecalcular = document.getElementById("bRecalc");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const stepFinal = document.getElementById("stepFinal");

const opcoesCategorias = document.getElementById("opcCateg");
const botaoAdicionar = document.getElementById("bAdd");
const botaoMostraLista = document.getElementById("bLista");
const listaExibida = document.getElementById("listaPessoas");
const layoff = document.getElementById("layoff")

const grupos = document.getElementById("grupos");

var categoriasSelecionadasPessoais = [];
var categoriasSelecionadasGerais = [];
var listaConteudoFinal = [];

var objeGrupos = {}
var numeroGrupos;
var media = Math.floor(listaConteudoFinal.length / numeroGrupos);
var contagemCategorias = {};

botaoProximo.addEventListener("click", function () {
    var displayOpcCat = window.getComputedStyle(opcoesCategorias).getPropertyValue("display");
    numeroGrupos = parseInt(document.getElementById("inpGrup").value);
    var categorias = document.getElementById("inpCategories").value.toLowerCase().split(",");
    categorias = categorias.map(categoria => categoria.trim());
    console.log(numeroGrupos >= 2)
    console.log(categorias.length <= 12)
    console.log(displayOpcCat)
    if (numeroGrupos >= 2 && categorias.length <= 12 && displayOpcCat === "none") {
        
        opcoesCategorias.style.display = "flex";
        step1.style.display = "none";
        step2.style.display = "flex";

        for (let i = 1; i <= numeroGrupos; i++) {
            objeGrupos[`grupo${i}`] = [];
        }

        for (let categoria of categorias) {
            var idSeguro = categoria.replace(/\s+/g, "-");
            opcoesCategorias.insertAdjacentHTML("beforeend", `
                <button id="${idSeguro}" class="btnCateg">${categoria}</button>
            `);
            document.getElementById(idSeguro).addEventListener("click", function () {
                if (!categoriasSelecionadasPessoais.includes(categoria)) {
                    categoriasSelecionadasPessoais.push(categoria);
                }
            });
        }
    }

    if (displayOpcCat === "flex" && listaConteudoFinal.length > 0) {
        step2.style.display = "none";
        stepFinal.style.display = "flex";
        botaoProximo.style.display = "none";
        botaoRecalcular.style.display = "inline-block";
        grupos.style.justifyContent = "center";

        distribuicao();
        
        if (numeroGrupos < 4) {
            document.querySelectorAll(".time").forEach((time) => {
                time.style.width = "32%";
            })
            }
    }

    if (isNaN(numeroGrupos) && categorias.length === 1 && listaConteudoFinal.length === 0) {
        step1.style.display = "none";
        step2.style.display = "none";
        stepFinal.style.display = "flex";
        botaoProximo.style.display = "none";
        botaoRecalcular.style.display = "inline-block";
        
        listaConteudoFinal = listaPronta;
        numeroGrupos = 4;
        console.log(numeroGrupos)
        console.log(categorias.length)
        console.log(listaConteudoFinal.length)
        
        distribuicao();
    }

});

botaoAdicionar.addEventListener("click", function () {
    var nomes = document.getElementById("inpNames").value.toLowerCase().split(",");
    nomes = nomes.map(nome => nome.trim());

    for (let nome of nomes) {
        categoriasSelecionadasGerais.push(...categoriasSelecionadasPessoais);
        categoriasSelecionadasPessoais.unshift(nome);
        listaConteudoFinal.push([...categoriasSelecionadasPessoais]);
        categoriasSelecionadasPessoais.shift();
    }

    categoriasSelecionadasPessoais = [];
    document.getElementById("inpNames").value = "";

    atualizarLista();
    console.log(listaConteudoFinal)
});

botaoMostraLista.addEventListener("click", function () {
    listaExibida.style.display = "flex";
    layoff.style.display = "block";
    
})

layoff.addEventListener("click", function () {
    listaExibida.style.display = "none";
    layoff.style.display = "none";
})

botaoVoltar.addEventListener("click", function () {
    if (step2.style.display === "flex") {
        step1.style.display = "flex";
        step2.style.display = "none";
        opcoesCategorias.style.display = "none";
        opcoesCategorias.innerHTML = ""; 
        listaConteudoFinal = [];

    }


    if (stepFinal.style.display === "flex") {
        step2.style.display = "flex";
        stepFinal.style.display = "none";
        botaoProximo.style.display = "inline-block";
        botaoRecalcular.style.display = "none";
        }
});

botaoRecalcular.addEventListener("click", function () {
    console.log("YEAHHHHHHHHHHH")
    distribuicao()
})

function atualizarLista() {
    const ul = document.getElementById("ulNames");
    ul.innerHTML = ""; 

    listaConteudoFinal.forEach((item, index) => {
        const li = document.createElement("li");

        const spanNome = document.createElement("span");
        spanNome.textContent = item.join(" - ");
        
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.className = "btnRemover";
        botaoRemover.addEventListener("click", function() {
            listaConteudoFinal.splice(index, 1);
            atualizarLista(); 
        });

        li.appendChild(spanNome);
        li.appendChild(botaoRemover);
        ul.appendChild(li);
    });
}

function distribuicao () {
    contagemCategorias = {};
    for (let i = 1; i <= numeroGrupos; i++) {
        objeGrupos[`grupo${i}`] = [];
    }

    for (let pessoa of listaConteudoFinal) {
        for (let i = 1; i < pessoa.length; i++) {
            contagemCategorias[pessoa[i]] = (contagemCategorias[pessoa[i]] || 0) + 1;
        }
    }

    let metaPorGrupo = {};
    for (let categoria in contagemCategorias) {
        if (contagemCategorias[categoria] >= numeroGrupos) {
            metaPorGrupo[categoria] = Math.floor(contagemCategorias[categoria] / numeroGrupos);
        }
    }

    let gruposCategCount = {};
    for (let i = 1; i <= numeroGrupos; i++) {
        gruposCategCount[`grupo${i}`] = {};
    }

    let listaDistribuir = [...listaConteudoFinal];


    embaralharArray(listaDistribuir);

    let restantes = [];
    media = Math.floor(listaConteudoFinal.length / numeroGrupos);

    while (listaDistribuir.length > 0) {
        let pessoa = listaDistribuir.shift();
        let atribuida = false;

        for (let i = 1; i <= numeroGrupos; i++) {
            if (objeGrupos[`grupo${i}`].length >= media) continue;

            let podeInserir = true;

            for (let j = 1; j < pessoa.length; j++) {
                let cat = pessoa[j];
                if (metaPorGrupo[cat]) {
                    let atual = gruposCategCount[`grupo${i}`][cat] || 0;
                    if (atual >= metaPorGrupo[cat]) {
                        podeInserir = false;
                        break;
                    }
                }
            }

            if (podeInserir) {
                objeGrupos[`grupo${i}`].push(pessoa);
                for (let j = 1; j < pessoa.length; j++) {
                    let cat = pessoa[j];
                    if (!gruposCategCount[`grupo${i}`][cat]) {
                        gruposCategCount[`grupo${i}`][cat] = 0;
                    }
                    gruposCategCount[`grupo${i}`][cat]++;
                }
                atribuida = true;
                break;
            }
        }

        if (!atribuida) {
            restantes.push(pessoa);
        }
    }

    for (let pessoa of restantes) {
        let grupoMenor = Object.entries(objeGrupos).sort((a, b) => a[1].length - b[1].length)[0][0];
        objeGrupos[grupoMenor].push(pessoa);
    }

    grupos.innerHTML = "";


    let maiorTamanho = Math.max(...Object.values(objeGrupos).map(grupo => grupo.length));

    for (let i = 1; i <= numeroGrupos; i++) {
        grupos.insertAdjacentHTML("beforeend", `
            <div class="time">
                <table id="grupo${i}">
                    <tr><th>
                        <div class="thContent">
                            <span></span>
                            <h2>Grupo ${i}</h2>
                        </div>
                    </th></tr>
                </table>
            </div>
        `);

        for (let pessoa of objeGrupos[`grupo${i}`]) {
            document.getElementById(`grupo${i}`).insertAdjacentHTML("beforeend", `
                <tr>
                    <td>${pessoa[0]}</td>
                </tr>
            `);
        }

        let faltando = maiorTamanho - objeGrupos[`grupo${i}`].length;
        for (let j = 0; j < faltando; j++) {
            document.getElementById(`grupo${i}`).insertAdjacentHTML("beforeend", `
                <tr><td>&nbsp;</td></tr>
            `);
        }
    }
}

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
