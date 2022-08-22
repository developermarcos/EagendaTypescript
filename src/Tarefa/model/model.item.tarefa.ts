export class Item {
  id : number;
  titulo : string;
  concluido? : boolean;
  constructor(tituloItem : string, concluido? : boolean){
    this.titulo = tituloItem;
    this.concluido = concluido;
  }
}