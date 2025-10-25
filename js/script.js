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