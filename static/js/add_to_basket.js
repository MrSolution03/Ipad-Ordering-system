$(document).ready(function () {
    var basket = [];
    var orderNumber = 1;

    $(".order-btn").click(function (e) {
        e.preventDefault();

        var productName = $(this).closest(".product").find(".product-name").text();
        var productPrice = parseFloat($(this).closest(".product").find(".price").text().replace('$', ''));

        // Add item to basket array
        basket.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });

        // Update the basket count
        $("#basketCount").text(basket.length);

        alert(productName + " added to basket!");
    });

    $(".basket").click(function () {
        updateBasketDisplay();
        $("#basketModal").show();
    });

    $(document).on("input", ".item-quantity", function () {
        var index = $(this).data("index");
        var quantity = $(this).val();

        basket[index].quantity = quantity;
        updateBasketDisplay();
    });

    $(document).on("click", ".remove-item", function () {
        var index = $(this).data("index");
        basket.splice(index, 1);
        updateBasketDisplay();
        $("#basketCount").text(basket.length); // Update basket count
    });

    function updateBasketDisplay() {
        var orderItemsContainer = $("#orderItems");
        orderItemsContainer.empty();

        basket.forEach(function (item, index) {
            var itemDiv = `
                <div class="order-item">
                    <span>${item.name}</span>
                    <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="item-quantity">
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            orderItemsContainer.append(itemDiv);
        });

        // Append table number input
        var tableNumberInput = `
            <div>
                <label for="tableNumber">Table Number:</label>
                <input type="text" id="tableNumber" name="tableNumber">
            </div>
        `;
        orderItemsContainer.append(tableNumberInput);

        // Append total price
        var totalPriceDiv = `
            <div class="total-price">
                <span>Total: $<span id="totalPrice">${calculateTotalPrice().toFixed(2)}</span></span>
            </div>
        `;
        orderItemsContainer.append(totalPriceDiv);
    }

    function calculateTotalPrice() {
        return basket.reduce(function (total, item) {
            return total + (item.price * item.quantity);
        }, 0);
    }

    $(".close").click(function () {
        $("#basketModal").hide();
    });

    $("#confirmOrderBtn").click(function () {
        var customerName = $("#customerName").val();
        var tableNumber = $("#tableNumber").val();
        if (!customerName) {
            alert("Please enter your name.");
            return;
        }
        if (!tableNumber) {
            alert("Please enter your table number.");
            return;
        }

        // Here you would handle the order submission (e.g., send it to a server)

        // Display thank you message
        displayThankYouMessage(customerName, orderNumber);

        // Reset everything
        basket = [];
        $("#basketCount").text(basket.length); // Reset basket count
        orderNumber++;
        $("#basketModal").hide();
    });

    function displayThankYouMessage(customerName, orderNumber) {
        var thankYouModal = `
            <div id="thankYouModal" class="modal">
                <div class="modal-content">
                    <span class="close-thank-you">&times;</span>
                    <h2>Thank You, ${customerName}!</h2>
                    <p style="font-size: 1.5em;">Your order number is: <strong>${orderNumber}</strong></p>
                    <p>Please keep your order number in mind.</p>
                </div>
            </div>
        `;
        $("body").append(thankYouModal);
        $("#thankYouModal").show();

        $(".close-thank-you").click(function () {
            $("#thankYouModal").remove();
        });

        // Close the modal when clicking outside of it
        $(window).click(function (event) {
            if ($(event.target).is("#thankYouModal")) {
                $("#thankYouModal").remove();
            }
        });
    }

    // Close the basket modal when clicking outside of it
    $(window).click(function (event) {
        if ($(event.target).is("#basketModal")) {
            $("#basketModal").hide();
        }
    });
});
