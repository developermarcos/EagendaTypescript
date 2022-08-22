import { IPaginaInterface } from "./pagina.interface.js";

export interface IPaginaCreate extends IPaginaInterface{
  atualizarTela() : void;
}