document.addEventListener("DOMContentLoaded", () => {

  const main = document.getElementById("main-content");
  const menuLinks = document.querySelectorAll(".menu a");

  const templates = {
    inicio: `
      <section>
        <h2>Bem-vindo à Plataforma ONG</h2>
        <p>Conheça nossa missão e projetos sociais.</p>
      </section>
    `,
    projetos: `
      <section>
        <h2>Projetos Sociais</h2>
        <div class="cards">
          <div class="card">
            <h3>Projeto Educação</h3>
            <p>Voluntariado em escolas e reforço escolar.</p>
          </div>
          <div class="card">
            <h3>Projeto Meio Ambiente</h3>
            <p>Ações de preservação e conscientização.</p>
          </div>
        </div>
      </section>
    `,
    cadastro: `
      <section>
        <h2>Formulário de Cadastro</h2>
        <p>Preencha seus dados para se tornar voluntário ou apoiador.</p>
        <form id="form-voluntario">
          <fieldset>
            <legend>Informações Pessoais</legend>
            <label for="nome">Nome Completo:</label>
            <input type="text" id="nome" name="nome" required minlength="3">

            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" required>

            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required>

            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" required>

            <label for="nascimento">Data de Nascimento:</label>
            <input type="date" id="nascimento" name="nascimento" required>
          </fieldset>

          <fieldset>
            <legend>Endereço</legend>
            <label for="cep">CEP:</label>
            <input type="text" id="cep" name="cep" placeholder="00000-000" required>

            <label for="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" required>

            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" required>

            <label for="estado">Estado:</label>
            <select id="estado" name="estado" required>
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
            <label for="area">Área de interesse:</label>
            <select id="area" name="area">
              <option value="">Selecione</option>
              <option>Educação</option>
              <option>Meio Ambiente</option>
              <option>Saúde</option>
              <option>Capacitação</option>
            </select>

            <label for="bio">Fale um pouco sobre você:</label>
            <textarea id="bio" name="bio" rows="4" placeholder="Conte sua experiência..."></textarea>

            <label>
              <input type="checkbox" name="termos" required> Concordo com os termos de voluntariado.
            </label>
          </fieldset>

          <div class="botoes">
            <button type="submit">Enviar</button>
            <button type="reset">Limpar</button>
          </div>
        </form>
      </section>
    `
  };

  function carregarTemplate(nome) {
    main.innerHTML = templates[nome];
    if (nome === "cadastro") {
      configurarForm();
    }
  }

  function configurarForm() {
    const form = document.getElementById("form-voluntario");
    if (!form) return;

    form.addEventListener("submit", e => {
      e.preventDefault();
      let valido = true;

      const campos = ["nome", "email", "cpf", "telefone", "nascimento", "cep", "endereco", "cidade", "estado", "area", "bio"];
      campos.forEach(id => {
        const input = document.getElementById(id);
        input.style.border = "";
        const erroExistente = input.nextElementSibling;
        if (erroExistente && erroExistente.classList.contains("erro-msg")) {
          erroExistente.remove();
        }

        if (!input.value.trim()) {
          mostrarErro(input, "Campo obrigatório.");
          valido = false;
        }
      });

      const termos = form.querySelector("input[name='termos']");
      if (!termos.checked) {
        mostrarErro(termos, "Você deve concordar com os termos.");
        valido = false;
      }

      if (!valido) return;

      const voluntario = {};
      campos.forEach(id => voluntario[id] = document.getElementById(id).value);
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

  function mostrarErro(input, msg) {
    input.style.border = "2px solid red";
    const span = document.createElement("span");
    span.classList.add("erro-msg");
    span.style.color = "red";
    span.textContent = msg;
    input.insertAdjacentElement("afterend", span);
  }

  menuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.getAttribute("href").replace(".html", "");
      carregarTemplate(target);
      history.pushState({ page: target }, "", link.getAttribute("href"));
    });
  });

  carregarTemplate("inicio");

  window.addEventListener("popstate", e => {
    if (e.state && e.state.page) {
      carregarTemplate(e.state.page);
    } else {
      carregarTemplate("inicio");
    }
  });

});
