// import { ControladorTarefa } from "./Tarefa/ControladorTarefa.js";

import { BtnTipo } from "./Shared/componetes/btn.type.js";
import { GeradorComponente } from "./Shared/componetes/gerador.componetes.html.js";
import { ControladorTarefa } from "./Tarefa/ControladorTarefa.js";

const btnCadastrar = document.getElementById('btn-cadastrar');

const geradorComponente = new GeradorComponente();
const controladorTarefa: ControladorTarefa = new ControladorTarefa(geradorComponente);

const tabela = document.querySelector('table') as HTMLTableElement;

const configurarTabela = controladorTarefa.configurarTabela();

tabela.append(configurarTabela);

let tabelaAtualizada = controladorTarefa.atualizarListagem();

tabela.append(tabelaAtualizada);

const botoes = document.querySelectorAll('button');
botoes.forEach(btn => {
  btn.addEventListener('click', (_evt)=> {
    const btnConvertido = btn as HTMLButtonElement;
    switch(btnConvertido.name){
      case BtnTipo.Cadastrar:
        controladorTarefa.inserir();
        break;
      case BtnTipo.Editar:
        controladorTarefa.editar(btnConvertido.value);
        break;
      case BtnTipo.Excluir:
        controladorTarefa.excluir();
        break;
    }
  })
});

