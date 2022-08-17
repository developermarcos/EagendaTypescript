import { TipoBotao} from "./enum.tipoBotao.list.js";
export class Btn{
  private _botao : HTMLButtonElement;

  constructor(tipoBotao : TipoBotao, identificadorUnico : string){
    this._botao = document.createElement('button');
    this._botao.value = identificadorUnico;
    this.ConfigurarEstilo(tipoBotao);
  }
  
  botao() : HTMLButtonElement{
    return this._botao;
  }
  
  // Métodos privados
  private ConfigurarEstilo(tipoBotao : TipoBotao){
    switch(tipoBotao){
      case TipoBotao.Cadastrar:
        this.SetarEstilo(TipoBotao.Cadastrar, ['btn', 'btn-primary' , 'btn-acoes']);
        break;
      case TipoBotao.Editar:
        this.SetarEstilo(TipoBotao.Editar, ['btn', 'btn-success' , 'btn-acoes']);
        break;
      case TipoBotao.Excluir:
        this.SetarEstilo(TipoBotao.Excluir, ['btn', 'btn-danger', 'btn-acoes']);
        break;
      case TipoBotao.Salvar:
        this.SetarEstilo(TipoBotao.Salvar, ['btn', 'btn-primary', 'btn-acoes']);
        break;
      case TipoBotao.Voltar:
        this.SetarEstilo(TipoBotao.Voltar, ['btn', 'btn-secondary', 'btn-acoes']);
        break;
    }
  }
  
  private SetarEstilo(tipoBotao : TipoBotao, classes : string[]) {
    
    for (let classe in classes){
      this._botao.classList.add(classes[classe]);
    }
    
    this._botao.type = 'button';

    this._botao.textContent = tipoBotao;
  }
  
}