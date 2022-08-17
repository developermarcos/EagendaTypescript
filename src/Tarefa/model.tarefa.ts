import { Item } from "./model.item.tarefa.js";
import { Prioridade } from "./enum.prioridade.tarefa.js";
import { EntidadeBase } from "../Shared/entidadeBase.js";

export class Tarefa extends EntidadeBase{
  prioridade : Prioridade;
  titulo : string;
  dataInicio : Date;
  dataTermino : Date;
  itens : Item[];
  constructor(){
    super();
    this.itens = [];
  }

  calcularPercentualConclusaoItens() {
    if(!this.itens || this.itens.length == 0)
      return 0;

    return this.itens.length / this.itens.filter(x => x.concluido === true).length;
  }
}