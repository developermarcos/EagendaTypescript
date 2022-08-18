import { BtnTipo } from "../../Shared/componetes/btn.type.js";
import { GeradorComponente } from "../../Shared/componetes/gerador.componetes.html.js";
import { Tarefa } from "../model.tarefa.js";

export class TarefaListagem{
  private mapeadorObjeto : Map<string, string>;
  constructor(){
    
    this.mapearObjeto();
  }
  private mapearObjeto(){
    this.mapeadorObjeto = new Map();
    // this.mapeadorObjeto.set('id', 'ID');
    this.mapeadorObjeto.set('prioridade', 'Prioridade');
    this.mapeadorObjeto.set('titulo', 'Título');
    this.mapeadorObjeto.set('dataInicio', 'Abertura');
    this.mapeadorObjeto.set('dataTermino', 'Conclusão');
  }
  
  ConfigurarTabela() : HTMLTableSectionElement{
    const tableHead = document.createElement('thead');
    const linhaCabecalho = tableHead?.insertRow();
    
    for (var [key, value] of this.mapeadorObjeto) {
      let coluna = document.createElement('th');
      coluna.append(value);
      linhaCabecalho.append(coluna);
    }

    let colunaAcoes = document.createElement('th');
    colunaAcoes.innerText = "Ações";
    linhaCabecalho.append(colunaAcoes);
    
    return tableHead;
  }
  AtualizarTable(tarefas : Tarefa[]) : HTMLTableSectionElement{
    
    let tablebody = document.createElement('tbody');
    tarefas.forEach(tarefa => {
      const linhaBody = tablebody?.insertRow();
      for (var [key, value] of this.mapeadorObjeto) {
        let valorColuna : any = Object.getOwnPropertyDescriptor(tarefa, key);
        let coluna = linhaBody?.insertCell();
        coluna.append(valorColuna?.value);
      }
      
      let colunaAcoes = linhaBody.insertCell();
      colunaAcoes.classList.add('gap-2');
      colunaAcoes.classList.add('d-flex');

      let mapeador = new Map();
      mapeador.set('value', tarefa.id);
      mapeador.set('data-bs-toggle', 'modal');
      mapeador.set('data-bs-target', '#modal-cadastro');
      colunaAcoes.append(new GeradorComponente().button(BtnTipo.Editar, ['btn', 'btn-success'], mapeador));

      mapeador.clear();
      mapeador.set('value', tarefa.id);
      colunaAcoes.append(new GeradorComponente().button(BtnTipo.Excluir, ['btn', 'btn-danger'], mapeador));
    });
    
    return tablebody;
  }
}