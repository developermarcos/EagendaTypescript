export interface IListavelHtml{
  mapeadorObjeto() : Map<string, string>;
  atualizarHeadTabela(mapeadorObjeto : Map<string, string>) : void;
  atualizarBodyTabela(mapeadorObjeto : Map<string, string>) : void;
  configurarLinkCadastro() : void;
}