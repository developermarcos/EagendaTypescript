import { Item } from "./item.tarefa";
import { Prioridade } from "./enum.prioridade.tarefa";
import { EntidadeBase } from "../Shared/entidadeBase";

export class Tarefa extends EntidadeBase{
  prioridade : Prioridade;
  titulo : string;
  dataInicio : Date;
  dataTermino : Date;
  itens : Item[];

  calcularPercentualConclusaoItens() {
    return this.itens.length / this.itens.filter(x => x.concluido === true).length;
  }
}