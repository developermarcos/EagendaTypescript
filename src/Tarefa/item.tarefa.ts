export class Item {
  id : number;
  titulo : string;
  concluido : boolean;
  constructor(id : number, titulo : string, concluido : boolean){
    this.id = id;
    this.titulo = titulo;
    this.concluido = concluido;
  }
}