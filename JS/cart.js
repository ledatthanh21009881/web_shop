// Khai báo biến để lưu trữ giá và số lượng sản phẩm
let productData = {
  product1: {
      price: 318000,
      quantity: 1,
  },
  product2: {
      price: 271000,
      quantity: 1,
  },
  product3: {
      price: 589000,
      quantity: 1,
  },
  product4: {
      price: 286000,
      quantity: 1,
  },
  product5: {
      price: 286000,
      quantity: 1,
  },
};

// Hàm để tính tổng giá trị sản phẩm và cập nhật tổng tự động
function calculateTotal() {
  let totalAmount = 0;

  // Duyệt qua tất cả sản phẩm và tính tổng giá trị
  for (let productKey in productData) {
      let product = productData[productKey];
      totalAmount += product.price * product.quantity;
  }

  // Cập nhật giao diện hiển thị tổng tiền
  document.getElementById('total-amount').textContent = formatCurrency(totalAmount) + ' đ';
}

// Hàm để định dạng số tiền thành chuỗi có dấu phẩy (ví dụ: 1,000,000)
function formatCurrency(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Hàm để thay đổi số lượng sản phẩm
function handleAmountChange(productKey, amount) {
  productData[productKey].quantity = amount;
  // Sau khi thay đổi số lượng, cập nhật tổng tự động
  calculateTotal();
}

// Lắng nghe sự kiện nút giảm
function handleMinus(productKey) {
  let currentAmount = productData[productKey].quantity;
  if (currentAmount > 1) {
      handleAmountChange(productKey, currentAmount - 1);
  }
}

// Lắng nghe sự kiện nút tăng
function handlePlus(productKey) {
  let currentAmount = productData[productKey].quantity;
  handleAmountChange(productKey, currentAmount + 1);
}
// Hàm để thay đổi số lượng sản phẩm
function handleAmountChange(productKey, amount) {
  productData[productKey].quantity = amount;

  // Lấy input tương ứng với sản phẩm và cập nhật giá trị của input
  let inputElement = document.querySelector(`input[data-product="${productKey}"]`);
  if (inputElement) {
      inputElement.value = amount;
  }

  // Sau khi thay đổi số lượng, cập nhật tổng tự động
  calculateTotal();
}

//-------------------

// Lắng nghe sự kiện khi nút "Thanh toán" được nhấn
document.getElementById("checkoutButton").addEventListener("click", function() {
  // Gọi hàm cập nhật tổng số tiền trong modal
  updateTotalAmountInModal();
});

// Hàm để cập nhật tổng số tiền trong modal
function updateTotalAmountInModal() {
  let modalTotalAmount = 0;

  // Duyệt qua sản phẩm trong giỏ hàng và tính tổng tiền dựa trên số lượng và giá của từng sản phẩm
  for (let productKey in productData) {
      const product = productData[productKey];
      modalTotalAmount += product.price * product.quantity;
  }

  // Lấy phần tử <span> hiển thị tổng số tiền trong modal và cập nhật giá trị
  const totalAmountModalSpan = document.getElementById("total-amount-modal");
  totalAmountModalSpan.textContent = formatCurrency(modalTotalAmount) + ' đ';
}

// Hàm để định dạng số tiền thành chuỗi có dấu phẩy (ví dụ: 1,000,000)
function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN');
}

//---Kiểm tra form thông tin đơn hàng

