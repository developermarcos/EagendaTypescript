// import { Btn } from "../../Shared/componetes/botao/btn.componente.js";
import { BtnTipo } from "../../Shared/componetes/btn.type.js";
import { GeradorComponente } from "../../Shared/componetes/gerador.componetes.html.js";
import { Prioridade } from "../enum.prioridade.tarefa.js";
import { Item } from "../model.item.tarefa.js";
import { Tarefa } from "../model.tarefa.js";
export class TelaCadastroTarefa {
    constructor(titulo, gravar) {
        this.gravar = gravar;
        this.geradorComponente = new GeradorComponente();
        this.mapeadorBotao = new Map();
        this.bodyCadastro(titulo);
        const btnAdicionarItem = document.getElementById('adicionar-item');
        if (btnAdicionarItem)
            btnAdicionarItem.addEventListener('click', (_evt) => this.AdicionarItem());
    }
    setTarefa(tarefaEditar) {
        this.tarefa = tarefaEditar;
        this.preencherTela();
    }
    preencherTela() {
        this.prioridadeSelect.value = this.tarefa.prioridade || null;
        this.tituloInput.value = this.tarefa.titulo;
        this.dataInicioInput.value = new Date(this.tarefa.dataInicio).toISOString().substring(0, 10);
        this.dataConclusaoInput.value = new Date(this.tarefa.dataTermino).toISOString().substring(0, 10);
        this.tarefa.itens.forEach(item => {
            var _a;
            const li = this.geradorComponente.li(['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center']);
            if (!item)
                return;
            let itensIncluidosDiv = this.geradorComponente.div(['d-flex', 'gap-1'], '');
            const mapeadorInput = new Map();
            mapeadorInput.set('readonly', '');
            mapeadorInput.set('type', 'checkbox');
            mapeadorInput.set('value', item.titulo);
            itensIncluidosDiv.append(this.geradorComponente.input(['form-check-input'], mapeadorInput));
            itensIncluidosDiv.append(this.geradorComponente.p([]).innerText = item.titulo);
            li.append(itensIncluidosDiv);
            this.mapeadorBotao.clear();
            this.mapeadorBotao.set('type', 'button');
            this.mapeadorBotao.set('id', 'excluir-item');
            let botaoAdicionarItem = this.geradorComponente.button(BtnTipo.Excluir, ['btn', 'btn-danger'], this.mapeadorBotao);
            li.append(botaoAdicionarItem);
            (_a = this.itensUl) === null || _a === void 0 ? void 0 : _a.append(li);
        });
    }
    AdicionarItem() {
        var _a;
        console.log('adicionar');
        const li = this.geradorComponente.li(['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center']);
        const descricaoItem = document.getElementById('item-tarefa');
        if (!descricaoItem)
            return;
        let itensIncluidosDiv = this.geradorComponente.div(['d-flex', 'gap-1'], '');
        const mapeadorInput = new Map();
        mapeadorInput.set('readonly', '');
        mapeadorInput.set('type', 'checkbox');
        mapeadorInput.set('value', descricaoItem.value);
        itensIncluidosDiv.append(this.geradorComponente.input(['form-check-input'], mapeadorInput));
        itensIncluidosDiv.append(this.geradorComponente.p([]).innerText = descricaoItem.value);
        li.append(itensIncluidosDiv);
        this.mapeadorBotao.clear();
        this.mapeadorBotao.set('type', 'button');
        this.mapeadorBotao.set('id', 'excluir-item');
        let botaoAdicionarItem = this.geradorComponente.button(BtnTipo.Excluir, ['btn', 'btn-danger'], this.mapeadorBotao);
        li.append(botaoAdicionarItem);
        (_a = this.itensUl) === null || _a === void 0 ? void 0 : _a.append(li);
    }
    salvar() {
        const prioridadeSelecionada = this.prioridadeSelect.options[this.prioridadeSelect.selectedIndex].value;
        const tituloSelecionado = this.tituloInput.value;
        const dataAberturaSelecionada = this.dataInicioInput.value;
        const dataConclusaoSelecionada = this.dataConclusaoInput.value;
        const itensSelecionadosInput = this.itensUl.querySelectorAll('input');
        const itensSelecionados = [];
        itensSelecionadosInput.forEach(itemSelecionado => {
            let item = new Item();
            item.titulo = itemSelecionado.value;
            item.concluido = itemSelecionado.checked;
            itensSelecionados.push(item);
        });
        if (!this.tarefa)
            this.tarefa = new Tarefa();
        this.tarefa.prioridade = prioridadeSelecionada;
        this.tarefa.titulo = tituloSelecionado;
        this.tarefa.dataInicio = new Date(dataAberturaSelecionada);
        this.tarefa.dataTermino = new Date(dataConclusaoSelecionada);
        itensSelecionados.forEach(item => {
            this.tarefa.itens.push(item);
        });
        // const modal = document.getElementsByClassName("modal")[0] as HTMLDivElement;
        // const Background = document.getElementsByClassName("modal-backdrop fade show")[0] as HTMLDivElement;
        // modal.classList.add('d-none');
        // modal.classList.remove('show');
        // Background.classList.add('d-none');
        // modal.removeAttribute('aria-modal')
        // modal.setAttribute('aria-hidden', 'true');
        this.gravar(this.tarefa);
    }
    bodyCadastro(titulo) {
        const tituloPagina = document.getElementById("title-cadastro");
        if (tituloPagina) {
            tituloPagina.innerText = titulo;
        }
        const corpoModal = document.getElementById("body-modal");
        if (!corpoModal) {
            return;
        }
        const mapeadorInput = new Map();
        corpoModal.innerHTML = '';
        const labelDiv = this.geradorComponente.div(['mb-3', 'col-md-3'], '');
        labelDiv.append(this.geradorComponente.label('', 'form-label', 'Prioridade'));
        labelDiv.append(this.prioridadeSelect = this.geradorComponente.select(Object.keys(Prioridade), 'prioridade'));
        corpoModal.append(labelDiv);
        const tituloDiv = this.geradorComponente.div(['mb-3', 'col-md-9'], '');
        tituloDiv.append(this.geradorComponente.label('', 'form-label', 'Titulo'));
        mapeadorInput.clear();
        mapeadorInput.set('id', 'Titulo');
        mapeadorInput.set('type', 'text');
        tituloDiv.append(this.tituloInput = this.geradorComponente.input(['form-control'], mapeadorInput));
        corpoModal.append(tituloDiv);
        const dataInicioDiv = this.geradorComponente.div(['mb-3', 'col-md-4'], '');
        dataInicioDiv.append(this.geradorComponente.label('', 'form-label', 'Data inicio'));
        mapeadorInput.clear();
        mapeadorInput.set('id', 'data-inicio');
        mapeadorInput.set('type', 'date');
        dataInicioDiv.append(this.dataInicioInput = this.geradorComponente.input(['form-control'], mapeadorInput));
        corpoModal.append(dataInicioDiv);
        const dataConclusaoDiv = this.geradorComponente.div(['mb-3', 'col-md-4'], '');
        dataConclusaoDiv.append(this.geradorComponente.label('', 'form-label', 'Data Termino'));
        mapeadorInput.clear();
        mapeadorInput.set('id', 'data-conclusao');
        mapeadorInput.set('type', 'date');
        dataConclusaoDiv.append(this.dataConclusaoInput = this.geradorComponente.input(['form-control'], mapeadorInput));
        corpoModal.append(dataConclusaoDiv);
        const percentualConcluidoDiv = this.geradorComponente.div(['mb-2', 'col-md-4'], '');
        percentualConcluidoDiv.append(this.geradorComponente.label('', 'form-label', 'Concluído %'));
        mapeadorInput.clear();
        mapeadorInput.set('id', 'percentual-concluido');
        mapeadorInput.set('type', 'text');
        mapeadorInput.set('readonly', '');
        percentualConcluidoDiv.append(this.percentualConcluido = this.geradorComponente.input(['form-control'], mapeadorInput));
        corpoModal.append(percentualConcluidoDiv);
        const itemTarefaDiv = this.geradorComponente.div(['mb-3'], '');
        itemTarefaDiv.append(this.geradorComponente.label('', 'form-label', 'Item Tarefa'));
        mapeadorInput.clear();
        mapeadorInput.set('id', 'item-tarefa');
        mapeadorInput.set('type', 'text');
        itemTarefaDiv.append(this.geradorComponente.input(['form-control', 'mb-3'], mapeadorInput));
        this.mapeadorBotao.clear();
        this.mapeadorBotao.set('type', 'button');
        this.mapeadorBotao.set('id', 'adicionar-item');
        let botaoAdicionarItem = this.geradorComponente.button(BtnTipo.Adicionar, ['btn', 'btn-primary'], this.mapeadorBotao);
        itemTarefaDiv.append(botaoAdicionarItem);
        corpoModal.append(itemTarefaDiv);
        this.itensUl = this.geradorComponente.ul(['mb-3', 'px-3', 'col-12', 'list-group'], 'lista-itens');
        corpoModal.append(this.itensUl);
    }
}
