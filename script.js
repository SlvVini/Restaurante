// ADMIN USER FIXO
const adminUser = {
  username: "admin",
  password: "1234"
};

// Funções de localStorage para salvar cardápio (array de objetos)
function getCardapio() {
  const data = localStorage.getItem("cardapio");
  if (!data) {
    // Cardápio inicial padrão
    const inicial = [
      {
        nome: "Arroz branco",
        descricao: "Delicioso arroz branco soltinho para acompanhar seu prato.",
        imagem: "https://tse2.mm.bing.net/th/id/OIP.azVh2rfD2mTaCR3Q9bR23QHaEt?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
      },
    ];
    localStorage.setItem("cardapio", JSON.stringify(inicial));
    return inicial;
  } else {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
}

function saveCardapio(cardapio) {
  localStorage.setItem("cardapio", JSON.stringify(cardapio));
}

// FUNÇÕES PARA O SITE PRINCIPAL

function renderCardapio() {
  const menuList = document.getElementById("menu-list");
  if (!menuList) return; // só no site principal
  menuList.innerHTML = "";

  const cardapio = getCardapio();

  cardapio.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" />
      <div class="item-info">
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
      </div>
    `;
    menuList.appendChild(li);
  });
}

// FUNÇÕES PARA ADMIN

function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("login-error");

  if (user === adminUser.username && pass === adminUser.password) {
    errorMsg.textContent = "";
    showAdminPanel();
  } else {
    errorMsg.textContent = "Usuário ou senha inválidos.";
  }
}

function showAdminPanel() {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("admin-panel").classList.remove("hidden");
  renderAdminList();
}

function renderAdminList() {
  const list = document.getElementById("edit-menu-list");
  list.innerHTML = "";
  const cardapio = getCardapio();

  cardapio.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome}
      <button onclick="removeMenuItem(${index})">Remover</button>
    `;
    list.appendChild(li);
  });
}

function addMenuItem() {
  const nome = document.getElementById("new-name").value.trim();
  const desc = document.getElementById("new-desc").value.trim();
  const img = document.getElementById("new-img").value.trim();
  const saveMsg = document.getElementById("save-msg");

  if (!nome || !desc || !img) {
    saveMsg.style.color = "#d9534f";
    saveMsg.textContent = "Preencha todos os campos para adicionar.";
    return;
  }

  const cardapio = getCardapio();
  cardapio.push({ nome, descricao: desc, imagem: img });
  saveCardapio(cardapio);

  // Limpar campos
  document.getElementById("new-name").value = "";
  document.getElementById("new-desc").value = "";
  document.getElementById("new-img").value = "";

  saveMsg.style.color = "#28a745";
  saveMsg.textContent = "Item adicionado com sucesso!";
  renderAdminList();
}

function removeMenuItem(index) {
  const cardapio = getCardapio();
  cardapio.splice(index, 1);
  saveCardapio(cardapio);
  renderAdminList();
}

// Roda no carregamento do site principal
document.addEventListener("DOMContentLoaded", () => {
  renderCardapio();
});
