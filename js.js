let products = [
  { name: "Телефон", price: 10000, image: "img/phone.jpg", 
  desc: "Потужний телефон з чіткою камерою та ергономічним дизайном",
  favor: "img/heart-outline.svg", buy: "img/cart-sharp.svg", del: "img/trash-outline.svg" },
  { name: "Комп'ютер", price: 50000, image: "img/comp.jpg", 
  desc: "Комп'ютер, який відкриває неймовірні можливості для роботи",
  favor: "img/heart-outline.svg", buy: "img/cart-sharp.svg", del: "img/trash-outline.svg" },
  { name: "Ноутбук", price: 40000, image: "img/laptop.jpg", 
  desc: "Даний ноутбук здивує вас своїми характеристиками та можливостями!",
  favor: "img/heart-outline.svg", buy: "img/cart-sharp.svg", del: "img/trash-outline.svg" },
  { name: "Телевізор", price: 20000, image: "img/tv.jpg", 
  desc: "Неймовірна картинка та чіткість в одному телевізорі за хорошу ціну!",
  favor: "img/heart-outline.svg", buy: "img/cart-sharp.svg", del: "img/trash-outline.svg" },
  { name: "Навушники", price: 5000, image: "img/head.jpg", 
  desc: "Кристально чистий звук та ергономічність подарують неймовірні емоції",
  favor: "img/heart-outline.svg", buy: "img/cart-sharp.svg", del: "img/trash-outline.svg" },
  { name: "Фотоаппарат", price: 30000, image: "img/camera.jpg", 
  desc: "Хочете отримати гарну картинку за пару секунд? То бігом за камерою!!",
  favor: "img/heart-outline.svg", buy: "img/cart-sharp.svg", del: "img/trash-outline.svg" },
  { name: "Годинник", price: 8000, image: "img/watch.jpg", 
  desc: "Завжди з собой. Ніколи нічого не пропустите.",
  favor: "img/heart-outline.svg", favorite: false, buy: "img/cart-sharp.svg", bought: false, del: "img/trash-outline.svg" },
  { name: "Планшет", price: 15000, image: "img/tab.jpg", 
  desc: "Не вистачає телефона? Чому б не взяти планшет?)",
  favor: "img/heart-outline.svg", buy: "img/cart-sharp.svg", del: "img/trash-outline.svg" },
  { name: "Ігрова консоль", price: 35000, image: "img/ps.jpg", 
  desc: "Обирайте консоль, якщо хочете поринути в світ відеоігор",
  favor: "img/heart-outline.svg", buy: "img/cart-sharp.svg", del: "img/trash-outline.svg" },
];
let selectedProducts = [];
const productList = document.getElementById("product-list__list");
const selectedList = document.getElementById("selected-list__list");

let currentProduct;

const savedProducts = localStorage.getItem('products');
if (savedProducts) {
  products = JSON.parse(savedProducts);
}

const savedSelectedProducts = localStorage.getItem('selectedProducts');
if (savedSelectedProducts) {
  selectedProducts = JSON.parse(savedSelectedProducts);
}



//---------------------DISPLAY PRODUCTS----------------------//
function displayProducts(products) {
  productList.style.display = "flex";
  selectedList.style.display = "none";
  productList.innerHTML = ""; 
  products.forEach(product => {
    const img = document.createElement("img");
    const li = document.createElement("li");
    const fav = document.createElement("img");
    const buy = document.createElement("img");
    const del = document.createElement("img");

    img.src = product.image;
    img.width = 120;
    fav.src = product.favor;
    fav.width = 32;
    fav.height = 32;
    buy.src = product.buy;
    buy.width = 32;
    buy.height = 32;
    del.src = product.del;
    del.width = 32;
    del.height = 32;


    fav.addEventListener("click", () => {
      product.favorite = !product.favorite;
      product.favor = product.favorite ? "img/heart.svg" : "img/heart-outline.svg";
      fav.src = product.favor;
    });

    buy.addEventListener("click", () => {
      product.bought = !product.bought;
      product.buy = product.bought ? "img/checkmark-sharp.svg" : "img/cart-sharp.svg";
      buy.src = product.buy;   
    }); 

    li.innerHTML = `${product.name}: ${product.price} грн. <br>${product.desc}`;
    li.appendChild(img);
    li.appendChild(fav);
    li.appendChild(buy);
    li.appendChild(del);

    productList.appendChild(li);
    fav.addEventListener("click", () => {
    selectedProducts.push(product);
    });
    del.addEventListener("click", () => {
      li.remove();
      products.splice(products.indexOf(product), 1);
      localStorage.removeItem('products');
      localStorage.setItem('products', JSON.stringify(products));
      
      if (product.favorite) {
        selectedProducts.splice(selectedProducts.indexOf(product), 1);
        localStorage.removeItem('selectedProducts');
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
      }
    });
  });
  localStorage.setItem('products', JSON.stringify(products));
}


