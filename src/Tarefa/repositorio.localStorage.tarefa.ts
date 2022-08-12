import { Prioridade } from "./enum.prioridade.tarefa";
import { Tarefa } from "./tarefa";
import { IRepositorioTarefa } from "./iRepositorio.tarefa";
import { DataContext } from "../Shared/dataContext";

export class RepositorioTarefaLocalStorage implements IRepositorioTarefa{
  
  tarefas : Tarefa[];
  contextoDados : DataContext;

  constructor(contextoDados : DataContext){
    this.contextoDados = contextoDados;
    this.tarefas = contextoDados.getDados('tarefas');
  }

  inserir(novoRegistro: Tarefa): void {
    this.tarefas.push(novoRegistro);
  }

  editar(registroEditado: Tarefa): void {
    let indexObjetoArray = this.tarefas.findIndex(x => x.id === registroEditado.id);

    delete this.tarefas[indexObjetoArray];

    this.tarefas.push(registroEditado);

    this.tarefas = this.tarefas.sort(x => x.id);
  }

  excluir(excluirRegistro: Tarefa): void {
    let indexObjetoArray = this.tarefas.findIndex(x => x.id === excluirRegistro.id);

    delete this.tarefas[indexObjetoArray];
  }

  listarTodos(): Tarefa[] {
    return this.tarefas;
  }
  
  selecionarPorId(id: number): Tarefa {
    return this.tarefas.filter(x => x.id === id)[0] || null;
  }
  
}