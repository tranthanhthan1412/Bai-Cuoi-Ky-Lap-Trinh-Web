const fs = require("fs");

const files = fs.readdirSync(".").filter((f) => f.endsWith(".html"));

const template = `<nav class="navbar navbar-expand-lg premium-nav">
      <div class="container">
        <!-- LEFT: LOGO -->
        <a class="navbar-brand" href="index.html">
          <i class="bi bi-laptop"></i> LaptopX
        </a>

        <!-- BUTTON MOBILE -->
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- CENTER + RIGHT -->
        <div class="collapse navbar-collapse" id="menu">
          <!-- CENTER: MENU -->
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <a class="nav-link" href="index.html">Trang chủ</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="products.html">Sản phẩm</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="about.html">Giới thiệu</a>
            </li>
            
          <!-- RIGHT: ACTIONS -->
          <div class="header-actions">
            <a href="tel:999999999" class="nav-phone d-none d-lg-flex">
              <i class="bi bi-telephone-fill"></i> 999999999
            </a>

            <button onclick="handleLogin()" class="btn-login">
              <i class="bi bi-person-fill"></i> Đăng nhập
            </button>

            <a href="cart.html" class="btn-cart">
              <i class="bi bi-cart3"></i>
              <span id="cart-count" class="badge">0</span>
            </a>
          </div>
        </div>
      </div>
    </nav>`;

files.forEach((f) => {
  let content = fs.readFileSync(f, "utf8");
  let newContent = content.replace(
    /<nav class="navbar[^>]*>([\s\S]*?)<\/nav>/,
    template,
  );

  if (f === "index.html") {
    newContent = newContent.replace(
      'class="nav-link" href="index.html"',
      'class="nav-link active" href="index.html"',
    );
  } else if (f === "products.html" || f === "product-details.html") {
    newContent = newContent.replace(
      'class="nav-link" href="products.html"',
      'class="nav-link active" href="products.html"',
    );
  }

  if (content !== newContent) {
    fs.writeFileSync(f, newContent);
    console.log("Updated " + f);
  }
});
