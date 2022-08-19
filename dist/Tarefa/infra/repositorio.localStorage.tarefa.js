export class RepositorioTarefaLocalStorage {
    constructor() {
        this.storage = localStorage;
        this.tarefas = this.listarTodos();
    }
    gravar() {
        const tarefasSerializadas = JSON.stringify(this.tarefas);
        this.storage.setItem('tarefas', tarefasSerializadas);
    }
    inserir(novoRegistro) {
        this.tarefas.push(novoRegistro);
        this.gravar();
    }
    editar(registroEditado) {
        let indexObjetoArray = this.tarefas.findIndex(x => x.id === registroEditado.id);
        this.tarefas[indexObjetoArray] = registroEditado;
        this.gravar();
    }
    excluir(excluirRegistro) {
        let indexObjetoArray = this.tarefas.findIndex(x => x.id === excluirRegistro.id);
        delete this.tarefas[indexObjetoArray];
        this.gravar();
    }
    listarTodos() {
        const dados = this.storage.getItem("tarefas");
        if (!dados)
            return [];
        return JSON.parse(dados);
    }
    selecionarPorId(id) {
        return this.tarefas.filter(x => x.id === id)[0] || null;
    }
}
