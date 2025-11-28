document.addEventListener("DOMContentLoaded", function () {
    const cartTableBody = document.querySelector("#cart-table tbody");
    const totalElement = document.querySelector("#total");
    const checkoutButton = document.querySelector("#checkout");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartTableBody.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${item.img}" width="80"> ${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="qty-container">
                        <button class="qty-btn decrease" data-index="${index}">−</button>
                        <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input">
                        <button class="qty-btn increase" data-index="${index}">+</button>
                    </div>
                </td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>
                    <button class="remove-btn" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            cartTableBody.appendChild(row);
        });

        totalElement.textContent = `$${total.toFixed(2)}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Handle quantity input changes
    cartTableBody.addEventListener("input", (e) => {
        if (e.target.classList.contains("qty-input")) {
            const index = e.target.dataset.index;
            let value = parseInt(e.target.value);
            cart[index].quantity = Math.max(1, isNaN(value) ? 1 : value);
            renderCart();
        }
    });
            //Quantity 
            cartTableBody.addEventListener("click", (e) => {
                // Find the closest button to the clicked element
                const clickedButton = e.target.closest("button"); 
                
                // Exit if no button was clicked
                if (!clickedButton) return; 

                // Get the index from the button's data attribute
                const index = clickedButton.dataset.index;

                // Check if it's an increase button
                if (clickedButton.classList.contains("increase")) {
                    cart[index].quantity++;
                    renderCart();
                }
                // Check if it's a decrease button
                else if (clickedButton.classList.contains("decrease")) {
                    cart[index].quantity = Math.max(1, cart[index].quantity - 1);
                    renderCart();
                }
                // Check if it's the remove button
                else if (clickedButton.classList.contains("remove-btn")) {
                    // Direct removal without confirmation
                    cart.splice(index, 1);
                    renderCart();
                }
            });


    // Checkout
    checkoutButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Thank you for shopping at Gamer Stop! ");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });

    renderCart();
});
