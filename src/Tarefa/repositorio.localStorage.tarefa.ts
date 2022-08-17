import { Tarefa } from "./model.tarefa.js";
import { IRepositorioTarefa } from "./iRepositorio.tarefa.js";
import { IRepositorioSerializavel } from "../Shared/repositorio.serializavel.interface.js";

export class RepositorioTarefaLocalStorage implements IRepositorioTarefa, IRepositorioSerializavel{
  
  tarefas : Tarefa[];
  storage : Storage;

  constructor(){
    this.storage = localStorage;
    this.tarefas = this.listarTodos();
  }
  gravar(): void {
    const tarefasSerializadas = JSON.stringify(this.tarefas);
    this.storage.setItem('tarefas', tarefasSerializadas);
  }

  inserir(novoRegistro: Tarefa): void {
    this.tarefas.push(novoRegistro);
    this.gravar();
  }

  editar(registroEditado: Tarefa): void {
    let indexObjetoArray = this.tarefas.findIndex(x => x.id === registroEditado.id);

    this.tarefas[indexObjetoArray] = registroEditado;
    
    this.gravar();
  }

  excluir(excluirRegistro: Tarefa): void {
    let indexObjetoArray = this.tarefas.findIndex(x => x.id === excluirRegistro.id);

    delete this.tarefas[indexObjetoArray];

    this.gravar();
  }

  listarTodos(): Tarefa[] {
    const dados = this.storage.getItem("tarefas");

    if(!dados)
      return [];

      return JSON.parse(dados);
  }
  
  selecionarPorId(id: string): Tarefa {
    return this.tarefas.filter(x => x.id === id)[0] || null;
  }
  
}