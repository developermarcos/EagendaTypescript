import { EntidadeBase } from "../Shared/entidadeBase.js";
export class Tarefa extends EntidadeBase {
    constructor() {
        super();
        this.itens = [];
    }
    calcularPercentualConclusaoItens() {
        if (!this.itens || this.itens.length == 0)
            return 0;
        let quatidadeTotalItens = this.itens.length;
        let quatidadeItensConcluidos = 0;
        this.itens.forEach(item => {
            if (item.concluido == true)
                quatidadeItensConcluidos++;
        });
        return quatidadeTotalItens / quatidadeItensConcluidos * 100;
        // return this.itens.length / this.itens.filter(x => x.concluido === true).length;
    }
}
