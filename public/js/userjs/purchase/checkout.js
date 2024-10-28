document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkoutForm");
  
    checkoutForm.addEventListener("submit", (event) => {
      if (!validateCheckoutForm()) {
        event.preventDefault(); // Stop form submission if validation fails
      }
    });
  });
  
  function validateCheckoutForm() {
    const selectedAddress = document.querySelector('input[name="deliveryAddress"]:checked');
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return false; // Validation failed
    }
  
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return false; // Validation failed
    }
  
    return true; // Validation passed
  }
  