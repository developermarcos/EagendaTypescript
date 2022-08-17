export class GeradorComponente {
    select(itens, id) {
        let select = document.createElement('select');
        select.classList.add('form-select');
        select.setAttribute('id', id);
        itens.forEach(item => {
            let option = document.createElement('option');
            option.value = item;
            option.innerText = item;
            select.append(option);
        });
        return select;
    }
    div(classes, id) {
        let div = document.createElement('div');
        classes.forEach(classe => {
            div.classList.add(classe);
        });
        div.setAttribute('id', id);
        return div;
    }
    label(forAtributo, classes, titulo) {
        let label = document.createElement('label');
        label.classList.add(classes);
        label.htmlFor = forAtributo;
        label.innerText = titulo;
        return label;
    }
    input(type, classes, id, readonly = false) {
        let input = document.createElement('input');
        classes.forEach(classe => {
            input.classList.add(classe);
        });
        input.type = type;
        input.setAttribute('id', id);
        input.readOnly = readonly;
        //   <div class="form-text">Títlo de tarefas devem ser únicos no sistema!</div>
        return input;
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
    button(titulo, classes, atributos) {
        const botao = document.createElement('button');
        botao.innerText = titulo;
        classes.forEach(classe => {
            botao.classList.add(classe);
        });
        for (var [key, value] of atributos) {
            botao.setAttribute(key, value);
        }
        return botao;
    }
    ul(classes, id) {
        const ul = document.createElement('ul');
        classes.forEach(classe => {
            ul.classList.add(classe);
        });
        ul.setAttribute('id', id);
        return ul;
    }
    li(classes) {
        const li = document.createElement('li');
        classes.forEach(classe => {
            li.classList.add(classe);
        });
        return li;
    }
    p(classes) {
        const p = document.createElement('p');
        classes.forEach(classe => {
            p.classList.add(classe);
        });
        return p;
    }
}
