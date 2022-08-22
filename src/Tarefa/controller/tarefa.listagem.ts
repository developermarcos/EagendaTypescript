import { IListavelHtml } from "../../Shared/iListavel.html.js";
import { RepositorioTarefaLocalStorage } from "../infra/repositorio.localStorage.tarefa.js";
import { Tarefa } from "../model/model.tarefa.js";


class TarefaListagem implements IListavelHtml{
  private linkCadastro = './tarefa.cadastrar.html';
  private linkExclusao = '';
  constructor(){
    this.configurarLinkCadastro();
    
    this.atualizarHeadTabela(this.mapeadorObjeto());

    this.atualizarBodyTabela(this.mapeadorObjeto());
  }
  configurarLinkCadastro(): void {
    const linkCadastrar = document.getElementById('cadastrar-link') as HTMLAnchorElement;
    linkCadastrar.href = this.linkCadastro;
  }
  mapeadorObjeto(): Map<string, string> {
    let mapeadorObjeto = new Map();
    // this.mapeadorObjeto.set('id', 'ID');
    mapeadorObjeto.set('prioridade', 'Prioridade');
    mapeadorObjeto.set('titulo', 'Título');
    mapeadorObjeto.set('dataInicio', 'Abertura');
    mapeadorObjeto.set('dataTermino', 'Data termino');
    return mapeadorObjeto;
  }
  atualizarHeadTabela(mapeadorObjeto : Map<string, string>): void {
    const table = document.querySelector('table') as HTMLTableElement;
    const tableHead = document.createElement('thead');
    const linhaCabecalho = tableHead?.insertRow();
    
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
  atualizarBodyTabela(mapeadorObjeto : Map<string, string>): void {
    const tabela = document.querySelector('table');

    let tablebody = document.createElement('tbody');

    const tarefas = new RepositorioTarefaLocalStorage().listarTodos();
    
    tarefas.forEach(tarefa => {
      const linhaBody = tablebody?.insertRow();
      for (var [key, value] of mapeadorObjeto) {
        let valorColuna : any = Object.getOwnPropertyDescriptor(tarefa, key);
        let coluna = linhaBody?.insertCell();
        coluna.append(valorColuna?.value);
      }
      
      let colunaAcoes = linhaBody.insertCell();
      colunaAcoes.classList.add('gap-2');
      colunaAcoes.classList.add('d-flex');
      const btnEditar = `<a class="btn btn-success" href="${this.linkCadastro}?id=${tarefa.id}" value="${tarefa.id}"><i class="fa-solid fa-pen-to-square"></i></a>`;
      const btnExcluir = `<a class="btn btn-danger" href="${this.linkExclusao}?id=${tarefa.id}" value="${tarefa.id}"><i class="fa-solid fa-trash-can"></i></a>`;
      colunaAcoes.innerHTML = btnEditar+btnExcluir;
    });
    
    tabela?.append(tablebody);
  }
}

new TarefaListagem();
