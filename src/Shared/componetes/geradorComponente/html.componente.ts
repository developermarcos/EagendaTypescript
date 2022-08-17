import { Prioridade } from "../../../Tarefa/enum.prioridade.tarefa.js";

export class GeradorComponente{
   
  select(itens : string[], id : string) : HTMLSelectElement{
    let select = document.createElement('select');
    select.classList.add('form-select');
    select.setAttribute('id', id);
    itens.forEach(item => {
      let option = document.createElement('option');
      option.value = item;
      option.innerText = item;
      select.append(option);
    });

    return select;
  }
  div(classes : string[], id : string) : HTMLDivElement{
    let div : HTMLDivElement = document.createElement('div');
    classes.forEach(classe => {
      div.classList.add(classe);
    });
    div.setAttribute('id', id);
    return div;
  }
  label(forAtributo: string, classes : string, titulo : string) : HTMLLabelElement{
    let label : HTMLLabelElement = document.createElement('label');
    
    label.classList.add(classes);
    label.htmlFor = forAtributo;
    label.innerText = titulo;

    return label;
  }
  input(type : string, classes : string[], id: string, readonly : boolean = false) : HTMLInputElement{
    let input : HTMLInputElement = document.createElement('input');
    
    classes.forEach(classe => {
      input.classList.add(classe);
    });
    input.type = type;
    input.setAttribute('id', id);
    input.readOnly = readonly;
    //   <div class="form-text">Títlo de tarefas devem ser únicos no sistema!</div>
   
    return input;
  }
  
  gerarCabecalhoModal(titulo : string, idModal : string) : HTMLDivElement{
    let div : HTMLDivElement = document.createElement('div');
    div.classList.add('modal-header');

    let h5 : HTMLHeadingElement = document.createElement('h5');
    h5.classList.add('modal-title');
    h5.innerText = titulo;

    let button : HTMLButtonElement = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn-close');
    button.setAttribute('data-bs-dismiss', 'modal');
    button.setAttribute('arial-label', 'Close');

    div.append(h5);
    div.append(button);

    return div;
  }
  button(titulo : string, classes : string[], atributos : Map<string, string>) : HTMLButtonElement{
    const botao = document.createElement('button');
    
    botao.innerText = titulo;
    
    classes.forEach(classe => {
      botao.classList.add(classe);
    });
    
    for (var [key, value] of atributos) {
      botao.setAttribute(key, value);
    }
    return botao;
  }
  ul(classes : string[], id : string) : HTMLUListElement{
    const ul : HTMLUListElement = document.createElement('ul');
    classes.forEach(classe => {
      ul.classList.add(classe);
    });
    ul.setAttribute('id', id);
    return ul;
  }
  li(classes : string[]) : HTMLLIElement{
    const li : HTMLLIElement = document.createElement('li');
    classes.forEach(classe => {
      li.classList.add(classe);
    });
    return li;
  }
  p(classes : string[]) : HTMLParagraphElement{
    const p : HTMLParagraphElement = document.createElement('p');
    classes.forEach(classe => {
      p.classList.add(classe);
    });
    
    return p;
  }
}