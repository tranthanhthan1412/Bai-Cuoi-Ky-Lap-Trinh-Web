// ================== DANH SÁCH SẢN PHẨM ==================
const products = [
  {
    id: 1,
    name: "MacBook Air M2",
    price: 25000000,
    image: "../image/mac-air-m2-13-xanh-new-1-650x650.png",
    brand: "apple",
  },
  {
    id: 2,
    name: "Lenovo Legion 5 Pro",
    price: 39000000,
    image: "../image/lenovo legion.png",
    brand: "lenovo",
  },
  {
    id: 3,
    name: "Asus ROG",
    price: 30000000,
    image: "../image/asusrog.png",
    brand: "asus",
  },
  {
    id: 4,
    name: "Predator Helios 300",
    price: 27000000,
    image: "../image/predatorneo14.png",
    brand: "acer",
  },
  {
    id: 5,
    name: "MSI Katana GF66",
    price: 26000000,
    image: "../image/msikatata.png",
    brand: "msi",
  },
  {
    id: 6,
    name: "Acer Nitro 5",
    price: 18000000,
    image: "../image/acernitro5.png",
    brand: "acer",
  },
  {
    id: 7,
    name: "Asus Vivobook 15",
    price: 21000000,
    image: "../image/asusvivobook.png",
    brand: "asus",
  },
  {
    id: 8,
    name: "Lenovo IdeaPad 3",
    price: 23000000,
    image: "../image/ideapad3.png",
    brand: "lenovo",
  },
  {
    id: 9,
    name: "MacBook Neo 13",
    price: 14000000,
    image: "../image/macbookneo13.png",
    brand: "apple",
  },
  {
    id: 10,
    name: "Alienware m18",
    price: 42000000,
    image: "../image/alienware18.png",
    brand: "acer",
  },
  {
    id: 11,
    name: "MSI Prestige 14",
    price: 35000000,
    image: "../image/msipre14.png",
    brand: "msi",
  },
  {
    id: 12,
    name: "Asus Zephyus G14",
    price: 31000000,
    image: "../image/asuszephyrus.png",
    brand: "asus",
  },
];

// ================== GIỎ HÀNG ==================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== THÊM VÀO GIỎ =====
function addToCart(id) {
  let product = products.find((p) => p.id === id);
  let item = cart.find((p) => p.id === id);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Đã thêm vào giỏ!");
}

// ===== CART COUNT =====
function updateCartCount() {
  let el = document.getElementById("cart-count");
  let total = cart.reduce((sum, item) => sum + item.qty, 0);
  if (el) el.innerText = total;
}

// ================== TRANG CHỦ ==================
function renderProducts() {
  let html = "";

  // 🔥 chỉ lấy 6 sản phẩm đầu làm nổi bật
  let featured = products.slice(0, 6);

  for (let i = 0; i < featured.length; i += 3) {
    let group = featured.slice(i, i + 3);

    html += `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="row">
    `;

    group.forEach((p) => {
      html += `
        <div class="col-md-4">
          <div class="card-wrapper mb-4">
            <div class="card shadow-sm">
              <div class="card-img-wrapper">
                <img src="${p.image}">
                <div class="card-overlay">
                  <a href="product-details.html?id=${p.id}" class="btn-view">
                    <i class="bi bi-eye"></i> Xem chi tiết
                  </a>
                </div>
              </div>
              <div class="card-body text-center">
                <h5>${p.name}</h5>
                <p class="text-primary fw-bold small mb-1">New 100%</p>
                <p>${p.price.toLocaleString()}đ</p>
                <button onclick="addToCart(${p.id})" class="btn btn-primary btn-sm">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div></div>`;
  }

  let container = document.getElementById("carousel-inner");
  if (container) container.innerHTML = html;
}

// ================== GIỎ HÀNG ==================
function renderCart() {
  let html = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    html += `
      <div class="cart-item">
        <img src="${item.image}">

        <div>
          <h6>${item.name}</h6>
          <p>${item.price.toLocaleString()}đ</p>
        </div>

        <div>
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button onclick="removeItem(${index})" class="btn btn-danger">
          Xóa
        </button>
      </div>
    `;
  });

  document.getElementById("cart-list").innerHTML = html;
  document.getElementById("total").innerText = total.toLocaleString();
  updateCartCount();
}

