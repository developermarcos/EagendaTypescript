import { IListavelHtml } from "../../Shared/iListavel.html.js";
import { RepositorioTarefaLocalStorage } from "../infra/repositorio.localStorage.tarefa.js";
import { Tarefa } from "../model/model.tarefa.js";


class TarefaListagem implements IListavelHtml{
  constructor(){
    this.configurarLinkCadastro();
    
    this.atualizarHeadTabela(this.mapeadorObjeto());

    this.atualizarBodyTabela(this.mapeadorObjeto());
  }
  configurarLinkCadastro(): void {
    const linkCadastrar = document.getElementById('cadastrar-link') as HTMLAnchorElement;
    linkCadastrar.href = "./tarefa.cadastrar.html";
  }
  mapeadorObjeto(): Map<string, string> {
    let mapeadorObjeto = new Map();
    // this.mapeadorObjeto.set('id', 'ID');
    mapeadorObjeto.set('prioridade', 'Prioridade');
    mapeadorObjeto.set('titulo', 'Título');
    mapeadorObjeto.set('dataInicio', 'Abertura');
    mapeadorObjeto.set('dataTermino', 'Conclusão');
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
      const btnEditar = `<button class="btn btn-success" value="${tarefa.id}"><i class="fa-solid fa-pen-to-square"></i></button>`;
      const btnExcluir = `<button class="btn btn-danger" value="${tarefa.id}"><i class="fa-solid fa-trash-can"></i></button>`;
      colunaAcoes.innerHTML = btnEditar+btnExcluir;
    });
    
    tabela?.append(tablebody);
  }
}

new TarefaListagem();
