import { EntidadeBase } from "../Shared/entidadeBase";
export class Tarefa extends EntidadeBase {
    calcularPercentualConclusaoItens() {
        return this.itens.length / this.itens.filter(x => x.concluido === true).length;
    }
}
