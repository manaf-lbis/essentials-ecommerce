
function addressSec() {

    document.getElementById('addressAddingSec').classList.toggle('d-none');
    document.getElementById('addressList').classList.toggle('d-none');

}

const newAddressSubmit = document.getElementById('newAddressSubmit');
const addressAddingForm = document.getElementById('addressAddingForm')



function validateForm() {
    // Get form values
    let fullName = document.getElementById('fullName').value.trim();
    let houseName = document.getElementById('houseName').value.trim();
    let area = document.getElementById('area').value.trim();
    let street = document.getElementById('street').value.trim();
    let city = document.getElementById('city').value.trim();
    let state = document.getElementById('state').value.trim();
    let pincode = document.getElementById('pincode').value.trim();
    let phone = document.getElementById('phone').value.trim();

    let isValid = true;

    // Reset error messages
    document.getElementById('fullNameErr').innerText = "";
    document.getElementById('houseNameErr').innerText = "";
    document.getElementById('areaErr').innerText = "";
    document.getElementById('streetErr').innerText = "";
    document.getElementById('cityErr').innerText = "";
    document.getElementById('stateErr').innerText = "";
    document.getElementById('pincodeErr').innerText = "";
    document.getElementById('phoneErr').innerText = "";


    if (fullName === "") {
        document.getElementById('fullNameErr').innerText = "Full Name is required.";
        isValid = false;
    }

    if (houseName === "") {
        document.getElementById('houseNameErr').innerText = "Address is required.";
        isValid = false;
    }

    if (area === "") {
        document.getElementById('areaErr').innerText = "Area is required.";
        isValid = false;
    }

    if (street === "") {
        document.getElementById('streetErr').innerText = "Street is required.";
        isValid = false;
    }

    if (city === "") {
        document.getElementById('cityErr').innerText = "City is required.";
        isValid = false;
    }

    if (state === "") {
        document.getElementById('stateErr').innerText = "State is required.";
        isValid = false;
    }

    if (pincode === "") {
        document.getElementById('pincodeErr').innerText = "Postal code is required.";
        isValid = false;
    } else if (!/^\d{6}$/.test(pincode)) {
        document.getElementById('pincodeErr').innerText = "Postal code must be 6 digits.";
        isValid = false;
    }

    if (phone === "") {
        document.getElementById('phoneErr').innerText = "Phone number is required.";
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        document.getElementById('phoneErr').innerText = "Phone number must be 10 digits.";
        isValid = false;
    }

    return isValid;
}

//sending address request
newAddressSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    const validation = validateForm();

    if (validation) {
        addressAddingForm.submit()
    }

})


const deleteIcon = document.querySelectorAll('.deleteBtn');

deleteIcon.forEach((icon) => {
    icon.addEventListener('click', deleteClicked)
})


async function  deleteClicked(e) {

    const _id = e.currentTarget.getAttribute('addressId')

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
            sentRequest(_id);
        }

      });


}


async function sentRequest(_id){

    const response =  await fetch(`/removeAddress?_id=${_id}`, {
        methord: "GET",
        headers: {
            'content-type': 'application/json'
        },
    })

    if(response.ok){
       await Swal.fire({
            title: "Sucess",
            text: " Address Deleted sucessfully",
            icon: "success"
          });
          window.location.href = '/address'
    }else{
      await  Swal.fire({
            title: "error",
            text: "Internal server err",
            icon: "error"
          });
          window.location.href = '/address'
    }


}

