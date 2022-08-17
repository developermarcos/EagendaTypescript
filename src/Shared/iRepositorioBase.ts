import { EntidadeBase } from "./entidadeBase.js";

export interface IRepositorioBase<T>{
  inserir(novoRegistro : T) : void;
  editar(registroEditado : T) : void;
  excluir(excluirRegistro : T) : void;
  listarTodos() : T[];
  selecionarPorId(id : string) : T;
}