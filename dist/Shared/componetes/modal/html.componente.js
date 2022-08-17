export class ComponentesHtml {
    gerarDiv(classes, id) {
        let div = document.createElement('div');
        div.classList.add(classes);
        div.setAttribute('id', id);
        return div;
    }
    gerarLabel(forAtributo, classes, titulo) {
        let label = document.createElement('label');
        label.classList.add(classes);
        label.htmlFor = forAtributo;
        label.innerText = titulo;
        return label;
    }
    gerarInput(type, classes, id) {
        let input = document.createElement('input');
        input.classList.add(classes);
        input.type = type;
        input.setAttribute('id', id);
        //   <div class="form-text">Títlo de tarefas devem ser únicos no sistema!</div>
        return input;
    }
    gerarDivComentarioInput(classes, titulo) {
        let div = document.createElement('div');
        div.classList.add(classes);
        div.innerText = titulo;
        return div;
    }
    gerarCabecalhoModal(titulo, idModal) {
        let div = document.createElement('div');
        div.classList.add('modal-header');
        let h5 = document.createElement('h5');
        h5.classList.add('modal-title');
        h5.innerText = titulo;
        let button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn-close');
        button.setAttribute('data-bs-dismiss', 'modal');
        button.setAttribute('arial-label', 'Close');
        div.append(h5);
        div.append(button);
        return div;
    }
}
