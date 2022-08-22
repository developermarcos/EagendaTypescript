class MyHeader extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
    <nav class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark w-100">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32">
            <use xlink:href="#bootstrap"></use>
          </svg>
          <span class="fs-4">Menu</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="/public/template/tarefa/tarefa.listagem.html" class="nav-link active" aria-current="page">
              Tarefas
            </a>
          </li>
          <li style="display:none;">
            <a href="#" class="nav-link text-white">
              Contatos
            </a>
          </li>
        </ul>
        <hr>
        <div class="dropdown">
          <a href="#" class="d-flex align-items-center text-white text-decoration-none" id="dropdownUser1"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://avatars.githubusercontent.com/u/82339940?v=4" alt="" width="32" height="32"
              class="rounded-circle me-2">
            <strong>Marcos Lima</strong>
          </a>
        </div>
      </nav>
    `;
  }
}
function scriptBase(){

  var css_bootstrap = document.createElement('link');
  css_bootstrap.setAttribute('href','https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css');
  css_bootstrap.setAttribute('rel','stylesheet');
  css_bootstrap.setAttribute('integrity','sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx');
  css_bootstrap.setAttribute('crossorigin','anonymous');
  document.head.appendChild(css_bootstrap);

  var js_bootstrap = document.createElement('script');
  js_bootstrap.setAttribute('defer','');
  js_bootstrap.setAttribute('src','https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js');
  js_bootstrap.setAttribute('integrity','sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa');
  js_bootstrap.setAttribute('crossorigin','anonymous');
  document.head.appendChild(js_bootstrap);

  var font_awesome_css = document.createElement('script');
  font_awesome_css.setAttribute('href','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css');
  font_awesome_css.setAttribute('rel','stylesheet');
  document.head.appendChild(font_awesome_css);

  var font_awesome_js = document.createElement('script');
  font_awesome_js.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/js/all.min.js');
  font_awesome_js.setAttribute('defer','');
  document.head.appendChild(font_awesome_js);
  
}
customElements.define('my-header', MyHeader);
scriptBase();