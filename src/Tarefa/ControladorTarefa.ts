import { IControladorbase } from "../Shared/iControladorBase.js";
import { IRepositorioTarefa } from "./iRepositorio.tarefa.js";
import { DataContext } from "../Shared/dataContext.js";
import { RepositorioTarefaLocalStorage } from "./repositorio.localStorage.tarefa.js";
import { Btn } from "../Shared/componetes/botao/btn.componente.js";
import { TipoBotao } from "../Shared/componetes/botao/enum.tipoBotao.list.js";
import { Tarefa } from "./model.tarefa.js";
import { Prioridade } from "./enum.prioridade.tarefa.js";
import { Table } from "../Shared/componetes/table/table.componente.lis.js";
import { GeradorComponente } from "../Shared/componetes/geradorComponente/html.componente.js";
import { TelaCadastroTarefa } from "./Tela/tarefa.cadastrar.js";


export class ControladorTarefa implements IControladorbase{
  repositorio : IRepositorioTarefa;
  tabela : HTMLTableElement;
  contextoDados : DataContext;
  geradorComponete : GeradorComponente;

  constructor(geradorComponete : GeradorComponente){
    this.contextoDados = new DataContext();
    
    this.repositorio = new RepositorioTarefaLocalStorage(this.contextoDados);
    
    this.geradorComponete = geradorComponete;
    this.repositorio.inserir(this.gararTarefa());
    this.repositorio.inserir(this.gararTarefa());
  }
  inserir(): void {
        const telaCadastro : TelaCadastroTarefa = new TelaCadastroTarefa(this.geradorComponete);
  }
  editar(): void {
        
  }
  excluir(): void {
    throw new Error("Method not implemented.");
  }
  selecionarPorId(): void {
    throw new Error("Method not implemented.");
  }
  listarTodos(): void {
    const div = document.getElementById("tabela-dados");
    
    div?.replaceChildren();
    
    div?.append(this.obterTabelaDados().obterTabela());
  }
  
// Métodos privados
private obterTabelaDados() : Table {
  const novaTabela = new Table();
  let tarefas = this.repositorio.listarTodos();
  novaTabela.cabecalho(['ID', 'Título', 'Data Abertura', 'Data conclusão', 'Ações']);

  tarefas.forEach(tarefa => {
    let btnEditar = new Btn(TipoBotao.Editar, 'editar-'+tarefa.id.toString()).botao();
    let btnExcluir = new Btn(TipoBotao.Excluir, 'excluir-'+tarefa.id.toString()).botao();
    btnEditar.outerHTML;
    novaTabela.corpo([
      tarefa.id.toString(),
      tarefa.titulo,
      tarefa.dataInicio.toDateString(),
      tarefa.dataTermino.toDateString()
    ],
    [ btnEditar,
      btnExcluir]
    );
  });
  return novaTabela;
}
  private gararTarefa(): Tarefa {
    // let item : Item = {
    //   id : 1,
    //   titulo : 'Teste', 
    //   concluido : false
    // };
    return {
      id: 1,
      titulo: 'teste',
      dataInicio: new Date(2022, 5, 5),
      dataTermino: new Date(2022, 5, 5),
      prioridade: Prioridade.Baixa,
      itens: []
    };
  }
}