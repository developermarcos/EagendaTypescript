export class Table {
    constructor() {
        this.table = document.createElement('table');
        this.table.classList.add('table');
        this.body = this.table.createTBody();
    }
    cabecalho(colunas) {
        let cabecalho = this.table.createTHead();
        let row = cabecalho.insertRow();
        colunas.forEach(coluna => {
            let th = document.createElement('th');
            th.innerHTML = coluna;
            th.scope = 'col';
            row.append(th);
        });
    }
    corpo(colunas, acoes) {
        let row = this.body.insertRow();
        colunas.forEach(coluna => {
            let colunaItem = row.insertCell();
            colunaItem.innerText = coluna;
        });
        let colunaItem = row.insertCell();
        acoes.forEach(acao => {
            colunaItem.appendChild(acao);
        });
        let ultimaColuna = row.lastChild;
        ultimaColuna.classList.add('d-flex');
        ultimaColuna.classList.add('gap-1');
    }
    obterTabela() {
        return this.table;
    }
}
