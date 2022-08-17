import { EntidadeBase } from "../Shared/entidadeBase.js";
export class Tarefa extends EntidadeBase {
    constructor() {
        super();
        this.itens = [];
    }
    calcularPercentualConclusaoItens() {
        if (!this.itens || this.itens.length == 0)
            return 0;
        return this.itens.length / this.itens.filter(x => x.concluido === true).length;
    }
}
