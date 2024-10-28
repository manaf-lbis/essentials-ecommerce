const cancelOrderBtn = document.getElementById('cancelOrderBtn');

cancelOrderBtn.addEventListener('click', (event) => {

    // stop a tag submission 
    event.preventDefault();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {

        if (result.isConfirmed) {
            // Redirecting to the href of the a tag after confirmation
            window.location.href = cancelOrderBtn.href;
            
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});
