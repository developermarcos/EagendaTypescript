import { RepositorioTarefaLocalStorage } from "../infra/repositorio.localStorage.tarefa.js";
class TarefaListagem {
    constructor(repositorio) {
        this.linkCadastro = './tarefa.cadastrar.html';
        this.repositorio = repositorio;
        this.configurarTela();
        this.atualizarListagem();
        this.configurarLinkCadastro();
        this.atualizarHeadTabela(this.mapeadorObjeto());
        this.atualizarBodyTabela(this.mapeadorObjeto());
    }
    configurarTela() {
        console.log('refatorar configurar tela');
    }
    atualizarListagem() {
        console.log('refatorar atualizar listagem');
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
        const tarefas = this.repositorio.listarTodos();
        tarefas.forEach(tarefa => {
            const linhaBody = tablebody === null || tablebody === void 0 ? void 0 : tablebody.insertRow();
            for (var [key, value] of mapeadorObjeto) {
                let valorColuna = Object.getOwnPropertyDescriptor(tarefa, key);
                let coluna = linhaBody === null || linhaBody === void 0 ? void 0 : linhaBody.insertCell();
                coluna.append(valorColuna === null || valorColuna === void 0 ? void 0 : valorColuna.value);
            }
            this.configurarAcoes(linhaBody, tarefa);
        });
        tabela === null || tabela === void 0 ? void 0 : tabela.append(tablebody);
    }
    configurarAcoes(linhaBody, tarefa) {
        let colunaAcoes = linhaBody.insertCell();
        colunaAcoes.classList.add('gap-2');
        colunaAcoes.classList.add('d-flex');
        const btnEditar = document.createElement('a');
        btnEditar.classList.value = 'btn btn-success';
        btnEditar.href = `${this.linkCadastro}?id=${tarefa.id}`;
        btnEditar.setAttribute('value', tarefa.id);
        btnEditar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        colunaAcoes.append(btnEditar);
        const btnExcluir = document.createElement('button');
        btnExcluir.classList.value = 'btn btn-danger';
        btnExcluir.setAttribute('id', tarefa.id);
        btnExcluir.innerHTML = '<i class="fa-solid fa-trash-can">';
        btnExcluir.addEventListener('click', (_evt) => {
            let excluir = confirm(`Deseja realmente excluir o registro '${tarefa.titulo}'`);
            if (excluir) {
                this.repositorio.excluir(tarefa.id);
                window.location.reload();
            }
        });
        colunaAcoes.append(btnExcluir);
    }
}
new TarefaListagem(new RepositorioTarefaLocalStorage());
