// import { Btn } from "../../Shared/componetes/botao/btn.componente.js";
import { TipoBotao } from "../../Shared/componetes/botao/enum.tipoBotao.list.js";
import { GeradorComponente } from "../../Shared/componetes/geradorComponente/html.componente.js";
import { Prioridade } from "../enum.prioridade.tarefa.js";
import { Item } from "../item.tarefa.js";
import { Tarefa } from "../model.tarefa.js";

export class TelaCadastroTarefa{
  geradorComponente : GeradorComponente;
  mapeadorBotao : Map<string, string>;
  
  constructor(geradorComponente : GeradorComponente){
    this.geradorComponente = geradorComponente;
    this.mapeadorBotao = new Map();
    this.render();
  }
  render(tarefaEditar : Partial<Tarefa> = {}){
        
    const div = document.getElementsByClassName('modal-content')[0];
    div.innerHTML = '';

    div.append(this.geradorComponente.gerarCabecalhoModal('Tarefas', 'cadastro-tarefa'));

    div.append(this.body());

    div.append( this.Footer());
  }

  AdicionarItem(geradorComponente : GeradorComponente) {
    console.log('aqui');
    let ul = document.getElementById('lista-itens');
    // let li = this.geradorComponente.li(['list-group-item', 'd-flex', 'justify-content-between']);
    const li = this.geradorComponente.li(['list-group-item']);

    let itensIncluidosDiv = geradorComponente.div(['d-flex', 'gap-1'], '');
    itensIncluidosDiv.append(geradorComponente.input('checkbox', ['form-check-input'], '1', true));
    itensIncluidosDiv.append(geradorComponente.p([]).innerText = 'item1');

    li.append(itensIncluidosDiv);
    // li.append(new Btn(TipoBotao.Excluir, 'Excluir').botao());
    ul?.append(li);
  }

  private body() {
    const corpoModal = this.geradorComponente.div(['modal-body', 'row'], '');

    const labelDiv = this.geradorComponente.div(['mb-3', 'col-md-3'], '');
    labelDiv.append(this.geradorComponente.label('', 'form-label', 'Prioridade'));
    labelDiv.append(this.geradorComponente.select(Object.keys(Prioridade), 'prioridade'));
    corpoModal.append(labelDiv);

    const tituloDiv = this.geradorComponente.div(['mb-3', 'col-md-9'], '');
    tituloDiv.append(this.geradorComponente.label('', 'form-label', 'Titulo'));
    tituloDiv.append(this.geradorComponente.input('text', ['form-control'], 'titulo'));
    corpoModal.append(tituloDiv);

    const dataInicioDiv = this.geradorComponente.div(['mb-3', 'col-md-4'], '');
    dataInicioDiv.append(this.geradorComponente.label('', 'form-label', 'Data inicio'));
    dataInicioDiv.append(this.geradorComponente.input('date', ['form-control'], 'data-inicio'));
    corpoModal.append(dataInicioDiv);

    const dataConclusaoDiv = this.geradorComponente.div(['mb-3', 'col-md-4'], '');
    dataConclusaoDiv.append(this.geradorComponente.label('', 'form-label', 'Data Termino'));
    dataConclusaoDiv.append(this.geradorComponente.input('date', ['form-control'], 'data-conclusao'));
    corpoModal.append(dataConclusaoDiv);

    const percentualConcluidoDiv = this.geradorComponente.div(['mb-2', 'col-md-4'], '');
    percentualConcluidoDiv.append(this.geradorComponente.label('', 'form-label', 'Concluído %'));
    percentualConcluidoDiv.append(this.geradorComponente.input('text', ['form-control'], 'percentual-concluido', true));
    corpoModal.append(percentualConcluidoDiv);


    const itemTarefaDiv = this.geradorComponente.div(['mb-3'], '');
    itemTarefaDiv.append(this.geradorComponente.label('', 'form-label', 'Item Tarefa'));
    itemTarefaDiv.append(this.geradorComponente.input('text', ['form-control', 'mb-3'], 'item-tarefa', false));
    this.mapeadorBotao.clear();
    this.mapeadorBotao.set('type', 'button');
    this.mapeadorBotao.set('id', 'adicionar-item');
    let botaoAdicionarItem = this.geradorComponente.button('Adicionar', ['btn', 'btn-primary'], this.mapeadorBotao);
    itemTarefaDiv.append(botaoAdicionarItem);
    corpoModal.append(itemTarefaDiv);
    
    const ul = this.geradorComponente.ul(['mb-3', 'px-3', 'col-12', 'list-group'], 'lista-itens');
    
    corpoModal.append(ul);
    
    return corpoModal;
  }

  private Footer() {
    const footerModal = this.geradorComponente.div(['modal-footer'], '');

    this.mapeadorBotao.clear();
    this.mapeadorBotao.set('id', '1');
    this.mapeadorBotao.set('data-bs-dismiss', 'modal');
    this.mapeadorBotao.set('type', 'button');
    footerModal.append(this.geradorComponente.button('Salvar', ['btn', 'btn-primary'], this.mapeadorBotao));

    this.mapeadorBotao.clear();
    this.mapeadorBotao.set('id', '1');
    this.mapeadorBotao.set('data-bs-dismiss', 'modal');
    this.mapeadorBotao.set('type', 'button');
    footerModal.append(this.geradorComponente.button('Voltar', ['btn', 'btn-secondary'], this.mapeadorBotao));
    return footerModal;
  }
}