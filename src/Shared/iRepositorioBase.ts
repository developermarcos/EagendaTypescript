import { EntidadeBase } from "./entidadeBase";

export interface IRepositorioBase<T>{
  inserir(novoRegistro : T) : void;
  editar(registroEditado : T) : void;
  excluir(excluirRegistro : T) : void;
  listarTodos() : T[];
  selecionarPorId(id : number) : T;
}