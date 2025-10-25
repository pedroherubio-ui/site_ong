document.addEventListener("DOMContentLoaded", () => {

  const mainContent = document.querySelector("main");
  const links = document.querySelectorAll(".menu a");

  const templates = {
    index: document.getElementById("index-template").innerHTML,
    projetos: document.getElementById("projetos-template").innerHTML,
    cadastro: document.getElementById("cadastro-template").innerHTML
  };

  function loadPage(page) {
    mainContent.innerHTML = templates[page] || "<p>Página não encontrada</p>";
    if (page === "cadastro") initForm();
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const href = link.getAttribute("href").replace(".html", "");
      loadPage(href);
    });
  });

  function initForm() {
    const form = document.getElementById("form-cadastro");
    if (!form) return;

    function validarCPF(cpf) { return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf); }
    function validarTelefone(tel) { return /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(tel); }
    function validarCEP(cep) { return /^\d{5}-?\d{3}$/.test(cep); }

    function mostrarErro(input, msg) {
      input.style.border = "2px solid red";
      const erroExistente = input.nextElementSibling;
      if (erroExistente && erroExistente.classList.contains("erro-msg")) erroExistente.remove();
      const span = document.createElement("span");
      span.classList.add("erro-msg");
      span.style.color = "red";
      span.textContent = msg;
      input.insertAdjacentElement("afterend", span);
    }

    function limparErro(input) {
      input.style.border = "";
      const erroExistente = input.nextElementSibling;
      if (erroExistente && erroExistente.classList.contains("erro-msg")) erroExistente.remove();
    }

    form.addEventListener("submit", e => {
      e.preventDefault();
      let valido = true;

      const campos = [
        {el: "nome", msg: "O nome deve ter pelo menos 3 caracteres."},
        {el: "email", msg: "Digite um e-mail válido."},
        {el: "cpf", msg: "CPF inválido.", fn: validarCPF},
        {el: "telefone", msg: "Telefone inválido.", fn: validarTelefone},
        {el: "nascimento", msg: "Informe sua data de nascimento."},
        {el: "cep", msg: "CEP inválido.", fn: validarCEP},
        {el: "endereco", msg: "Informe seu endereço."},
        {el: "cidade", msg: "Informe sua cidade."},
        {el: "estado", msg: "Selecione um estado."},
        {el: "area", msg: "Selecione uma área de interesse."},
        {el: "bio", msg: "Conte-nos um pouco sobre você."},
        {el: "termos", msg: "Você deve concordar com os termos.", fn: el => el.checked}
      ];

      campos.forEach(c => {
        const input = document.getElementById(c.el);
        limparErro(input);
        if (c.fn) {
          if (!c.fn(input.value || input)) valido = (mostrarErro(input, c.msg), false);
        } else {
          if (!input.value || input.value.trim() === "") valido = (mostrarErro(input, c.msg), false);
        }
      });

      if (!valido) return;

      const voluntario = {};
      campos.forEach(c => {
        const input = document.getElementById(c.el);
        voluntario[c.el] = input.value || (input.checked ? true : "");
      });

      let lista = JSON.parse(localStorage.getItem("voluntarios")) || [];
      lista.push(voluntario);
      localStorage.setItem("voluntarios", JSON.stringify(lista));

      const sucesso = document.createElement("div");
      sucesso.classList.add("alert", "alert-success");
      sucesso.textContent = "Cadastro realizado com sucesso!";
      form.parentElement.insertBefore(sucesso, form);
      form.reset();
      setTimeout(() => sucesso.remove(), 5000);
    });
  }

  loadPage("index");

});
