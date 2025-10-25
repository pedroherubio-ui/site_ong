 const form = document.querySelector("form");

  // Função para validar CPF simples (apenas formato)
  function validarCPF(cpf) {
    const re = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    return re.test(cpf);
  }

  // Função para validar telefone (Brasil)
  function validarTelefone(tel) {
    const re = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return re.test(tel);
  }
