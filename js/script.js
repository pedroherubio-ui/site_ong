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

    if (nome.value.trim().length < 3) {
      mostrarErro(nome, "O nome deve ter pelo menos 3 caracteres.");
      valido = false;
    }

    if (!email.value.includes("@")) {
      mostrarErro(email, "Digite um e-mail válido.");
      valido = false;
    }

    if (!validarCPF(cpf.value)) {
      mostrarErro(cpf, "CPF inválido. Formato: 000.000.000-00");
      valido = false;
    }

    if (!validarTelefone(telefone.value)) {
      mostrarErro(telefone, "Telefone inválido. Formato: (00) 00000-0000");
      valido = false;
    }

    if (!nascimento.value) {
      mostrarErro(nascimento, "Informe sua data de nascimento.");
      valido = false;
    }

    if (!validarCEP(cep.value)) {
      mostrarErro(cep, "CEP inválido. Formato: 00000-000");
      valido = false;
    }

    if (!endereco.value.trim()) {
      mostrarErro(endereco, "Informe seu endereço.");
      valido = false;
    }

    if (!cidade.value.trim()) {
      mostrarErro(cidade, "Informe sua cidade.");
      valido = false;
    }

    if (!estado.value) {
      mostrarErro(estado, "Selecione um estado.");
      valido = false;
    }

    if (!area.value) {
      mostrarErro(area, "Selecione uma área de interesse.");
      valido = false;
    }

    if (!bio.value.trim()) {
      mostrarErro(bio, "Conte-nos um pouco sobre você.");
      valido = false;
    }

    if (!termos.checked) {
      mostrarErro(termos, "Você deve concordar com os termos.");
      valido = false;
    }

    if (!valido) return;