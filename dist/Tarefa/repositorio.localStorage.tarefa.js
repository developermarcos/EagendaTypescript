export class RepositorioTarefaLocalStorage {
    constructor(contextoDados) {
        this.contextoDados = contextoDados;
        this.tarefas = contextoDados.getDados('tarefas');
    }
    inserir(novoRegistro) {
        this.tarefas.push(novoRegistro);
    }
    editar(registroEditado) {
        let indexObjetoArray = this.tarefas.findIndex(x => x.id === registroEditado.id);
        delete this.tarefas[indexObjetoArray];
        this.tarefas.push(registroEditado);
        this.tarefas = this.tarefas.sort(x => x.id);
    }
    excluir(excluirRegistro) {
        let indexObjetoArray = this.tarefas.findIndex(x => x.id === excluirRegistro.id);
        delete this.tarefas[indexObjetoArray];
    }
    listarTodos() {
        return this.tarefas;
    }
    selecionarPorId(id) {
        return this.tarefas.filter(x => x.id === id)[0] || null;
    }
}
