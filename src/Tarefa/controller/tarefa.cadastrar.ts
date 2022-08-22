

import { RepositorioTarefaLocalStorage } from "../infra/repositorio.localStorage.tarefa.js";
import { IRepositorioTarefa } from "../model/iRepositorio.tarefa.js";
import { Item } from "../model/model.item.tarefa.js";
import { Tarefa } from "../model/model.tarefa.js";
import { Prioridade } from "../model/prioridade.enum.tarefa.js";


export class TelaCadastroTarefa{
  private tarefa : Tarefa;
  private repositorio : IRepositorioTarefa;
  private paginaListagem : string = "/public/template/tarefa/tarefa.listagem.html";
  private idSelecionado: string | undefined;
  
  constructor(repositorioTarefa : IRepositorioTarefa, id? : string){
    
    this.repositorio = repositorioTarefa;
    this.idSelecionado = id;
    
    this.preencherPrioridades();
    this.configurarEventos();
    
    if(id){
      this.tarefa = this.repositorio.selecionarPorId(id); 

      if(!this.tarefa)
        window.location.href = this.paginaListagem;

      this.configurarTela();

    }else{
      this.tarefa = new Tarefa();
    }
  }
  private configurarTela() {
    const selectPrioridade = document.querySelector('select') as HTMLSelectElement;
    selectPrioridade.value = this.tarefa.prioridade;

    const titulo = document.getElementById('titulo') as HTMLInputElement;
    titulo.value = this.tarefa.titulo;

    const dataInicio = document.getElementById('data-inicio') as HTMLDataElement;
    const dataInicioString = new Date(this.tarefa.dataInicio).toISOString().substring(0,10);
    dataInicio.value = dataInicioString;

    const dataConclusao = document.getElementById('data-conclusao') as HTMLDataElement;
    dataConclusao.value = this.tarefa.dataTermino ? new Date(this.tarefa.dataTermino).toISOString().substring(0,10) : '';

    if(this.tarefa.itens){
      this.tarefa.itens.forEach(item => {
        this.adicionarItem(item);
        this.adicionarEventoUltimoBotao();
      });
    }
  }
  private configurarEventos(){
    const btnAdicionarItem = document.getElementById('btn-adicionar-item');

    const formCadastroTarefa = document.querySelector('form');

    formCadastroTarefa?.addEventListener('submit', (_evt)=>{
      _evt.preventDefault();
      this.salvar();
    });

    btnAdicionarItem?.addEventListener('click', (_evt)=>{
      _evt.preventDefault();
      
      let descricaoItem = document.getElementById('input-adicionar-item') as HTMLInputElement;
      
      const novoItem = new Item(descricaoItem.value);

      this.adicionarItem(novoItem);

      this.adicionarEventoUltimoBotao();  
    });
  }

  private adicionarEventoUltimoBotao() {

    const botoes = document.getElementsByClassName('excluir-itens-tarefa');

    let ultimoBotaoAdicionado = botoes[botoes.length - 1] as HTMLButtonElement;

    ultimoBotaoAdicionado.addEventListener('click', (_evt) => {
      _evt.preventDefault();
      this.removerItem(ultimoBotaoAdicionado.value);
    });
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

  private gerarNovoItemLista(novoItem : Item) : HTMLLIElement{
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
    input.setAttribute('value', novoItem.titulo);
    input.checked = novoItem.concluido ? novoItem.concluido : false;
    divItem.append(input);
    console.log(input);
    divItem.append(novoItem.titulo);
    
    const botaoExclusaoItem = `<button class="btn btn-danger excluir-itens-tarefa" value="${novoItem.titulo}"> <i class="fa-solid fa-trash-can"></i> </button>`;

    li.append(divItem);
    li.innerHTML += botaoExclusaoItem;

    return li;
  }  

  adicionarItem(item : Item) {
    
    const novoItemLista = this.gerarNovoItemLista(item);
    
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
        const titulo= itensSelecionadosInput[i].value;
        const concluido = itensSelecionadosInput[i].checked;

        let novoItem = new Item(titulo, concluido);
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
    this.tarefa.itens = [];
    itensSelecionados.forEach(item => {
      this.tarefa.itens?.push(item);
    })
    if(this.idSelecionado){
      this.repositorio.editar(this.tarefa);
    }else{
      this.repositorio.inserir(this.tarefa);
    }

    document.location.href = "./tarefa.listagem.html";
  }
}

const params = new URLSearchParams(window.location.search);

let id = params.get("id") as string;

const tarefaCadastro = new TelaCadastroTarefa(new RepositorioTarefaLocalStorage(), id);