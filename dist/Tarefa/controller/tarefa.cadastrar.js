import { RepositorioTarefaLocalStorage } from "../infra/repositorio.localStorage.tarefa.js";
import { Item } from "../model/model.item.tarefa.js";
import { Tarefa } from "../model/model.tarefa.js";
import { Prioridade } from "../model/prioridade.enum.tarefa.js";
export class TelaCadastroTarefa {
    constructor(repositorioTarefa, id) {
        this.paginaListagem = "/public/template/tarefa/tarefa.listagem.html";
        this.repositorio = repositorioTarefa;
        this.idSelecionado = id;
        this.configurarTela();
        if (id) {
            this.tarefa = this.repositorio.selecionarPorId(id);
            if (!this.tarefa)
                window.location.href = this.paginaListagem;
        }
        else {
            this.tarefa = new Tarefa();
        }
        this.atualizarTela();
    }
    configurarTela() {
        this.preencherPrioridades();
        this.configurarEventos();
    }
    atualizarTela() {
        this.selectPrioridade = document.querySelector('select');
        this.selectPrioridade.value = this.tarefa.prioridade ? this.tarefa.prioridade : this.selectPrioridade.value;
        this.titulo = document.getElementById('titulo');
        this.titulo.value = !this.tarefa.titulo ? '' : this.tarefa.prioridade;
        this.dataInicio = document.getElementById('data-inicio');
        const dataInicioString = this.tarefa.dataInicio ? new Date(this.tarefa.dataInicio).toISOString().substring(0, 10) : '';
        this.dataInicio.value = dataInicioString != '' ? dataInicioString : '';
        this.dataConclusao = document.getElementById('data-conclusao');
        const dataConclusaoString = this.tarefa.dataTermino ? new Date(this.tarefa.dataTermino).toISOString().substring(0, 10) : '';
        this.dataConclusao.value = dataConclusaoString != '' ? dataConclusaoString : '';
        if (this.tarefa.itens) {
            this.tarefa.itens.forEach(item => {
                this.adicionarItem(item);
                this.adicionarEventoUltimoBotao();
            });
        }
    }
    preencherPrioridades() {
        this.selectPrioridade = document.querySelector('select');
        const prioridades = Object.getOwnPropertyNames(Prioridade);
        prioridades.forEach(prioridade => {
            var _a;
            const opcao = document.createElement('option');
            opcao.value = prioridade;
            opcao.innerText = prioridade;
            (_a = this.selectPrioridade) === null || _a === void 0 ? void 0 : _a.append(opcao);
        });
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
            this.removerItemHtml(ultimoBotaoAdicionado.value);
        });
    }
    adicionarItem(item) {
        const novoItemLista = this.gerarNovoItemHtml(item);
        this.ulItensAdicionados = document.getElementById('itens-adicionados');
        this.ulItensAdicionados.append(novoItemLista);
    }
    gerarNovoItemHtml(novoItem) {
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
        input.checked = novoItem.concluido ? novoItem.concluido : false;
        divItem.append(input);
        console.log(input);
        divItem.append(novoItem.titulo);
        const botaoExclusaoItem = `<button class="btn btn-danger excluir-itens-tarefa" value="${novoItem.titulo}"> <i class="fa-solid fa-trash-can"></i> </button>`;
        li.append(divItem);
        li.innerHTML += botaoExclusaoItem;
        return li;
    }
    removerItemHtml(value) {
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
        var _a, _b, _c, _d, _e, _f;
        // const itensSelecionadosInput = document.getElementById('itens-adicionados')?.getElementsByTagName('input');
        const itensSelecionadosInput = this.ulItensAdicionados.getElementsByTagName('input');
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
        if (!((_b = (_a = this.selectPrioridade) === null || _a === void 0 ? void 0 : _a.options[this.selectPrioridade.selectedIndex]) === null || _b === void 0 ? void 0 : _b.value))
            mensagens.push("Campo 'Prioridade' é obrigatório!");
        if (!((_c = this.titulo) === null || _c === void 0 ? void 0 : _c.value))
            mensagens.push("Campo 'Título' é obrigatório!");
        let dataInicioValida = Date.parse(this.dataInicio.value);
        if (isNaN(dataInicioValida))
            mensagens.push("Campo 'Data início' é obrigatório!");
        if (mensagens.length > 0) {
            (_d = document.getElementById('mensagem')) === null || _d === void 0 ? void 0 : _d.classList.remove('d-none');
            mensagens.forEach(mensagem => {
                var _a;
                let p = document.createElement('p');
                p.innerText = mensagem;
                (_a = document.getElementById('mensagem')) === null || _a === void 0 ? void 0 : _a.append(p);
            });
            return;
        }
        (_e = document.getElementById('mensagem')) === null || _e === void 0 ? void 0 : _e.classList.add('d-none');
        this.tarefa.titulo = this.titulo.value;
        this.tarefa.prioridade = (_f = this.selectPrioridade) === null || _f === void 0 ? void 0 : _f.options[this.selectPrioridade.selectedIndex].value;
        this.tarefa.dataInicio = new Date(this.dataInicio.value);
        if (Date.parse(this.dataConclusao.value)) {
            this.tarefa.dataTermino = new Date(this.dataConclusao.value);
        }
        this.tarefa.itens = [];
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
