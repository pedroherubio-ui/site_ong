 const form = document.querySelector("form");

  function validarCPF(cpf) {
    const re = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    return re.test(cpf);
  }

  function validarTelefone(tel) {
    const re = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return re.test(tel);
  }

  function validarCEP(cep) {
    const re = /^\d{5}-?\d{3}$/;
    return re.test(cep);
  }

  function mostrarErro(input, mensagem) {
    input.style.border = "2px solid red";

    let erro = input.nextElementSibling;
    if (erro && erro.classList.contains("erro-msg")) {
      erro.remove();
    }

    const span = document.createElement("span");
    span.classList.add("erro-msg");
    span.style.color = "red";
    span.textContent = mensagem;
    input.insertAdjacentElement("afterend", span);
  }

  function limparErro(input) {
    input.style.border = "";
    let erro = input.nextElementSibling;
    if (erro && erro.classList.contains("erro-msg")) {
      erro.remove();
    }
  }

    form.addEventListener("submit", e => {})
    e.preventDefault();

    let valido = true;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const nascimento = document.getElementById("nascimento");
    const cep = document.getElementById("cep");
    const endereco = document.getElementById("endereco");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    const area = document.getElementById("area");
    const bio = document.getElementById("bio");
    const termos = document.querySelector("input[name='termos']");

    [nome, email, cpf, telefone, nascimento, cep, endereco, cidade, estado, area, bio, termos].forEach(limparErro);