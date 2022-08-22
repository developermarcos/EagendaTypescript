import { IPaginaInterface } from "./pagina.interface.js";

export interface IPaginaListavel extends IPaginaInterface{
  atualizarTabela() : void;
}