function changeQty(index, value) {
  cart[index].qty += value;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// ================== PRODUCTS PAGE ==================

// trạng thái
let currentBrand = "";
let currentKeyword = "";
let sortAsc = true;

// ===== RESET FILTER (QUAN TRỌNG) =====
function resetFilters() {
  currentBrand = "";
  currentKeyword = "";
  sortAsc = true;

  let searchInput = document.getElementById("search");
  if (searchInput) searchInput.value = "";

  applyFilters();
}

// ===== RENDER LIST =====
function renderProductsList(list) {
  let html = "";

  list.forEach((p) => {
    html += `
      <div class="col-md-3">
        <div class="card-wrapper mb-4">
          <div class="card">
            <div class="card-img-wrapper">
              <img src="${p.image}">
              <div class="card-overlay">
                <a href="product-details.html?id=${p.id}" class="btn-view">
                  <i class="bi bi-eye"></i> Xem chi tiết
                </a>
              </div>
            </div>
            <div class="card-body text-center">
              <h5>${p.name}</h5>
              <p class="text-primary fw-bold small mb-1">New 100%</p>
              <p>${p.price.toLocaleString()}đ</p>
              <button onclick="addToCart(${p.id})" class="btn btn-primary btn-sm">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("product-list").innerHTML = html;
}

// ===== FILTER CORE =====
function applyFilters() {
  let result = [...products];

  if (currentBrand) {
    result = result.filter((p) => p.brand === currentBrand);
  }

  if (currentKeyword) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(currentKeyword),
    );
  }

  result.sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));

  renderProductsList(result);
}

// ===== SEARCH =====
function searchProduct() {
  currentKeyword = document.getElementById("search").value.toLowerCase();

  applyFilters();
}

// ===== FILTER BRAND =====
function filterBrand(brand) {
  currentBrand = brand;
  applyFilters();
}

// ===== SHOW ALL =====
function showAll() {
  currentBrand = "";
  applyFilters();
}

// ===== SORT =====
function sortPrice() {
  sortAsc = !sortAsc;

  const btn = document.getElementById("sort-btn");

  btn.innerText = sortAsc ? "Giá thấp → cao" : "Giá cao → thấp";

  applyFilters();
}

// ================== INIT ==================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(); // trang chủ
  updateCartCount();

  // nếu là trang products → reset filter
  if (document.getElementById("product-list")) {
    resetFilters();
  }

  // nếu là trang cart → render cart
  if (document.getElementById("cart-list")) {
    renderCart();
  }
});

// ================== CAC LOAI LAPTOP ==================
function renderCategories() {
  // Lọc sản phẩm theo tiêu chí (ví dụ brand hoặc giá)
  const officeLaptops = products
    .filter((p) => ["asus", "apple", "lenovo"].includes(p.brand))
    .slice(0, 4);
  const gamingLaptops = products
    .filter((p) => ["acer", "msi"].includes(p.brand))
    .slice(0, 4);
  const premiumLaptops = products.filter((p) => p.price > 30000000).slice(0, 4);

  // Hàm tạo HTML cho card giống hình mẫu
  const createCard = (p) => `
    <div class="col-6 col-md-3">
      <div class="card-wrapper">
        <div class="card h-100 border-0 shadow-sm p-2">
          <div class="card-img-wrapper">
            <img src="${p.image}" class="card-img-top p-3" style="height:160px; object-fit:contain">
            <div class="card-overlay">
              <a href="product-details.html?id=${p.id}" class="btn-view">
                <i class="bi bi-eye"></i> Xem chi tiết
              </a>
            </div>
          </div>
          <div class="card-body p-2 text-center">
            <h6 class="card-title fw-normal small mb-2" style="height: 40px; overflow: hidden;">${p.name}</h6>
            <p class="text-primary fw-bold mb-1 small">New 100%</p>
            <h6 class="text-danger fw-bold">${p.price.toLocaleString()}đ</h6>
            <button onclick="addToCart(${p.id})" class="btn btn-sm btn-outline-primary w-100 mt-2">Thêm vào giỏ</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Đổ dữ liệu vào HTML (null-check để tránh crash trên trang khác)
  const officeEl = document.querySelector("#hoc-tap-van-phong .product-container");
  if (officeEl) officeEl.innerHTML = officeLaptops.map(createCard).join("");

  const gamingEl = document.querySelector("#gaming .product-container");
  if (gamingEl) gamingEl.innerHTML = gamingLaptops.map(createCard).join("");

  const premiumEl = document.querySelector("#cao-cap .product-container");
  if (premiumEl) premiumEl.innerHTML = premiumLaptops.map(createCard).join("");
}

// Gọi hàm này trong DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(); // Cho carousel
  renderCategories(); // Cho 3 danh mục mới
  updateCartCount();
});
