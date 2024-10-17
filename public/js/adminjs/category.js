


const deleteBtn = document.getElementById('deleteBtn');
const deleteBtns = document.querySelectorAll('.deleteBtn'); 


function callSweetAlert(alertMessage) {
    console.log('callSweetAlert is being called'); // To verify it's called
    Swal.fire({
        title: "error",
        text: alertMessage,
        icon: "error",
        confirmButtonText: 'OK'
    });
}


window.callSweetAlert = callSweetAlert;


// Add confirmation before delete
deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', (event) => {
        
        
        event.preventDefault(); // Prevent the default delete action

        const deleteUrl = deleteBtn.getAttribute('href'); // Get the delete URL

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
                // If confirmed, redirect to the delete URL
                window.location.href = deleteUrl;
            }
        });
    });
});