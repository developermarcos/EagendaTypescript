

import { IRepositorioSerializavel } from "../../Shared/repositorio.serializavel.interface.js";
import { RepositorioTarefaLocalStorage } from "../infra/repositorio.localStorage.tarefa.js";
import { IRepositorioTarefa } from "../model/iRepositorio.tarefa.js";
import { Item } from "../model/model.item.tarefa.js";
import { Tarefa } from "../model/model.tarefa.js";
import { Prioridade } from "../model/prioridade.enum.tarefa.js";


export class TelaCadastroTarefa{
  tarefa : Tarefa;
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

  adicionarItem() {
    
    const inputAdicionarItem = document.getElementById('input-adicionar-item') as HTMLInputElement;
    
    const novoItemLista = this.gerarNovoItemLista(inputAdicionarItem?.value);
    
    const ulItensAdicionados = document.getElementById('itens-adicionados') as HTMLUListElement;

    ulItensAdicionados.append(novoItemLista);
  }

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
  
  salvar(){
    const selectPrioridade = document.querySelector('select') as HTMLSelectElement;
    const prioridadeSelecionada = selectPrioridade?.options[selectPrioridade.selectedIndex] as HTMLOptionElement;
    const tituloInput = document.getElementById('titulo') as HTMLInputElement;
    const dataInicioInput = document.getElementById('data-inicio') as HTMLDataElement;
    const dataInicio = new Date(dataInicioInput.value);
    let dataInicioValida = Date.parse(dataInicioInput.value);
    const dataConclusaoInput = document.getElementById('data-conclusao') as HTMLDataElement;
    const dataConclusao = new Date(dataConclusaoInput.value);
    let dataConclusaoValida = Date.parse(dataConclusaoInput.value);
    const itensSelecionadosInput = document.getElementById('itens-adicionados')?.getElementsByTagName('input');
    const itensSelecionados : Item[] = [];

    if(itensSelecionadosInput){
      for (let i = 0; i < itensSelecionadosInput.length; i++) {
        let novoItem = new Item();
        novoItem.id= i+1;
        novoItem.titulo= itensSelecionadosInput[i].value;
        novoItem.concluido = itensSelecionadosInput[i].checked;
        itensSelecionados.push(novoItem);
      }
    }
    let mensagens : string[] = [];

    if(!prioridadeSelecionada?.value)
      mensagens.push("Campo 'Prioridade' é obrigatório!");
    if(!tituloInput?.value)
      mensagens.push("Campo 'Título' é obrigatório!");

    if(isNaN(dataInicioValida))
      mensagens.push("Campo 'Data início' é obrigatório!");
    
    if(mensagens.length > 0){
      document.getElementById('mensagem')?.classList.remove('d-none');
      mensagens.forEach(mensagem => {
        let p = document.createElement('p');
        p.innerText = mensagem;
        document.getElementById('mensagem')?.append(p);
      });
      return;
    }
    document.getElementById('mensagem')?.classList.add('d-none');
    
    this.tarefa.titulo = tituloInput.value;
    this.tarefa.prioridade = prioridadeSelecionada.value as Prioridade;
    this.tarefa.dataInicio = dataInicio;
    if(dataConclusaoValida){
      this.tarefa.dataTermino = dataConclusao;
    }
    itensSelecionados.forEach(item => {
      this.tarefa.itens?.push(item);
    })
    
    const repositorio : IRepositorioTarefa = new RepositorioTarefaLocalStorage();

    repositorio.inserir(this.tarefa);

    document.location.href = "./tarefa.listagem.html";
  }
}

const tarefaCadastro = new TelaCadastroTarefa();

tarefaCadastro.tarefa = new Tarefa();

const btnAdicionarItem = document.getElementById('btn-adicionar-item');

const formCadastroTarefa = document.querySelector('form');

formCadastroTarefa?.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  tarefaCadastro.salvar();
});

btnAdicionarItem?.addEventListener('click', function(e){
  e.preventDefault();
  tarefaCadastro.adicionarItem();

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