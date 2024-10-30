
//confirm before removing the item from cart
const removeBtn = document.getElementById('removeBtn');
if (removeBtn) {

  removeBtn.addEventListener('click', async (event) => {

    event.preventDefault();

    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Swal.fire({
          title: "Item Removed!",
          text: "Cart Item Removed Sucessfully",
          icon: "success"
        });
        window.location.href = event.target.closest('a').href;
      }

    });

  });

}


//checking cart is empti or not and prevent proceed to checkout page
const checkoutBtn = document.getElementById('checkoutBtn');

checkoutBtn.addEventListener('click', (event) => {

  event.preventDefault();

  const totalAmount = document.getElementById('totalAmount');

  if (Number(totalAmount.innerHTML.substring(2)) <= 0) {
    Swal.fire("Add Product To Proceed");

  }else{
    window.location.href = checkoutBtn.getAttribute('href')

  }

})