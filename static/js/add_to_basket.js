$(document).ready(function () {
    var basket = [];
    var orderNumber = 1;

    $(".order-btn").click(function (e) {
        e.preventDefault();

        var productName = $(this).closest(".product").find(".product-name").text();
        var productPrice = $(this).closest(".product").find(".price").text();

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
        var orderItemsContainer = $("#orderItems");
        orderItemsContainer.empty();

        basket.forEach(function (item, index) {
            var itemDiv = `
                <div class="order-item">
                    <span>${item.name}</span>
                    <span>${item.price}</span>
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="item-quantity">
                </div>
            `;
            orderItemsContainer.append(itemDiv);
        });

        $("#orderNumber").text(orderNumber);

        $("#basketModal").show();
    });

    $(document).on("input", ".item-quantity", function () {
        var index = $(this).data("index");
        var quantity = $(this).val();

        basket[index].quantity = quantity;
    });

    $(".close").click(function () {
        $("#basketModal").hide();
    });

    $("#confirmOrderBtn").click(function () {
        var customerName = $("#customerName").val();
        if (!customerName) {
            alert("Please enter your name.");
            return;
        }

        // Here you would handle the order submission (e.g., send it to a server)

        alert("Order confirmed! Thank you, " + customerName + ".");

        // Reset everything
        basket = [];
        $("#basketCount").text(basket.length); // Reset basket count
        orderNumber++;
        $("#basketModal").hide();
    });

    // Close the modal when clicking outside of it
    $(window).click(function (event) {
        if ($(event.target).is("#basketModal")) {
            $("#basketModal").hide();
        }
    });
});
