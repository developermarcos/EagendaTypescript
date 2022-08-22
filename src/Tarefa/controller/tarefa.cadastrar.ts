

import { IPaginaCreate } from "../../Shared/pagina.create.interface.js";
import { RepositorioTarefaLocalStorage } from "../infra/repositorio.localStorage.tarefa.js";
import { IRepositorioTarefa } from "../model/iRepositorio.tarefa.js";
import { Item } from "../model/model.item.tarefa.js";
import { Tarefa } from "../model/model.tarefa.js";
import { Prioridade } from "../model/prioridade.enum.tarefa.js";


export class TelaCadastroTarefa implements IPaginaCreate{
  private tarefa : Tarefa;
  private repositorio : IRepositorioTarefa;
  private paginaListagem : string = "/public/template/tarefa/tarefa.listagem.html";
  private idSelecionado: string | undefined;
  protected selectPrioridade: HTMLSelectElement;
  protected titulo: HTMLInputElement;
  protected dataInicio: HTMLDataElement;
  protected dataConclusao: HTMLDataElement;
  protected ulItensAdicionados: HTMLUListElement;
  
  constructor(repositorioTarefa : IRepositorioTarefa, id? : string){
    
    this.repositorio = repositorioTarefa;
    this.idSelecionado = id;
    
    this.configurarTela();
    
    if(id){
      this.tarefa = this.repositorio.selecionarPorId(id);
      
      if(!this.tarefa)
      window.location.href = this.paginaListagem;
      
    }else{
      this.tarefa = new Tarefa();
    }
    this.atualizarTela();
  }
  configurarTela(): void {
    
    this.preencherPrioridades();

    this.configurarEventos();
  }
  atualizarTela(): void {
    this.selectPrioridade = document.querySelector('select') as HTMLSelectElement;
    this.selectPrioridade.value = this.tarefa.prioridade ? this.tarefa.prioridade : this.selectPrioridade.value;

    this.titulo = document.getElementById('titulo') as HTMLInputElement;
    this.titulo.value = !this.tarefa.titulo ? '' : this.tarefa.prioridade;

    this.dataInicio = document.getElementById('data-inicio') as HTMLDataElement;
    const dataInicioString = this.tarefa.dataInicio ? new Date(this.tarefa.dataInicio).toISOString().substring(0,10) : '';
    this.dataInicio.value = dataInicioString != '' ? dataInicioString : '';

    this.dataConclusao = document.getElementById('data-conclusao') as HTMLDataElement;
    const dataConclusaoString = this.tarefa.dataTermino ? new Date(this.tarefa.dataTermino).toISOString().substring(0,10) : '';
    this.dataConclusao.value = dataConclusaoString != '' ? dataConclusaoString : '';

    if(this.tarefa.itens){
      this.tarefa.itens.forEach(item => {
        this.adicionarItem(item);
        this.adicionarEventoUltimoBotao();
      });
    }
  }
  private preencherPrioridades() {
    this.selectPrioridade = document.querySelector('select') as HTMLSelectElement;
    const prioridades = Object.getOwnPropertyNames(Prioridade);
    prioridades.forEach(prioridade => {
      const opcao = document.createElement('option');
      opcao.value = prioridade;
      opcao.innerText = prioridade
      this.selectPrioridade?.append(opcao);
    });
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
      this.removerItemHtml(ultimoBotaoAdicionado.value);
    });
  }
  private adicionarItem(item : Item) {
    
    const novoItemLista = this.gerarNovoItemHtml(item);
    
    this.ulItensAdicionados = document.getElementById('itens-adicionados') as HTMLUListElement;

    this.ulItensAdicionados.append(novoItemLista);
  }
  private gerarNovoItemHtml(novoItem : Item) : HTMLLIElement{
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
  private removerItemHtml(value: string) {
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
  private salvar(){
    // const itensSelecionadosInput = document.getElementById('itens-adicionados')?.getElementsByTagName('input');
    const itensSelecionadosInput = this.ulItensAdicionados.getElementsByTagName('input');
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

    if(!this.selectPrioridade?.options[this.selectPrioridade.selectedIndex]?.value)
      mensagens.push("Campo 'Prioridade' é obrigatório!");
    if(!this.titulo?.value)
      mensagens.push("Campo 'Título' é obrigatório!");

    let dataInicioValida = Date.parse(this.dataInicio.value);
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
    
    this.tarefa.titulo = this.titulo.value;
    this.tarefa.prioridade = this.selectPrioridade?.options[this.selectPrioridade.selectedIndex].value as Prioridade;
    this.tarefa.dataInicio = new Date(this.dataInicio.value);
    if(Date.parse(this.dataConclusao.value)){
      this.tarefa.dataTermino = new Date(this.dataConclusao.value);
    }
    this.tarefa.itens = [];
    itensSelecionados.forEach(item => {
      this.tarefa.itens?.push(item);
    });

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