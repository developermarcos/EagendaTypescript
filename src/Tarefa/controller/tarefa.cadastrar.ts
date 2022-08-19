

import { Tarefa } from "../model/model.tarefa.js";
import { Prioridade } from "../model/prioridade.enum.tarefa.js";


export class TelaCadastroTarefa{

  removerItem(value: string) {
    if(!value)
      return;

    const ulItensAdicionados = document.getElementById('itens-adicionados') as HTMLUListElement;

    let listaItensAdicionados = ulItensAdicionados.getElementsByTagName('li');

    let listaItensAdicionadosAtualizada : HTMLLIElement[] = [];

    for (let i = 0; i < listaItensAdicionados.length; i++) {
      if(listaItensAdicionados[i].querySelector('input')?.value === value)
        continue;      
      listaItensAdicionadosAtualizada.push(listaItensAdicionados[i]);
    }

    ulItensAdicionados.innerHTML = '';
    listaItensAdicionadosAtualizada.forEach(item => {
      ulItensAdicionados.append(item);
    });
  }
  
  constructor(){
    this.preencherPrioridades();
  }
  private preencherPrioridades() {
    const selectPrioridade = document.querySelector('select');
    const prioridades = Object.getOwnPropertyNames(Prioridade);
    prioridades.forEach(prioridade => {
      const opcao = document.createElement('option');
      opcao.value = prioridade;
      opcao.innerText = prioridade
      selectPrioridade?.append(opcao);
    });
  }
  private gerarNovoItemLista(descricaoItem : string) : HTMLLIElement{
    const li = document.createElement('li');
    const classesLista = ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'];
    classesLista.forEach(classe => {
      li.classList.add(classe);
    });

    const divItem = document.createElement('div');
    divItem.classList.add('d-flex');
    divItem.classList.add('gap-1');

    const input = document.createElement('input');
    input.classList.add('form-check-input');
    input.classList.add('gap-1');
    input.classList.add('me-1');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', descricaoItem);
    divItem.append(input);
    divItem.append(descricaoItem);
    
    const botaoExclusaoItem = `<button class="btn btn-danger excluir-itens-tarefa" value="${descricaoItem}"> <i class="fa-solid fa-trash-can"></i> </button>`;

    li.append(divItem);
    li.innerHTML += botaoExclusaoItem;

    return li;
  }  
  AdicionarItem() {
    
    const inputAdicionarItem = document.getElementById('input-adicionar-item') as HTMLInputElement;
    
    const novoItemLista = this.gerarNovoItemLista(inputAdicionarItem?.value);
    
    const ulItensAdicionados = document.getElementById('itens-adicionados') as HTMLUListElement;

    ulItensAdicionados.append(novoItemLista);
  }
  salvar(){
    // const prioridadeSelecionada = this.prioridadeSelect.options[this.prioridadeSelect.selectedIndex].value;
    // const tituloSelecionado = this.tituloInput.value;
    // const dataAberturaSelecionada = this.dataInicioInput.value;
    // const dataConclusaoSelecionada = this.dataConclusaoInput.value;
    // const itensSelecionadosInput = this.itensUl.querySelectorAll('input');
    // const itensSelecionados : Item[] =[];
    // itensSelecionadosInput.forEach(itemSelecionado => {
    //   let item = new Item()
    //   item.titulo = itemSelecionado.value;
    //   item.concluido = itemSelecionado.checked;
    //   itensSelecionados.push(item);
    // });

    // if(!this.tarefa)
    //   this.tarefa = new Tarefa();

    // this.tarefa.prioridade = prioridadeSelecionada as Prioridade;
    // this.tarefa.titulo = tituloSelecionado;
    // this.tarefa.dataInicio = new Date(dataAberturaSelecionada);
    // this.tarefa.dataTermino = new Date(dataConclusaoSelecionada);
    // itensSelecionados.forEach(item => {
    //   this.tarefa.itens.push(item);
    // });
    
    // const modal = document.getElementsByClassName("modal")[0] as HTMLDivElement;
    // const Background = document.getElementsByClassName("modal-backdrop fade show")[0] as HTMLDivElement;
    // modal.classList.add('d-none');
    // modal.classList.remove('show');
    // Background.classList.add('d-none');
    // modal.removeAttribute('aria-modal')
    // modal.setAttribute('aria-hidden', 'true');

    // this.gravar(this.tarefa);
  }
}
const tarefaCadastro = new TelaCadastroTarefa();

const btnAdicionarItem = document.getElementById('btn-adicionar-item');

btnAdicionarItem?.addEventListener('click', function(e){
  e.preventDefault();
  tarefaCadastro.AdicionarItem();

  adicionarEventoUltimoBotao();  
});

function adicionarEventoUltimoBotao() {

  const botoes = document.getElementsByClassName('excluir-itens-tarefa');

  let ultimoBotaoAdicionado = botoes[botoes.length - 1] as HTMLButtonElement;

  ultimoBotaoAdicionado.addEventListener('click', (evt) => {
    evt.preventDefault();
    tarefaCadastro.removerItem(ultimoBotaoAdicionado.value);
  });
}