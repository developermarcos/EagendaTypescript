import { IListavelHtml } from "../../Shared/iListavel.html.js";
import { RepositorioTarefaLocalStorage } from "../infra/repositorio.localStorage.tarefa.js";
import { IRepositorioTarefa } from "../model/iRepositorio.tarefa.js";
import { Tarefa } from "../model/model.tarefa.js";


class TarefaListagem implements IListavelHtml{
  private linkCadastro = './tarefa.cadastrar.html';
  private repositorio : IRepositorioTarefa;
  
  constructor(repositorio : IRepositorioTarefa){
    this.repositorio = repositorio;
    this.configurarTela();
    this.atualizarListagem();

    this.configurarLinkCadastro();
    
    this.atualizarHeadTabela(this.mapeadorObjeto());

    this.atualizarBodyTabela(this.mapeadorObjeto());
  }
  configurarTela(): void {
    console.log('refatorar configurar tela');
  }
  atualizarListagem(): void {
    console.log('refatorar atualizar listagem');
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

    const tarefas = this.repositorio.listarTodos();
    
    tarefas.forEach(tarefa => {
      const linhaBody = tablebody?.insertRow();
      for (var [key, value] of mapeadorObjeto) {
        let valorColuna : any = Object.getOwnPropertyDescriptor(tarefa, key);
        let coluna = linhaBody?.insertCell();
        coluna.append(valorColuna?.value);
      }
      
      this.configurarAcoes(linhaBody, tarefa);
    });
    
    tabela?.append(tablebody);
  }

  private configurarAcoes(linhaBody: HTMLTableRowElement, tarefa: Tarefa) {
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
      let excluir : boolean = confirm(`Deseja realmente excluir o registro '${tarefa.titulo}'`);

      if(excluir){
        this.repositorio.excluir(tarefa.id);
        window.location.reload();
      }
    });

    colunaAcoes.append(btnExcluir);
  }
}

new TarefaListagem(new RepositorioTarefaLocalStorage());
