export class Table{
  private table : HTMLTableElement;
  private body : HTMLTableSectionElement;
  constructor(){
    this.table = document.createElement('table');
    this.table.classList.add('table');
    this.body = this.table.createTBody();
  }

  cabecalho(colunas : string[]){
    let cabecalho = this.table.createTHead();
    let row = cabecalho.insertRow();
    colunas.forEach(coluna => {
      let th = document.createElement('th');
      th.innerHTML=coluna;
      th.scope = 'col';
      row.append(th);
    });
  }

  corpo(colunas : string[], acoes : HTMLButtonElement[]){
    
    let row = this.body.insertRow();
    colunas.forEach(coluna => {
      let colunaItem = row.insertCell();
      colunaItem.innerText = coluna;      
    }); 
    let colunaItem = row.insertCell();
    acoes.forEach(acao => {
      colunaItem.appendChild(acao);  
    }); 
    let ultimaColuna = <HTMLTableSectionElement>row.lastChild;
    ultimaColuna.classList.add('d-flex');
    ultimaColuna.classList.add('gap-1');
  }

  obterTabela(): HTMLTableElement{
    return this.table;
  }
}