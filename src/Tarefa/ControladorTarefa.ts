import { IControladorbase } from "../Shared/iControladorBase.js";
import { IRepositorioTarefa } from "./iRepositorio.tarefa.js";
import { RepositorioTarefaLocalStorage } from "./repositorio.localStorage.tarefa.js";
import { Tarefa } from "./model.tarefa.js";
import { Prioridade } from "./enum.prioridade.tarefa.js";
import { GeradorComponente } from "../Shared/componetes/gerador.componetes.html.js";
import { TelaCadastroTarefa } from "./Tela/tarefa.cadastrar.js";
import { Guid } from "../Shared/guid.model.js";
import { BtnTipo } from "../Shared/componetes/btn.type.js";
import { TarefaListagem } from "./Tela/tarefa.listagem.js";


export class ControladorTarefa implements IControladorbase{
  repositorio : IRepositorioTarefa;
  tabela : HTMLTableElement;
  geradorComponete : GeradorComponente;

  constructor(geradorComponete : GeradorComponente){
    this.repositorio = new RepositorioTarefaLocalStorage();
    this.geradorComponete = geradorComponete;
    this.tabela = document.querySelector('table') as HTMLTableElement;
  }
  inserir(): void {
    let tarefa = new Tarefa();
    let telaCadastro : TelaCadastroTarefa = new TelaCadastroTarefa("Cadastro de Tarefa", this.repositorio, tarefa);

    let salvar = document.getElementById('btn-gravar') as HTMLButtonElement;
    if(!salvar)
      return;

    salvar.addEventListener('click', (_evt) => telaCadastro.gravar(salvar));
  }
  editar(id : string): void {
    let tarefaEditar = this.repositorio.selecionarPorId(id);
    if(tarefaEditar == null){
      return;
    }
    let telaCadastro : TelaCadastroTarefa = new TelaCadastroTarefa("Cadastro de Tarefa", this.repositorio, tarefaEditar);

    let salvar = document.getElementById('btn-gravar') as HTMLButtonElement;
    if(!salvar)
      return;

    salvar.addEventListener('click', (_evt) => telaCadastro.gravar(salvar));
  }
  excluir(): void {
    console.log("excluir");
  }
  selecionarPorId(): void {
    throw new Error("Method not implemented.");
  }
  configurarTabela(): HTMLTableSectionElement{
    return new TarefaListagem().ConfigurarTabela();
  }  
  atualizarListagem() : HTMLTableSectionElement{
    return new TarefaListagem().AtualizarTable(this.repositorio.listarTodos());
  }  
}