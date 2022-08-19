import { EntidadeBase } from "./entidadeBase.js";

export interface ICadastravel{
  inserir(registro : EntidadeBase) : void;
  editar(registro : EntidadeBase) : void;
  excluir(registro : EntidadeBase) : void;
}