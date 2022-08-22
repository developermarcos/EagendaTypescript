import { RepositorioTarefaLocalStorage } from "../infra/repositorio.localStorage.tarefa.js";
class TarefaListagem {
    constructor() {
        this.linkCadastro = './tarefa.cadastrar.html';
        this.linkExclusao = '';
        this.configurarLinkCadastro();
        this.atualizarHeadTabela(this.mapeadorObjeto());
        this.atualizarBodyTabela(this.mapeadorObjeto());
    }
    configurarLinkCadastro() {
        const linkCadastrar = document.getElementById('cadastrar-link');
        linkCadastrar.href = this.linkCadastro;
    }
    mapeadorObjeto() {
        let mapeadorObjeto = new Map();
        // this.mapeadorObjeto.set('id', 'ID');
        mapeadorObjeto.set('prioridade', 'Prioridade');
        mapeadorObjeto.set('titulo', 'Título');
        mapeadorObjeto.set('dataInicio', 'Abertura');
        mapeadorObjeto.set('dataTermino', 'Data termino');
        return mapeadorObjeto;
    }
    atualizarHeadTabela(mapeadorObjeto) {
        const table = document.querySelector('table');
        const tableHead = document.createElement('thead');
        const linhaCabecalho = tableHead === null || tableHead === void 0 ? void 0 : tableHead.insertRow();
        for (var [key, value] of mapeadorObjeto) {
            let coluna = document.createElement('th');
            coluna.append(value);
            linhaCabecalho.append(coluna);
        }
        let colunaAcoes = document.createElement('th');
        colunaAcoes.innerText = "Ações";
        linhaCabecalho.append(colunaAcoes);
        table.append(tableHead);
    }
    atualizarBodyTabela(mapeadorObjeto) {
        const tabela = document.querySelector('table');
        let tablebody = document.createElement('tbody');
        const tarefas = new RepositorioTarefaLocalStorage().listarTodos();
        tarefas.forEach(tarefa => {
            const linhaBody = tablebody === null || tablebody === void 0 ? void 0 : tablebody.insertRow();
            for (var [key, value] of mapeadorObjeto) {
                let valorColuna = Object.getOwnPropertyDescriptor(tarefa, key);
                let coluna = linhaBody === null || linhaBody === void 0 ? void 0 : linhaBody.insertCell();
                coluna.append(valorColuna === null || valorColuna === void 0 ? void 0 : valorColuna.value);
            }
            let colunaAcoes = linhaBody.insertCell();
            colunaAcoes.classList.add('gap-2');
            colunaAcoes.classList.add('d-flex');
            const btnEditar = `<a class="btn btn-success" href="${this.linkCadastro}?id=${tarefa.id}" value="${tarefa.id}"><i class="fa-solid fa-pen-to-square"></i></a>`;
            const btnExcluir = `<a class="btn btn-danger" href="${this.linkExclusao}?id=${tarefa.id}" value="${tarefa.id}"><i class="fa-solid fa-trash-can"></i></a>`;
            colunaAcoes.innerHTML = btnEditar + btnExcluir;
        });
        tabela === null || tabela === void 0 ? void 0 : tabela.append(tablebody);
    }
}
new TarefaListagem();
