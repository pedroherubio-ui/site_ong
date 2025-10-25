// js/script.js — versão corrigida e compatível com páginas separadas

document.addEventListener("DOMContentLoaded", () => {
  const THEME_KEY = "site_theme"; // "light" | "dark"
  const CONTRAST_KEY = "site_contrast"; // "normal" | "high"

  const darkModeBtn = document.getElementById("dark-mode-toggle");
  const highContrastBtn = document.getElementById("high-contrast-toggle");

  // Função para aplicar preferências salvas de tema e contraste
  function applyPreferences() {
    const theme = localStorage.getItem(THEME_KEY) || "light";
    const contrast = localStorage.getItem(CONTRAST_KEY) || "normal";

    document.body.classList.toggle("dark-mode", theme === "dark");
    document.body.classList.toggle("high-contrast", contrast === "high");

    if (darkModeBtn) darkModeBtn.setAttribute("aria-pressed", theme === "dark");
    if (highContrastBtn) highContrastBtn.setAttribute("aria-pressed", contrast === "high");
  }

  // Alternar modo escuro
  function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    if (darkModeBtn) darkModeBtn.setAttribute("aria-pressed", isDark);
  }

  // Alternar alto contraste
  function toggleHighContrast() {
    const isHigh = document.body.classList.toggle("high-contrast");
    localStorage.setItem(CONTRAST_KEY, isHigh ? "high" : "normal");
    if (highContrastBtn) highContrastBtn.setAttribute("aria-pressed", isHigh);
  }

  // Liga eventos aos botões
  if (darkModeBtn) darkModeBtn.addEventListener("click", toggleDarkMode);
  if (highContrastBtn) highContrastBtn.addEventListener("click", toggleHighContrast);

  // Aplica preferências salvas ao carregar
  applyPreferences();

  // ------------------------------
  // Validação de formulário (somente na página de cadastro)
  // ------------------------------
  const form = document.getElementById("form-cadastro");
  if (form) {
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
});
