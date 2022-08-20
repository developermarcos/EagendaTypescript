import { EntidadeBase } from "../../Shared/entidadeBase.js";
import { Item } from "./model.item.tarefa.js";
import { Prioridade } from "./prioridade.enum.tarefa.js";

export class Tarefa extends EntidadeBase{
  prioridade : Prioridade;
  titulo : string;
  dataInicio : Date;
  dataTermino? : Date;
  itens? : Item[];
  constructor(){
    super();
    this.itens = [];
  }

  calcularPercentualConclusaoItens() : number{

    if(!this.itens || this.itens.length == 0)
      return 0;
      
    let quatidadeTotalItens : number = this.itens.length;
    let quatidadeItensConcluidos : number = 0;

    this.itens.forEach(item => {
      if(item.concluido == true)
        quatidadeItensConcluidos++;
    });
    return quatidadeTotalItens / quatidadeItensConcluidos * 100;

    // return this.itens.length / this.itens.filter(x => x.concluido === true).length;
  }
}