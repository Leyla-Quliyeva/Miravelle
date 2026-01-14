document.addEventListener("DOMContentLoaded", function () {
  console.log("Məhsul səhifəsi yükləndi");

  // Məhsul məlumatları
  const products = [
    {
      id: 1,
      name: "Gel Nail Polish",
      price: 150.0,
      image: "/assets/images/post4.jpg",
      description: "Long-lasting, shiny gel nail polish with vibrant color",
    },
    {
      id: 2,
      name: "Blue Nail Paint",
      price: 190.0,
      image: "/assets/images/post3.jpg",
      description: "Vibrant blue nail paint with smooth application",
    },
    {
      id: 3,
      name: "Yellow Polish",
      price: 260.0,
      image: "/assets/images/post1.jpg",
      description: "Bright yellow nail polish for a sunny look",
    },
    {
      id: 4,
      name: "Pink Nail Polish",
      price: 210.0,
      image: "/assets/images/item-7.jpg",
      description: "Beautiful pink nail polish for elegant style",
    },
    {
      id: 5,
      name: "Natural Nude Polish",
      price: 240.0,
      image: "/assets/images/post7.jpg",
      description: "Natural nude color polish for everyday wear",
    },
    {
      id: 1,
      name: "Gel Nail Polish",
      price: 150.0,
      image: "/assets/images/post4.jpg",
      description: "Long-lasting, shiny gel nail polish with vibrant color",
    },
  ];

  console.log("Məhsullar yükləndi:", products);

  // Səbət məlumatları
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cari səbət:", cart);

  // Səbət sayını yenilə
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log("Səbətdəki məhsul sayı:", totalItems);

    document.querySelectorAll(".basket-count").forEach((element) => {
      element.textContent = totalItems;
    });
    return totalItems;
  }

  // Məhsulları göstər
  function displayProducts() {
    const productsContainer = document.querySelector(".products");
    if (!productsContainer) {
      console.error("Məhsul konteyneri tapılmadı!");
      return;
    }

    console.log("Məhsullar göstərilir...");

    let productsHTML = "";

    products.forEach((product) => {
      productsHTML += `
                <div class="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
                    <div class="card product-card" style="width: 18rem;">
                        <img src="${product.image}" 
                             class="card-img-top product-image" 
                             alt="${product.name}"
                             onerror="this.src='/assets/images/default-product.jpg'">
                        <div class="card-body">
                            <h5 class="card-title font-cormorant">${
                              product.name
                            }</h5>
                            <p class="card-text font-jost text-muted">${
                              product.description
                            }</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="price font-cormorant fw-bold">$${product.price.toFixed(
                                  2
                                )}</span>
                                <button class="btn btn-outline-dark add-to-cart" data-id="${
                                  product.id
                                }">
                                    <i class="fas fa-cart-plus"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });

    productsContainer.innerHTML = productsHTML;

    // Add to cart düymələrinə event listener əlavə et
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        console.log("Add to cart düyməsi basıldı:", productId);
        addToCart(productId);
      });
    });
  }

  // Səbətə əlavə et
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      console.error("Məhsul tapılmadı:", productId);
      return;
    }

    console.log("Səbətə əlavə edilir:", product.name);

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
      console.log("Miqdar artırıldı:", existingItem.quantity);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      console.log("Yeni məhsul əlavə edildi:", product.name);
    }

    // LocalStorage-a yadda saxla
    localStorage.setItem("cart", JSON.stringify(cart));

    // Səbət sayını yenilə
    updateCartCount();

    // Bildiriş göstər
    showNotification(`${product.name} added to cart!`, "success");

    // Button animasiyası
    animateCartButton(productId);
  }

  // Bildiriş göstər
  function showNotification(message, type = "success") {
    console.log("Bildiriş:", message);

    // Köhnə bildirişləri sil
    const oldNotifications = document.querySelectorAll(".product-notification");
    oldNotifications.forEach((notification) => notification.remove());

    const notification = document.createElement("div");
    notification.className = `product-notification alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 1050;
            min-width: 300px;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

    const icon =
      type === "success" ? "fa-check-circle" : "fa-exclamation-circle";
    notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas ${icon} me-3 fs-4"></i>
                <div>
                    <strong>${message}</strong>
                    <div class="text-muted small mt-1">Go to <a href="basket.html" class="alert-link">Basket</a> to view items</div>
                </div>
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `;

    document.body.appendChild(notification);

    // 4 saniyədən sonra sil
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 4000);
  }

  // Səbət düyməsinə animasiya əlavə et
  function animateCartButton(productId) {
    const button = document.querySelector(
      `.add-to-cart[data-id="${productId}"]`
    );
    if (button) {
      // Original mətn və ikonu saxla
      const originalHTML = button.innerHTML;

      // Dəyişiklik et
      button.innerHTML = '<i class="fas fa-check"></i> Added!';
      button.classList.remove("btn-outline-dark");
      button.classList.add("btn-success");
      button.disabled = true;

      // 1.5 saniyə sonra geri qaytar
      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove("btn-success");
        button.classList.add("btn-outline-dark");
        button.disabled = false;
      }, 1500);
    }
  }

  // Sayta keçid funksiyaları
  function setupNavigation() {
    // Basket link-inə klik edəndə
    const basketLinks = document.querySelectorAll('a[href*="basket"]');
    basketLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "basket.html";
      });
    });

    // Product Lists link-inə klik edəndə
    const productLinks = document.querySelectorAll('a[href*="product.html"]');
    productLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "product-list.html";
      });
    });
  }

  // Səbəti təmizlə düyməsi
  function addClearCartButton() {
    const bannerTwo = document.querySelector("#banner-two .container");
    if (!bannerTwo) return;

    const existingButton = document.getElementById("clear-cart-global");
    if (existingButton) existingButton.remove();

    if (cart.length > 0) {
      const clearButton = document.createElement("button");
      clearButton.id = "clear-cart-global";
      clearButton.className = "btn btn-outline-danger btn-sm ms-3";
      clearButton.innerHTML = '<i class="fas fa-trash"></i> Clear Cart';
      clearButton.addEventListener("click", function () {
        if (confirm("Clear all items from cart?")) {
          cart = [];
          localStorage.removeItem("cart");
          updateCartCount();
          showNotification("Cart cleared successfully!", "info");
          this.remove();
        }
      });

      const nav = document.querySelector(".product ul");
      if (nav) {
        nav.appendChild(document.createElement("li")).appendChild(clearButton);
      }
    }
  }

  // Səhifəni başlat
  function init() {
    console.log("Məhsul səhifəsi başladıldı");

    // Məhsulları göstər
    displayProducts();

    // Səbət sayını yenilə
    updateCartCount();

    // Navigasiya quraşdır
    setupNavigation();

    // Təmizlə düyməsini əlavə et
    addClearCartButton();

    // CSS animasiyaları əlavə et
    addProductPageStyles();

    // Səbətdəki ümumi məbləği hesabla və göstər
    showCartTotal();
  }

  // Səbətdəki ümumi məbləği göstər
  function showCartTotal() {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (total > 0) {
      const nav = document.querySelector(".product ul");
      if (nav) {
        let totalElement = document.getElementById("cart-total-price");
        if (!totalElement) {
          totalElement = document.createElement("li");
          totalElement.id = "cart-total-price";
          totalElement.className = "font-cormorant fw-bold text-success";
          nav.appendChild(totalElement);
        }
        totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
      }
    }
  }

  // CSS animasiyaları əlavə et
  function addProductPageStyles() {
    const style = document.createElement("style");
    style.textContent = `
            /* Animasiyalar */
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            /* Məhsul kartları */
            .product-card {
                transition: all 0.3s ease;
                border: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                overflow: hidden;
                border-radius: 12px;
            }
            
            .product-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 12px 24px rgba(0,0,0,0.15);
            }
            
            .product-card .card-img-top {
                height: 220px;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            
            .product-card:hover .card-img-top {
                transform: scale(1.05);
            }
            
            .product-card .card-body {
                padding: 1.5rem;
            }
            
            .product-card .card-title {
                font-size: 1.3rem;
                color: #333;
                margin-bottom: 0.8rem;
                min-height: 3.2rem;
            }
            
            .product-card .card-text {
                font-size: 0.95rem;
                color: #666;
                margin-bottom: 1.2rem;
                min-height: 4rem;
            }
            
            .product-card .price {
                font-size: 1.4rem;
                color: #d4a574;
            }
            
            .product-card .btn-outline-dark {
                border: 2px solid #333;
                padding: 0.5rem 1.2rem;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .product-card .btn-outline-dark:hover {
                background-color: #333;
                color: white;
                transform: translateY(-2px);
            }
            
            .product-card .btn-success {
                animation: pulse 0.5s ease;
            }
            
            /* Səbət sayı */
            .basket-count {
                font-weight: bold;
                animation: bounce 0.5s ease;
            }
            
            /* Bildiriş */
            .product-notification {
                border-radius: 10px;
                border: none;
            }
            
            .alert-success {
                background: linear-gradient(135deg, #d4edda, #c3e6cb);
                border-color: #b1dfbb;
                color: #155724;
            }
            
            /* Responsive dizayn */
            @media (max-width: 768px) {
                .product-card {
                    width: 100% !important;
                    max-width: 300px;
                }
                
                .product-card .card-title {
                    font-size: 1.2rem;
                }
                
                .product-card .price {
                    font-size: 1.3rem;
                }
            }
            
            /* Loading animasiyası */
            .product-card {
                animation: fadeIn 0.6s ease;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
    document.head.appendChild(style);
  }

  // Başlat
  init();
});
