// import { ControladorTarefa } from "./Tarefa/ControladorTarefa.js";

import { GeradorComponente } from "./Shared/componetes/geradorComponente/html.componente.js";
import { ControladorTarefa } from "./Tarefa/ControladorTarefa.js";

const btnCadastrar = document.getElementById('cadastrar');

const geradorComponente = new GeradorComponente();
const controladorTarefa: ControladorTarefa = new ControladorTarefa(geradorComponente);
controladorTarefa.listarTodos();

btnCadastrar?.addEventListener('click', ()=>{
  controladorTarefa.inserir();
});