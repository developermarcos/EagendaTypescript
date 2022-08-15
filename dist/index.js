// import { ControladorTarefa } from "./Tarefa/ControladorTarefa.js";
import { ControladorTarefa } from "./Tarefa/ControladorTarefa.js";
const botoesEditar = document.getElementsByClassName('.btn-acoes')[0];
botoesEditar === null || botoesEditar === void 0 ? void 0 : botoesEditar.addEventListener('click', () => {
    console.log('aqui');
});
const controladorTarefa = new ControladorTarefa();
controladorTarefa.listarTodos();
