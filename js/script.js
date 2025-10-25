document.addEventListener("DOMContentLoaded", () => {

  const mainContent = document.querySelector("main");
  const links = document.querySelectorAll(".menu a");

  const templates = {
    index: `
      <section>
        <h2>Bem-vindo à Plataforma ONG</h2>
        <p>Conheça nossos projetos e participe como voluntário ou apoiador.</p>
      </section>
    `,
    projetos: `
      <section>
        <h2>Projetos Sociais</h2>
        <p>Aqui você encontra oportunidades de voluntariado e como doar.</p>
      </section>
    `,
    cadastro: `
      <section>
        <h2>Formulário de Cadastro</h2>
        <p>Preencha seus dados para se tornar voluntário ou apoiador da ONG.</p>

        <form id="form-cadastro">
          <fieldset>
            <legend>Informações Pessoais</legend>
            <label>Nome Completo:</label>
            <input type="text" id="nome" required minlength="3">
            <label>E-mail:</label>
            <input type="email" id="email" required>
            <label>CPF:</label>
            <input type="text" id="cpf" placeholder="000.000.000-00" required>
            <label>Telefone:</label>
            <input type="tel" id="telefone" placeholder="(00) 00000-0000" required>
            <label>Data de Nascimento:</label>
            <input type="date" id="nascimento" required>
          </fieldset>

          <fieldset>
            <legend>Endereço</legend>
            <label>CEP:</label>
            <input type="text" id="cep" placeholder="00000-000" required>
            <label>Endereço:</label>
            <input type="text" id="endereco" required>
            <label>Cidade:</label>
            <input type="text" id="cidade" required>
            <label>Estado:</label>
            <select id="estado" required>
              <option value="">Selecione</option>
              <option>SP</option>
              <option>RJ</option>
              <option>MG</option>
              <option>PR</option>
              <option>RS</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>Preferências</legend>
            <label>Área de interesse:</label>
            <select id="area" required>
              <option value="">Selecione</option>
              <option>Educação</option>
              <option>Meio Ambiente</option>
              <option>Saúde</option>
              <option>Capacitação</option>
            </select>
            <label>Fale sobre você:</label>
            <textarea id="bio" rows="4"></textarea>
            <label><input type="checkbox" id="termos" required> Concordo com os termos.</label>
          </fieldset>

          <div class="botoes">
            <button type="submit">Enviar</button>
            <button type="reset">Limpar</button>
          </div>
        </form>
      </section>
    `
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
      const termos = document.getElementById("termos");

      [nome,email,cpf,telefone,nascimento,cep,endereco,cidade,estado,area,bio,termos].forEach(limparErro);

      if (nome.value.trim().length < 3){ mostrarErro(nome,"O nome deve ter pelo menos 3 caracteres."); valido=false;}
      if (!email.value.includes("@")){ mostrarErro(email,"Digite um e-mail válido."); valido=false;}
      if (!validarCPF(cpf.value)){ mostrarErro(cpf,"CPF inválido."); valido=false;}
      if (!validarTelefone(telefone.value)){ mostrarErro(telefone,"Telefone inválido."); valido=false;}
      if (!nascimento.value){ mostrarErro(nascimento,"Informe sua data de nascimento."); valido=false;}
      if (!validarCEP(cep.value)){ mostrarErro(cep,"CEP inválido."); valido=false;}
      if (!endereco.value.trim()){ mostrarErro(endereco,"Informe seu endereço."); valido=false;}
      if (!cidade.value.trim()){ mostrarErro(cidade,"Informe sua cidade."); valido=false;}
      if (!estado.value){ mostrarErro(estado,"Selecione um estado."); valido=false;}
      if (!area.value){ mostrarErro(area,"Selecione uma área de interesse."); valido=false;}
      if (!bio.value.trim()){ mostrarErro(bio,"Conte-nos um pouco sobre você."); valido=false;}
      if (!termos.checked){ mostrarErro(termos,"Você deve concordar com os termos."); valido=false;}

      if (!valido) return;

      const voluntario = {nome:nome.value,email:email.value,cpf:cpf.value,telefone:telefone.value,nascimento:nascimento.value,cep:cep.value,endereco:endereco.value,cidade:cidade.value,estado:estado.value,area:area.value,bio:bio.value};

      let lista = JSON.parse(localStorage.getItem("voluntarios")) || [];
      lista.push(voluntario);
      localStorage.setItem("voluntarios",JSON.stringify(lista));

      const sucesso = document.createElement("div");
      sucesso.classList.add("alert","alert-success");
      sucesso.textContent = "Cadastro realizado com sucesso!";
      form.parentElement.insertBefore(sucesso,form);
      form.reset();
      setTimeout(()=>sucesso.remove(),5000);
    });
  }

  loadPage("index");

});
