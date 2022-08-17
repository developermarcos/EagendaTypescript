import { RepositorioTarefaLocalStorage } from "./repositorio.localStorage.tarefa.js";
import { Tarefa } from "./model.tarefa.js";
import { TelaCadastroTarefa } from "./Tela/tarefa.cadastrar.js";
import { TarefaListagem } from "./Tela/tarefa.listagem.js";
export class ControladorTarefa {
    constructor(geradorComponete) {
        this.repositorio = new RepositorioTarefaLocalStorage();
        this.geradorComponete = geradorComponete;
        this.tabela = document.querySelector('table');
    }
    inserir() {
        let tarefa = new Tarefa();
        let telaCadastro = new TelaCadastroTarefa("Cadastro de Tarefa", this.repositorio, tarefa);
        let salvar = document.getElementById('btn-gravar');
        if (!salvar)
            return;
        salvar.addEventListener('click', (_evt) => telaCadastro.gravar(salvar));
    }
    editar(id) {
        let tarefaEditar = this.repositorio.selecionarPorId(id);
        if (tarefaEditar == null) {
            return;
        }
        let telaCadastro = new TelaCadastroTarefa("Cadastro de Tarefa", this.repositorio, tarefaEditar);
        let salvar = document.getElementById('btn-gravar');
        if (!salvar)
            return;
        salvar.addEventListener('click', (_evt) => telaCadastro.gravar(salvar));
    }
    excluir() {
        console.log("excluir");
    }
    selecionarPorId() {
        throw new Error("Method not implemented.");
    }
    configurarTabela() {
        return new TarefaListagem().ConfigurarTabela();
    }
    atualizarListagem() {
        return new TarefaListagem().AtualizarTable(this.repositorio.listarTodos());
    }
}
