export class modal {
    constructor() {
    }
    gerarDiv(classes, id) {
        let div = document.createElement('div');
        div.classList.add(classes);
        div.setAttribute('id', id);
        return div;
    }
    gerarInput(divClass, labelForm, labelClass, inputType, inputClass, inputId, inpu) {
        let div = document.createElement('div');
        // <div class="mb-3 col-md-9">
        //   <label for="" class="form-label">Título</label>
        //   <input type="text" class="form-control" id="titulo" aria-describedby="titulo">
        //   <div class="form-text">Títlo de tarefas devem ser únicos no sistema!</div>
        // </div>
        return div;
    }
}
