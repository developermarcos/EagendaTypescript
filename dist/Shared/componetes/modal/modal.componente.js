export class modal {
    constructor(tituloModal) {
        this.modalId = 'modal-cadastro';
        this.bodyContentId = 'modal-content';
        this.classHeader = 'modal-header';
        this.classBody = 'modal-body row';
        this.classFotter = 'modal-footer';
        this.modal = document.createElement("div");
        this.modal.classList.add('modal fade');
        this.modal.setAttribute('id', this.modalId);
        this.modal.tabIndex = -1;
        this.modal.setAttribute('aria-hidden', 'true');
        let modalDialog = document.createElement("div");
        modalDialog.classList.add('modal-dialog');
        let modalContent = document.createElement("div");
        modalDialog.classList.add('modal-content');
        modalContent.append(this.montarCabecalho(tituloModal));
        modalContent.append(this.montarBody());
        modalContent.append(this.montarFooter());
        modalDialog.append(modalContent);
        this.modal.append(modalDialog);
    }
    atualizarFooter(botoes) {
        let modalFooter = this.modal.getElementsByClassName(this.classFotter)[0];
        modalFooter.outerHTML = "";
        botoes.forEach(botao => { modalFooter.append(botao); });
    }
    atualizarBody(bodyModal) {
        let modalContent = this.modal.getElementsByClassName(this.classBody)[0];
        modalContent.outerHTML = "";
        modalContent.append(bodyModal);
    }
    // Métodos privados
    montarCabecalho(tituloModal) {
        let modalHeader = document.createElement("div");
        modalHeader.classList.add(this.classHeader);
        let titulo = document.createElement('h5');
        titulo.innerText = tituloModal;
        let button = document.createElement('button');
        button.classList.add('btn-close');
        button.setAttribute('id', this.modalId);
        button.setAttribute('arial-label', 'Close');
        button.setAttribute('data-bs-dismiss', 'modal');
        button.type = 'button';
        modalHeader.append(titulo);
        modalHeader.append(button);
        return modalHeader;
    }
    montarFooter() {
        let footer = document.createElement('div');
        footer.classList.add(this.classFotter);
        return footer;
    }
    montarBody() {
        let modalBody = document.createElement('div');
        modalBody.classList.add(this.classBody);
        modalBody.setAttribute('id', this.bodyContentId);
        return modalBody;
    }
}
