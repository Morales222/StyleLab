let currentCategory = "";
let currentSubcategory = "";
let savedItems = [];
let users = [];

const subcategories = {
  Tops: ["Camisa", "Blusa", "Camiseta"],
  Bottoms: ["Jeans", "Falda", "Pantalones"],
  Shoes: ["Zapatillas", "Botas", "Tacones"],
  Accessories: ["Cadena", "Gorra", "Anillo"]
};

function showLoginPage() {
  hideAllPages();
  document.getElementById("login-page").classList.remove("hidden");
}

function showCreateAccountPage() {
  hideAllPages();
  document.getElementById("create-account-page").classList.remove("hidden");
}

function backToStartPage() {
  hideAllPages();
  document.getElementById("start-page").classList.remove("hidden");
}

function createAccount() {
  const username = document.getElementById("new-username").value.trim();
  const password = document.getElementById("new-password").value.trim();
  const error = document.getElementById("create-account-error");

  if (!username || !password) {
    error.textContent = "Completa ambos campos.";
    return;
  }

  if (users.find(u => u.username === username)) {
    error.textContent = "Este usuario ya existe.";
    return;
  }

  users.push({ username, password });
  alert("Cuenta creada con éxito. Inicia sesión.");
  error.textContent = "";
  backToStartPage();
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    error.textContent = "Credenciales incorrectas.";
    return;
  }

  error.textContent = "";
  hideAllPages();
  document.getElementById("closet-page").classList.remove("hidden");
}

function chooseCategory(category) {
  currentCategory = category;
  showSubcategories(category);
}

function showSubcategories(category) {
  const subcategoryDiv = document.getElementById("subcategory-menu");
  subcategoryDiv.innerHTML = "";
  subcategories[category].forEach(sub => {
    const btn = document.createElement("button");
    btn.textContent = sub;
    btn.onclick = () => {
      currentSubcategory = sub;
      document.getElementById("clothing-form").classList.remove("hidden");
    };
    subcategoryDiv.appendChild(btn);
  });
  subcategoryDiv.classList.remove("hidden");
}

function saveItem() {
  const name = document.getElementById("item-name").value.trim();
  const color = document.getElementById("item-color").value;
  if (!name || !color || !currentSubcategory || !currentCategory) return;

  const item = {
    category: currentCategory,
    subcategory: currentSubcategory,
    name,
    color
  };
  savedItems.push(item);
  renderSavedItems();

  // Reset form
  document.getElementById("item-name").value = "";
  document.getElementById("item-color").value = "#000000";
  document.getElementById("clothing-form").classList.add("hidden");
  document.getElementById("subcategory-menu").classList.add("hidden");
}

function renderSavedItems() {
  const container = document.getElementById("saved-items");
  container.innerHTML = "";

  savedItems.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.category} (${item.subcategory}): ${item.name}`;
    div.style.color = item.color;
    container.appendChild(div);
  });
}

function generateOutfit() {
  const outfit = {
    Tops: getRandomItem("Tops"),
    Bottoms: getRandomItem("Bottoms"),
    Shoes: getRandomItem("Shoes"),
    Accessories: getRandomItem("Accessories")
  };

  const display = document.getElementById("outfit-display");
  display.innerHTML = "";

  for (let type in outfit) {
    const item = outfit[type];
    const div = document.createElement("div");
    div.textContent = item
      ? `${type}: ${item.name} (${item.subcategory})`
      : `${type}: (ninguno disponible)`;
    div.style.color = item ? item.color : "#888";
    display.appendChild(div);
  }

  document.getElementById("generated-outfit").classList.remove("hidden");
}

function getRandomItem(type) {
  const items = savedItems.filter(i => i.category === type);
  if (items.length === 0) return null;
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-content");
  dropdown.classList.toggle("hidden");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
}

function logout() {
  savedItems = [];
  hideAllPages();
  document.getElementById("start-page").classList.remove("hidden");
}

function hideAllPages() {
  const pages = document.querySelectorAll(".page");
  pages.forEach(p => p.classList.add("hidden"));
}
