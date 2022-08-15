import { DataContext } from "../../Shared/dataContext";
import { RepositorioTarefaLocalStorage } from "../repositorio.localStorage.tarefa";
import { Btn } from "../../Shared/componetes/botao/btn.componente";
import { TipoBotao } from "../../Shared/componetes/botao/enum.tipoBotao.list";
import { Prioridade } from "../enum.prioridade.tarefa";
export class TarefaLista {
    constructor() {
        this.contextoDados = new DataContext();
        this.repositorio = new RepositorioTarefaLocalStorage(this.contextoDados);
        this.repositorio.inserir(this.gararTarefa());
    }
    AtualizarListagem(tabelaAtualizar) {
        tabelaAtualizar.append(this.obterListagem());
    }
    obterListagem() {
        let tabela = new HTMLTableElement();
        let tarefas = this.repositorio.listarTodos();
        this.GerarCabecalho(tabela);
        if (!tarefas)
            return tabela;
        this.gerarBody(tabela, tarefas);
        return tabela;
    }
    gerarBody(tabela, tarefas) {
        let tbody = tabela.createTBody();
        tarefas.forEach(function (tarefa) {
            let row = tbody.insertRow();
            let id = row.insertCell(0);
            id.innerText = tarefa.id.toString();
            let titulo = row.insertCell(1);
            titulo.innerText = tarefa.titulo;
            let dataAbertura = row.insertCell(2);
            dataAbertura.innerText = tarefa.dataInicio.toDateString();
            let dataConclusao = row.insertCell(3);
            dataConclusao.innerText = tarefa.dataTermino.toDateString();
            let acoes = row.insertCell(4);
            acoes.append(new Btn(TipoBotao.Editar, tarefa.id.toString()).ObterBotao());
            acoes.append(new Btn(TipoBotao.Excluir, tarefa.id.toString()).ObterBotao());
        });
    }
    GerarCabecalho(tabela) {
        let thead = tabela.createTHead();
        let row = thead.insertRow();
        let id = row.insertCell(0);
        id.innerText = 'ID';
        let titulo = row.insertCell(1);
        titulo.innerText = 'Título';
        let dataAbertura = row.insertCell(2);
        dataAbertura.innerText = 'Data Abertura';
        let dataConclusao = row.insertCell(3);
        dataConclusao.innerText = 'Data Conclusao';
        let acoes = row.insertCell(4);
        acoes.innerText = 'Ações';
    }
    gararTarefa() {
        // let item : Item = {
        //   id : 1,
        //   titulo : 'Teste', 
        //   concluido : false
        // };
        return {
            id: 1,
            titulo: 'teste',
            dataInicio: new Date(2022, 5, 5),
            dataTermino: new Date(2022, 5, 5),
            prioridade: Prioridade.Baixa,
            itens: []
        };
    }
}
