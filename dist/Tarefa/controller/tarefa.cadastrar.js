import { RepositorioTarefaLocalStorage } from "../infra/repositorio.localStorage.tarefa.js";
import { Item } from "../model/model.item.tarefa.js";
import { Tarefa } from "../model/model.tarefa.js";
import { Prioridade } from "../model/prioridade.enum.tarefa.js";
export class TelaCadastroTarefa {
    constructor(repositorioTarefa, id) {
        this.paginaListagem = "/public/template/tarefa/tarefa.listagem.html";
        this.repositorio = repositorioTarefa;
        this.idSelecionado = id;
        if (id) {
            this.tarefa = this.repositorio.selecionarPorId(id);
            if (!this.tarefa)
                window.location.href = this.paginaListagem;
            this.configurarTela();
        }
        else {
            this.tarefa = new Tarefa();
        }
        this.preencherPrioridades();
        this.configurarEventos();
    }
    configurarTela() {
        const selectPrioridade = document.querySelector('select');
        selectPrioridade.value = this.tarefa.prioridade;
        const titulo = document.getElementById('titulo');
        titulo.value = this.tarefa.titulo;
        const dataInicio = document.getElementById('data-inicio');
        const dataInicioString = new Date(this.tarefa.dataInicio).toISOString().substring(0, 10);
        dataInicio.value = dataInicioString;
        const dataConclusao = document.getElementById('data-conclusao');
        dataConclusao.value = this.tarefa.dataTermino ? new Date(this.tarefa.dataTermino).toISOString().substring(0, 10) : '';
        if (this.tarefa.itens) {
            this.tarefa.itens.forEach(item => {
                this.adicionarItem(item);
                this.adicionarEventoUltimoBotao();
            });
        }
    }
    configurarEventos() {
        const btnAdicionarItem = document.getElementById('btn-adicionar-item');
        const formCadastroTarefa = document.querySelector('form');
        formCadastroTarefa === null || formCadastroTarefa === void 0 ? void 0 : formCadastroTarefa.addEventListener('submit', (_evt) => {
            _evt.preventDefault();
            this.salvar();
        });
        btnAdicionarItem === null || btnAdicionarItem === void 0 ? void 0 : btnAdicionarItem.addEventListener('click', (_evt) => {
            _evt.preventDefault();
            let descricaoItem = document.getElementById('input-adicionar-item');
            const novoItem = new Item(descricaoItem.value);
            this.adicionarItem(novoItem);
            this.adicionarEventoUltimoBotao();
        });
    }
    adicionarEventoUltimoBotao() {
        const botoes = document.getElementsByClassName('excluir-itens-tarefa');
        let ultimoBotaoAdicionado = botoes[botoes.length - 1];
        ultimoBotaoAdicionado.addEventListener('click', (_evt) => {
            _evt.preventDefault();
            this.removerItem(ultimoBotaoAdicionado.value);
        });
    }
    preencherPrioridades() {
        const selectPrioridade = document.querySelector('select');
        const prioridades = Object.getOwnPropertyNames(Prioridade);
        prioridades.forEach(prioridade => {
            const opcao = document.createElement('option');
            opcao.value = prioridade;
            opcao.innerText = prioridade;
            selectPrioridade === null || selectPrioridade === void 0 ? void 0 : selectPrioridade.append(opcao);
        });
    }
    gerarNovoItemLista(novoItem) {
        const li = document.createElement('li');
        const classesLista = ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'];
        classesLista.forEach(classe => {
            li.classList.add(classe);
        });
        const divItem = document.createElement('div');
        divItem.classList.add('d-flex');
        divItem.classList.add('gap-1');
        const input = document.createElement('input');
        input.classList.add('form-check-input');
        input.classList.add('gap-1');
        input.classList.add('me-1');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', novoItem.titulo);
        divItem.append(input);
        divItem.append(novoItem.titulo);
        const botaoExclusaoItem = `<button class="btn btn-danger excluir-itens-tarefa" value="${novoItem.titulo}"> <i class="fa-solid fa-trash-can"></i> </button>`;
        li.append(divItem);
        li.innerHTML += botaoExclusaoItem;
        return li;
    }
    adicionarItem(item) {
        const novoItemLista = this.gerarNovoItemLista(item);
        const ulItensAdicionados = document.getElementById('itens-adicionados');
        ulItensAdicionados.append(novoItemLista);
    }
    removerItem(value) {
        var _a;
        if (!value)
            return;
        const ulItensAdicionados = document.getElementById('itens-adicionados');
        let listaItensAdicionados = ulItensAdicionados.getElementsByTagName('li');
        let listaItensAdicionadosAtualizada = [];
        for (let i = 0; i < listaItensAdicionados.length; i++) {
            if (((_a = listaItensAdicionados[i].querySelector('input')) === null || _a === void 0 ? void 0 : _a.value) === value)
                continue;
            listaItensAdicionadosAtualizada.push(listaItensAdicionados[i]);
        }
        ulItensAdicionados.innerHTML = '';
        listaItensAdicionadosAtualizada.forEach(item => {
            ulItensAdicionados.append(item);
        });
    }
    salvar() {
        var _a, _b, _c;
        const selectPrioridade = document.querySelector('select');
        const prioridadeSelecionada = selectPrioridade === null || selectPrioridade === void 0 ? void 0 : selectPrioridade.options[selectPrioridade.selectedIndex];
        const tituloInput = document.getElementById('titulo');
        const dataInicioInput = document.getElementById('data-inicio');
        const dataInicio = new Date(dataInicioInput.value);
        let dataInicioValida = Date.parse(dataInicioInput.value);
        const dataConclusaoInput = document.getElementById('data-conclusao');
        const dataConclusao = new Date(dataConclusaoInput.value);
        let dataConclusaoValida = Date.parse(dataConclusaoInput.value);
        const itensSelecionadosInput = (_a = document.getElementById('itens-adicionados')) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('input');
        const itensSelecionados = [];
        if (itensSelecionadosInput) {
            for (let i = 0; i < itensSelecionadosInput.length; i++) {
                const titulo = itensSelecionadosInput[i].value;
                const concluido = itensSelecionadosInput[i].checked;
                let novoItem = new Item(titulo, concluido);
                itensSelecionados.push(novoItem);
            }
        }
        let mensagens = [];
        if (!(prioridadeSelecionada === null || prioridadeSelecionada === void 0 ? void 0 : prioridadeSelecionada.value))
            mensagens.push("Campo 'Prioridade' é obrigatório!");
        if (!(tituloInput === null || tituloInput === void 0 ? void 0 : tituloInput.value))
            mensagens.push("Campo 'Título' é obrigatório!");
        if (isNaN(dataInicioValida))
            mensagens.push("Campo 'Data início' é obrigatório!");
        if (mensagens.length > 0) {
            (_b = document.getElementById('mensagem')) === null || _b === void 0 ? void 0 : _b.classList.remove('d-none');
            mensagens.forEach(mensagem => {
                var _a;
                let p = document.createElement('p');
                p.innerText = mensagem;
                (_a = document.getElementById('mensagem')) === null || _a === void 0 ? void 0 : _a.append(p);
            });
            return;
        }
        (_c = document.getElementById('mensagem')) === null || _c === void 0 ? void 0 : _c.classList.add('d-none');
        this.tarefa.titulo = tituloInput.value;
        this.tarefa.prioridade = prioridadeSelecionada.value;
        this.tarefa.dataInicio = dataInicio;
        if (dataConclusaoValida) {
            this.tarefa.dataTermino = dataConclusao;
        }
        itensSelecionados.forEach(item => {
            var _a;
            (_a = this.tarefa.itens) === null || _a === void 0 ? void 0 : _a.push(item);
        });
        if (this.idSelecionado) {
            this.repositorio.editar(this.tarefa);
        }
        else {
            this.repositorio.inserir(this.tarefa);
        }
        document.location.href = "./tarefa.listagem.html";
    }
}
const params = new URLSearchParams(window.location.search);
let id = params.get("id");
const tarefaCadastro = new TelaCadastroTarefa(new RepositorioTarefaLocalStorage(), id);