//---------------FAVORITE PRODUCTS---------------------//
function displaySelectedProducts(selectedProducts) {
  productList.style.display = "none";
  selectedList.style.display = "flex";
  selectedList.innerHTML = "";
  selectedProducts.forEach((product) => {
    const img = document.createElement("img");
    const li = document.createElement("li");
    const fav = document.createElement("img");
    const buy = document.createElement("img");

    img.src = product.image;
    img.width = 120;
    fav.src = product.favor;
    fav.width = 32;
    fav.height = 32;
    buy.src = product.buy;
    buy.width = 32;
    buy.height = 32;

    li.innerHTML = `${product.name}: ${product.price} грн. <br>${product.desc}`;
    li.appendChild(img);
    li.appendChild(fav);
    fav.src = "img/close-sharp.svg";
    li.appendChild(buy);
    selectedList.appendChild(li);
    fav.addEventListener("click", () => {
      product.favorite = !product.favorite;
      product.favor = product.favorite ? "img/heart.svg" : "img/heart-outline.svg";
      fav.src = product.favor;
      if (!product.favorite) {
        li.remove();
        selectedProducts.splice(selectedProducts.indexOf(product), 1);
        localStorage.removeItem('selectedProducts');
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
      }
    });

    buy.addEventListener("click", () => {
      product.bought = !product.bought;
      product.buy = product.bought ? "img/checkmark-sharp.svg" : "img/cart-sharp.svg";
      buy.src = product.buy;
    }); 
  });
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
}

//---------------------SIDEBAR BUTTONS---------------------//
const favPage = document.getElementById("listOfFavorites");
favPage.addEventListener("click", () => {
  displaySelectedProducts(selectedProducts);
});

const mainPage = document.getElementById("listOfItems");
mainPage.addEventListener("click", () => {
  displayProducts(products);
});

displayProducts(products);

const regButton = document.getElementById('newUser')
  const registr = document.getElementById('regForm');

  regButton.addEventListener('click', () => {
    modalBack.style.display = 'block';
    registr.style.display = 'block';
  });

  const entButton = document.getElementById('oldUser')
  const enter = document.getElementById('enterForm');

  entButton.addEventListener('click', () => {
    modalBack.style.display = 'block';
    enter.style.display = 'block';
  });

  //-----------------------------EXIT-----------------------//
const exitButton = document.getElementById('exit');

exitButton.addEventListener('click', () => {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  username.value = '';
  password.value = '';
  modalBack.style.display = 'none';
  enter.style.display = 'none';
});

//---------------------LOGIN AND SING UP-----------------------------//

const enteredUser = 'img/person-circle-outline.svg';
const enteredIcon = document.getElementById('oldIcon');
const exitUser = 'img/person.svg'
let userName = document.getElementById('enterText');
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');

function registerUser(username, password) {
  if (localStorage.getItem(username)) {
    alert('Користувач з таким іменем вже існує');
    return;
  }

  const user = {
    username: username,
    password: password
  };


  localStorage.setItem(username, JSON.stringify(user));

  alert('Користувач успішно зареєстрований');
  modalBack.style.display = 'none';
  registr.style.display = 'none';

  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

function loginUser(username, password) {
  const userData = localStorage.getItem(username);

  if (!userData) {
    alert('Користувач з таким іменем не знайдений');
    return;
  }

  const user = JSON.parse(userData);

  if (user.password !== password) {
    alert('Невірний пароль');
    return;
  }

  localStorage.setItem('loggedInUser', username);

  alert('Вхід виконаний успішно');
  modalBack.style.display = 'none';
  enter.style.display = 'none';
  userName.innerHTML = username;
  enteredIcon.src = enteredUser;
}

window.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (loggedInUser) {
    modalBack.style.display = 'none';
    enter.style.display = 'none';
    userName.innerHTML = loggedInUser;
    enteredIcon.src = enteredUser;
  }
});

registrationForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  registerUser(username, password);

  username.value = '';
  password.value = '';
});

loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  loginUser(username, password);
});

const logoutButton = document.getElementById('logoutButton');

exitButton.addEventListener('click', function() {
  localStorage.removeItem('loggedInUser'); 
  enteredIcon.src = exitUser;
  userName.innerHTML = 'Увійти в кабінет'; 
  loginForm.reset();
  registrationForm.reset(); 
});
//--------------------SEARCH------------------------------//
const searchInput = document.getElementById("search");
const nameOption = document.querySelector(".poisk__btn");

function searchProducts(text) {
  const filteredProducts = products.filter((product) => {
    const name = product.name.toLowerCase();
    return name.startsWith(text.toLowerCase());
  });
  displayProducts(filteredProducts);
}

nameOption.addEventListener("click", () => {
  const text = searchInput.value.trim().toLowerCase();
  searchProducts(text);
});

const searchBox = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

  const recognition = new webkitSpeechRecognition();

  recognition.continuous = false;
  recognition.lang = "uk-UA";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  searchBtn.addEventListener("click", () => {
    const searchTerm = searchBox.value;
    if (searchTerm.trim() !== "") {
      searchForProduct(searchTerm);
      searchProducts(searchTerm.trim().toLowerCase());
    }
  });

  recognition.onresult = (event) => {
    const searchTerm = event.results[0][0].transcript;
    searchBox.value = searchTerm;
    searchForProduct(searchTerm);
    searchProducts(searchTerm.trim().toLowerCase());
  }

  recognition.onerror = (event) => {
    console.error(`Помилка розпізнавання мови: ${event.error}`);
  }

  const searchForProduct = (searchTerm) => {
    console.log(`Пошук товару по запросу "${searchTerm}"`);
  }

  document.addEventListener("click", (event) => {
    if (event.target.matches("#search + button")) {
      recognition.start();
    }
  });


  //----------------------------ADD PRODUCTS----------------------//
  const addForm = document.getElementById('form');
  const tovarButton = document.getElementById('addTovar');
  const modalBack = document.getElementById('back');
  tovarButton.addEventListener('click', () => {
    addForm.style.display = 'block';
    modalBack.style.display = 'block';
  });

  const addButton = document.querySelector(".submit");
  addButton.addEventListener("click", addProduct);

  function addProduct() {
    const name = document.querySelector("#name").value;
    const price = document.querySelector("#price").value;
    const image = document.querySelector("#image").value;
    const desc = document.querySelector("#desc").value;
    const newProduct = { name, price, image, desc, favor: "img/heart-outline.svg", buy: "img/cart-sharp.svg", del: "img/trash-outline.svg" };
    products.push(newProduct);
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('image').value = '';
    document.getElementById('desc').value = '';
    displayProducts(products);
    addForm.style.display = 'none';
    modalBack.style.display = 'none';
  }

  const closeButton = document.querySelectorAll('.close');
  closeButton.forEach(function(item) {
    item.addEventListener('click', () => {
      document.getElementById('name').value = '';
      document.getElementById('price').value = '';
      document.getElementById('image').value = '';
      document.getElementById('desc').value = '';
      addForm.style.display = 'none';
      modalBack.style.display = 'none';
      registr.style.display = 'none';
      enter.style.display = 'none';
      modal.style.display = 'none';
  });
});

//-----------------BUY TOVAR--------------------//

const myBtn = document.getElementById("myBtn");

myBtn.addEventListener("click", () => {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  modal.style.display = "block";

  const content = document.createElement("div");
  content.classList.add("modal-content");
  content.style.width = "25%";

  const selectedProduct = products.find(product => product.bought);

  if (selectedProduct) {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const imageElement = document.createElement("img");
    imageElement.src = selectedProduct.image;
    imageElement.alt = selectedProduct.name;
    imageElement.width = 200;
    productElement.appendChild(imageElement);

    const nameElement = document.createElement("p");
    nameElement.textContent = selectedProduct.name;
    productElement.appendChild(nameElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = `Ціна: ${selectedProduct.price} грн`;
    productElement.appendChild(priceElement);

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Купити товар";
    addToCartButton.addEventListener("click", () => {
      selectedProduct.bought = true;
      addToCartButton.textContent = "Товар куплено";
      addToCartButton.disabled = true;
      alert("Ви успішно купили товар!");
    });
    productElement.appendChild(addToCartButton);


    content.appendChild(productElement);
  }

  modal.appendChild(content);

  document.body.appendChild(modal);

});
