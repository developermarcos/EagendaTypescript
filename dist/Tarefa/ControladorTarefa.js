import { DataContext } from "../Shared/dataContext.js";
import { RepositorioTarefaLocalStorage } from "./repositorio.localStorage.tarefa.js";
import { Btn } from "../Shared/componetes/botao/btn.componente.js";
import { TipoBotao } from "../Shared/componetes/botao/enum.tipoBotao.list.js";
import { Prioridade } from "./enum.prioridade.tarefa.js";
import { Table } from "../Shared/componetes/table/table.componente.lis.js";
export class ControladorTarefa {
    constructor() {
        this.contextoDados = new DataContext();
        this.repositorio = new RepositorioTarefaLocalStorage(this.contextoDados);
        this.repositorio.inserir(this.gararTarefa());
        this.repositorio.inserir(this.gararTarefa());
    }
    inserir() {
        throw new Error("Method not implemented.");
    }
    editar() {
    }
    excluir() {
        throw new Error("Method not implemented.");
    }
    selecionarPorId() {
        throw new Error("Method not implemented.");
    }
    listarTodos() {
        const div = document.getElementById("tabela-dados");
        div === null || div === void 0 ? void 0 : div.replaceChildren();
        div === null || div === void 0 ? void 0 : div.append(this.obterTabelaDados().obterTabela());
    }
    // Métodos privados
    obterTabelaDados() {
        const novaTabela = new Table();
        let tarefas = this.repositorio.listarTodos();
        novaTabela.cabecalho(['ID', 'Título', 'Data Abertura', 'Data conclusão', 'Ações']);
        tarefas.forEach(tarefa => {
            let btnEditar = new Btn(TipoBotao.Editar, 'editar-' + tarefa.id.toString()).ObterBotao();
            let btnExcluir = new Btn(TipoBotao.Excluir, 'excluir-' + tarefa.id.toString()).ObterBotao();
            btnEditar.outerHTML;
            novaTabela.corpo([
                tarefa.id.toString(),
                tarefa.titulo,
                tarefa.dataInicio.toDateString(),
                tarefa.dataTermino.toDateString()
            ], [btnEditar,
                btnExcluir]);
        });
        return novaTabela;
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
