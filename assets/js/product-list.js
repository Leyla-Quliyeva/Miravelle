document.addEventListener("DOMContentLoaded", function () {
  console.log("Basket səhifəsi yükləndi");

  // Məhsul məlumatları - SİZİN İSTƏDİYİNİZ KİMİ
  const products = [
    {
      id: 1,
      name: "Gel Nail Polish",
      price: 150.0,
      image: "/assets/images/post4.jpg",
      description: "Uzun müddətli, parlaq gel dırnaq lakı",
    },
    {
      id: 2,
      name: "Blue Nail Paint",
      price: 190.0,
      image: "/assets/images/post3.jpg",
      description: "Canlı göy rəngli dırnaq boyası",
    },
    {
      id: 3,
      name: "Yellow Polish",
      price: 260.0,
      image: "/assets/images/post1.jpg",
      description: "Parlaq sarı dırnaq lakı",
    },
    {
      id: 4,
      name: "Pink Nail Polish",
      price: 210.0,
      image: "/assets/images/item-7.jpg",
      description: "Romantik çəhrayı dırnaq lakı",
    },
    {
      id: 5,
      name: "Natural Nude Polish",
      price: 240.0,
      image: "/assets/images/post7.jpg",
      description: "Təbii nude rəngli dırnaq lakı",
    },
    {
      id: 1,
      name: "Gel Nail Polish",
      price: 150.0,
      image: "/assets/images/post4.jpg",
      description: "Uzun müddətli, parlaq gel dırnaq lakı",
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

  // Ümumi qiyməti hesabla və göstər
  function updateTotalPrice() {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalElement = document.querySelector(".total");
    if (totalElement) {
      totalElement.textContent = `$${total.toFixed(2)}`;
    }
    console.log("Ümumi qiymət:", total);
    return total;
  }

  // Səbət cədvəlini göstər
  function displayCartTable() {
    const tbody = document.querySelector("tbody.padding-tr");
    if (!tbody) {
      console.error("Cədvəl tbody tapılmadı!");
      return;
    }

    console.log("Səbət göstərilir, məhsul sayı:", cart.length);

    if (cart.length === 0) {
      tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-5">
                        <div class="empty-cart-message">
                            <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                            <h4 class="font-cormorant">Your basket is empty</h4>
                            <p class="text-muted font-jost">Add some products to your basket</p>
                            <a href="product-list.html" class="btn btn-dark mt-3">
                                <i class="fas fa-shopping-bag"></i> Continue Shopping
                            </a>
                        </div>
                    </td>
                </tr>
            `;
      updateTotalPrice();
      return;
    }

    let cartHTML = "";

    cart.forEach((item) => {
      const subtotal = item.price * item.quantity;
      // Şəkil yolunu yoxla
      const imagePath = item.image || "/assets/images/default-product.jpg";

      cartHTML += `
                <tr data-id="${item.id}">
                    <td>
                        <img src="${imagePath}" alt="${item.name}" 
                             style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;"
                             onerror="this.src='/assets/images/default-product.jpg'">
                    </td>
                    <td class="product-title font-cormorant">${item.name}</td>
                    <td class="product-price font-cinzel">$${item.price.toFixed(
                      2
                    )}</td>
                    <td class="subtotal font-cinzel fw-bold">$${subtotal.toFixed(
                      2
                    )}</td>
                    <td>
                        <div class="quantity-controls d-flex align-items-center gap-2">
                            <button class="btn btn-sm btn-outline-secondary decrease-quantity" data-id="${
                              item.id
                            }">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity font-cormorant fw-bold">${
                              item.quantity
                            }</span>
                            <button class="btn btn-sm btn-outline-secondary increase-quantity" data-id="${
                              item.id
                            }">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-danger remove-item" data-id="${
                          item.id
                        }">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                </tr>
            `;
    });

    tbody.innerHTML = cartHTML;

    // Event listener-ları əlavə et
    addEventListeners();

    updateTotalPrice();
  }

  // Event listener-ları əlavə et
  function addEventListeners() {
    // Decrease buttons
    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        console.log("Decrease button clicked:", productId);
        updateQuantity(productId, -1);
      });
    });

    // Increase buttons
    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        console.log("Increase button clicked:", productId);
        updateQuantity(productId, 1);
      });
    });

    // Remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        console.log("Remove button clicked:", productId);
        removeFromCart(productId);
      });
    });
  }

  // Update quantity
  function updateQuantity(productId, change) {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      console.log("Old quantity:", item.quantity);
      item.quantity += change;
      console.log("New quantity:", item.quantity);

      if (item.quantity <= 0) {
        if (confirm("Remove this item from basket?")) {
          cart = cart.filter((item) => item.id !== productId);
          showNotification(`"${item.name}" removed from basket!`, "danger");
        } else {
          item.quantity = 1;
        }
      } else {
        showNotification(
          `Quantity updated: ${item.name} x${item.quantity}`,
          "success"
        );
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      displayCartTable();
    }
  }

  // Remove from cart
  function removeFromCart(productId) {
    const item = cart.find((item) => item.id === productId);
    if (item && confirm(`Remove "${item.name}" from your basket?`)) {
      cart = cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      displayCartTable();
      showNotification(`"${item.name}" removed from basket!`, "danger");
    }
  }

  // Show notification
  function showNotification(message, type = "success") {
    console.log("Notification:", message);

    // Remove old notifications
    const oldNotifications = document.querySelectorAll(".custom-notification");
    oldNotifications.forEach((notification) => notification.remove());

    const notification = document.createElement("div");
    notification.className = `custom-notification alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 1050;
            min-width: 300px;
            animation: slideIn 0.3s ease;
        `;

    const icon =
      type === "success" ? "fa-check-circle" : "fa-exclamation-circle";
    notification.innerHTML = `
            <i class="fas ${icon} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 3000);
  }

  // Clear cart
  function clearCart() {
    if (cart.length === 0) {
      showNotification("Your basket is already empty!", "warning");
      return;
    }

    if (confirm("Clear your entire basket?")) {
      cart = [];
      localStorage.removeItem("cart");
      updateCartCount();
      displayCartTable();
      addActionButtons();
      showNotification("Basket cleared!", "success");
    }
  }

  // Checkout
  function checkout() {
    if (cart.length === 0) {
      showNotification("Your basket is empty! Add products first.", "warning");
      return;
    }

    const total = updateTotalPrice();
    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} x${item.quantity} - $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    if (
      confirm(
        `Confirm order?\n\n${orderDetails}\n\nTotal: $${total.toFixed(2)}`
      )
    ) {
      showNotification(
        "Order confirmed! Thank you for your purchase.",
        "success"
      );

      // Clear cart after order
      cart = [];
      localStorage.removeItem("cart");
      updateCartCount();
      displayCartTable();
      addActionButtons();
    }
  }

  // Add action buttons
  function addActionButtons() {
    const container = document.querySelector("#basket .container");
    if (!container) {
      console.error("Container not found!");
      return;
    }

    // Remove old buttons
    const oldButtons = container.querySelector(".cart-actions");
    if (oldButtons) oldButtons.remove();

    if (cart.length > 0) {
      const actionsDiv = document.createElement("div");
      actionsDiv.className =
        "cart-actions d-flex justify-content-end gap-3 mt-4";
      actionsDiv.innerHTML = `
                <button class="btn btn-outline-danger" id="clear-cart-btn">
                    <i class="fas fa-trash"></i> Clear Basket
                </button>
                <button class="btn btn-dark" id="checkout-btn">
                    <i class="fas fa-credit-card"></i> Checkout
                </button>
            `;

      const basketDiv = container.querySelector(".basket");
      if (basketDiv) {
        basketDiv.parentNode.insertBefore(actionsDiv, basketDiv.nextSibling);
      }

      // Event listeners
      document
        .getElementById("clear-cart-btn")
        ?.addEventListener("click", clearCart);
      document
        .getElementById("checkout-btn")
        ?.addEventListener("click", checkout);
    }
  }

  // Initialize page
  function init() {
    console.log("Basket page initialized");
    updateCartCount();
    displayCartTable();
    addActionButtons();

    // Add animation CSS
    addAnimations();

    // For testing - add sample product if cart is empty
    if (cart.length === 0 && false) {
      // Set to true for testing
      console.log("Adding test product...");
      cart.push({
        id: 1,
        name: "Gel Nail Polish",
        price: 150.0,
        image: "/assets/images/post4.jpg",
        quantity: 2,
      });
      cart.push({
        id: 3,
        name: "Yellow Polish",
        price: 260.0,
        image: "/assets/images/post1.jpg",
        quantity: 1,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      displayCartTable();
      addActionButtons();
    }
  }

  // Add CSS animations
  function addAnimations() {
    const style = document.createElement("style");
    style.textContent = `
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
            
            .empty-cart-message {
                padding: 40px 0;
            }
            
            .quantity-controls button {
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 5px !important;
            }
            
            .quantity {
                min-width: 40px;
                text-align: center;
                font-size: 1.1rem;
            }
            
            tbody tr {
                transition: all 0.3s ease;
                animation: fadeIn 0.5s ease;
            }
            
            tbody tr:hover {
                background-color: rgba(212, 165, 116, 0.05) !important;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .product-title {
                color: #333;
                font-weight: 600;
            }
            
            .product-price {
                color: #666;
            }
            
            .subtotal {
                color: #d4a574;
            }
            
            /* Make images responsive */
            table img {
                max-width: 100%;
                height: auto;
            }
        `;
    document.head.appendChild(style);
  }

  // Start
  init();
});
