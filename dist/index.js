// import { ControladorTarefa } from "./Tarefa/ControladorTarefa.js";
import { GeradorComponente } from "./Shared/componetes/geradorComponente/html.componente.js";
import { ControladorTarefa } from "./Tarefa/ControladorTarefa.js";
const btnCadastrar = document.getElementById('cadastrar');
const geradorComponente = new GeradorComponente();
const controladorTarefa = new ControladorTarefa(geradorComponente);
controladorTarefa.listarTodos();
btnCadastrar === null || btnCadastrar === void 0 ? void 0 : btnCadastrar.addEventListener('click', () => {
    controladorTarefa.inserir();
});
