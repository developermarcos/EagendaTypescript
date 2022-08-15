import { TipoBotao} from "./enum.tipoBotao.list.js";
export class Btn{
  private botao : HTMLButtonElement;

  constructor(tipoBotao : TipoBotao, identificadorUnico : string){
    this.botao = document.createElement('button');
    this.botao.value = identificadorUnico;
    this.ConfigurarEstilo(tipoBotao);
  }
  
  ObterBotao() : HTMLButtonElement{
    return this.botao;
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
      this.botao.classList.add(classes[classe]);
    }
    
    this.botao.type = 'button';

    this.botao.textContent = tipoBotao;
  }
  
}