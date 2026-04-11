// ================== DANH SÁCH SẢN PHẨM ==================
const products = [
  {
    id: 1,
    name: "MacBook Air M2",
    price: 25000000,
    image: "image/mac-air-m2-13-xanh-new-1-650x650.png",
    brand: "apple",
    category: "office",
  },
  {
    id: 2,
    name: "Lenovo Legion 5 Pro",
    price: 39000000,
    image: "image/lenovo legion.png",
    brand: "lenovo",
    category: "gaming",
  },
  {
    id: 3,
    name: "Asus ROG",
    price: 30000000,
    image: "image/asusrog.png",
    brand: "asus",
    category: "gaming",
  },
  {
    id: 4,
    name: "Predator Helios 300",
    price: 27000000,
    image: "image/predatorneo14.png",
    brand: "acer",
    category: "gaming",
  },
  {
    id: 5,
    name: "MSI Katana GF66",
    price: 26000000,
    image: "image/msikatata.png",
    brand: "msi",
    category: "gaming",
  },
  {
    id: 6,
    name: "Acer Nitro 5",
    price: 18000000,
    image: "image/acernitro5.png",
    brand: "acer",
    category: "gaming",
  },
  {
    id: 7,
    name: "Asus Vivobook 15",
    price: 21000000,
    image: "image/asusvivobook.png",
    brand: "asus",
    category: "office",
  },
  {
    id: 8,
    name: "Lenovo IdeaPad 3",
    price: 23000000,
    image: "image/ideapad3.png",
    brand: "lenovo",
    category: "office",
  },
  {
    id: 9,
    name: "MacBook Neo 13",
    price: 14000000,
    image: "image/macbookneo13.png",
    brand: "apple",
    category: "office",
  },
  {
    id: 10,
    name: "Alienware m18",
    price: 42000000,
    image: "image/alienware18.png",
    brand: "acer",
    category: "gaming",
  },
  {
    id: 11,
    name: "MSI Prestige 14",
    price: 35000000,
    image: "image/msipre14.png",
    brand: "msi",
    category: "office",
  },
  {
    id: 12,
    name: "Asus Zephyus G14",
    price: 31000000,
    image: "image/asuszephyrus.png",
    brand: "asus",
    category: "gaming",
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
let currentCategory = "";
let currentKeyword = "";
let sortAsc = true;

// ===== RESET FILTER (QUAN TRỌNG) =====
function resetFilters() {
  const params = new URLSearchParams(window.location.search);
  currentBrand = params.get("brand") || "";
  currentCategory = params.get("category") || "";
  currentKeyword = "";
  sortAsc = true;

  // Cập nhật ô Search nếu có
  let searchInput = document.getElementById("search");
  if (searchInput) searchInput.value = "";

  // Cập nhật Dropdown Hãng nếu có
  let brandSelect = document.querySelector("select.form-select");
  if (brandSelect) brandSelect.value = currentBrand;

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

  if (currentCategory) {
    if (currentCategory === "premium") {
      result = result.filter((p) => p.price > 30000000);
    } else {
      result = result.filter((p) => p.category === currentCategory);
    }
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
  renderProducts(); // Trang chủ (carousel)
  renderCategories(); // 3 danh mục sản phẩm (mới)
  updateCartCount();

  // Kiểm tra URL xem có search query không (?search=...)
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search");

  // Nếu là trang products (danh sách)
  if (document.getElementById("product-list")) {
    resetFilters();

    // Nếu có query từ URL (vẫn giữ logic này cho các trang sản phẩm)
    if (searchQuery) {
      currentKeyword = searchQuery.toLowerCase();
      const pageInput = document.getElementById("search");
      if (pageInput) pageInput.value = searchQuery;

      applyFilters();
    }
  }

  // Nếu là trang cart (giỏ hàng)
  if (document.getElementById("cart-list")) {
    renderCart();
  }

  // Scroll event for scroll to top button
  window.onscroll = function() {
    let btn = document.querySelector(".scroll-top-btn");
    if (btn) {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    }
  };
});

// ... (existing categories, utils logic, etc. stay the same)

// ================== UTILS ==================
function goBack() {
  window.history.back();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ================== CATEGORIES (HOME PAGE) ==================
function renderCategories() {
  const categories = [
    { id: "hoc-tap-van-phong", type: "office" },
    { id: "gaming", type: "gaming" },
    { id: "cao-cap", type: "premium" },
  ];

  categories.forEach((cat) => {
    let section = document.getElementById(cat.id);
    if (section) {
      let container = section.querySelector(".product-container");
      if (container) {
        let list = [];
        if (cat.type === "premium") {
          list = products.filter((p) => p.price > 30000000).slice(0, 4);
        } else {
          list = products.filter((p) => p.category === cat.type).slice(0, 4);
        }

        let html = "";
        list.forEach((p) => {
          html += `
            <div class="col-md-3">
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
        container.innerHTML = html;
      }
    }
  });
}



