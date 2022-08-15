// import { ControladorTarefa } from "./Tarefa/ControladorTarefa.js";

import { ControladorTarefa } from "./Tarefa/ControladorTarefa.js";

const botoesEditar = document.getElementsByClassName('.btn-acoes')[0];
botoesEditar?.addEventListener('click', ()=>{
  console.log('aqui');
});
const controladorTarefa: ControladorTarefa = new ControladorTarefa();
controladorTarefa.listarTodos();