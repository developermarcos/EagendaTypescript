export class DataContext{

  private stringConnection = 'E-agenda';
  private localStorage : Storage;
  private dataContext : [];

  constructor(){
    this.localStorage = window.localStorage;
    this.dataContext = JSON.parse(this.localStorage.getItem(this.stringConnection) || '[]');
  }

  getDados(tipoDado : string){
    return this.dataContext[<any>tipoDado] || [];
  }
  
  gravarDados(){
    this.localStorage.removeItem(this.stringConnection);
    this.localStorage.setItem(this.stringConnection, JSON.stringify(this.dataContext));
  }
}