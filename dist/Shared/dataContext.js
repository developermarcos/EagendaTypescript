export class DataContext {
    constructor() {
        this.stringConnection = 'E-agenda';
        this.localStorage = window.localStorage;
        this.dataContext = JSON.parse(this.localStorage.getItem(this.stringConnection) || '[]');
    }
    getDados(tipoDado) {
        return this.dataContext[tipoDado] || [];
    }
    gravarDados() {
        this.localStorage.removeItem(this.stringConnection);
        this.localStorage.setItem(this.stringConnection, JSON.stringify(this.dataContext));
    }
}