$(document).ready(function () {
    // Lắng nghe sự kiện khi form được nộp (submit)
    $("form").on("submit", function (e) {
        // Kiểm tra và xác thực từng trường nhập liệu
        let errors = false;

        // Họ và tên
        let name = $("#exampleInputName").val();
        if (name.trim() === "") {
            alert("Vui lòng nhập họ và tên.");
            errors = true;
        }

        // Số điện thoại
        let phoneNumber = $("#exampleInputNumber").val();
        if (phoneNumber.trim() === "" || !/^\d{10}$/.test(phoneNumber)) {
            alert("Vui lòng nhập số điện thoại hợp lệ (10 số).");
            errors = true;
        }

        // Email
        let email = $("#exampleInputEmail1").val();
        if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
            alert("Vui lòng nhập email hợp lệ.");
            errors = true;
        }

        // Hình thức thanh toán
        let paymentMethod = $("input[name='Pay']:checked").val();
        if (paymentMethod === undefined) {
            alert("Vui lòng chọn một hình thức thanh toán.");
            errors = true;
        }

        if (errors) {
            e.preventDefault(); // Ngăn chặn việc nộp form nếu có lỗi
        } else {
            // Hiển thị thông báo "Thanh toán thành công" và xác nhận việc nộp form
            let confirmPayment = confirm("Bạn đã thanh toán thành công.");
            if (!confirmPayment) {
                e.preventDefault(); // Ngăn chặn việc nộp form nếu không xác nhận
            }
        }
    });
});
//--------------------------

$(document).ready(function () {
    // Lắng nghe sự kiện khi nút tăng/giảm số lượng được nhấn
    $(".quantity-input button").on("click", function () {
        let product = $(this).data("product");
        let quantityInput = $(`input[data-product='${product}']`);
        let quantity = parseInt(quantityInput.val());
        let price = parseFloat($(`td[data-th='Price']`, quantityInput.closest("tr")).text().replace(/đ/g, '').trim());
        let totalSpan = $(`span[data-product='${product}']`);

        if ($(this).hasClass("plus-btn")) {
            // Tăng số lượng
            quantity += 1;
        } else if ($(this).hasClass("minus-btn")) {
            // Giảm số lượng, đảm bảo không nhỏ hơn 1
            quantity = Math.max(quantity - 1, 1);
        }

        // Cập nhật số lượng trên input
        quantityInput.val(quantity);

        // Tính toán tổng tiền cho sản phẩm 1
        let subtotal = price * quantity;

        // Cập nhật tổng tiền cho sản phẩm 1
        totalSpan.text(`${subtotal.toLocaleString()} đ`);

        // Cập nhật tổng tiền tổng cộng
        updateTotalAmount();
    });

    // Hàm cập nhật tổng tiền tổng cộng
    function updateTotalAmount() {
        let total = 0;
        $(".quantity-input input").each(function () {
            let product = $(this).data("product");
            let quantity = parseInt($(this).val());
            let price = parseFloat($(`td[data-th='Price']`, $(this).closest("tr")).text().replace(/đ/g, '').trim());
            total += price * quantity;
        });

        $("#total-amount").text(`${total.toLocaleString()} đ`);
        $("#total-amount-modal").text(`${total.toLocaleString()} đ`);
    }
});

// Hàm để thay đổi số lượng sản phẩm và cập nhật tổng tự động
function handleMinus(productKey) {
  let currentAmount = productData[productKey].quantity;
  if (currentAmount > 1) {
    handleAmountChange(productKey, currentAmount - 1);

    // Cập nhật tổng tiền cho sản phẩm product1 khi giảm
    updateProductTotal(productKey);
  }
}

function handlePlus(productKey) {
  let currentAmount = productData[productKey].quantity;
  handleAmountChange(productKey, currentAmount + 1);

  // Cập nhật tổng tiền cho sản phẩm product1 khi tăng
  updateProductTotal(productKey);
}

// Hàm cập nhật tổng tiền của sản phẩm
function updateProductTotal(productKey) {
  let price = productData[productKey].price;
  let quantity = productData[productKey].quantity;
  let totalElement = document.querySelector(`span[data-product='${productKey}']`);
  let newTotal = price * quantity;
  totalElement.textContent = formatCurrency(newTotal) + ' đ';

  // Cập nhật tổng tiền tổng cộng
  updateTotalAmount();
}
// Lắng nghe sự kiện click trên nút "Xóa"
document.querySelectorAll(".btn-outline-danger").forEach(function(button) {
  button.addEventListener("click", function() {
      // Lấy giá trị data-product để xác định sản phẩm cần thiết lập lại
      let productKey = this.getAttribute("data-product");

      // Thiết lập số lượng về 1
      handleAmountChange(productKey, 1);
  });
});


