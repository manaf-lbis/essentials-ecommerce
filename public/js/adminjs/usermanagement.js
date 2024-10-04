// Select all buttons with the class 'statusbtn'
const statusButtons = document.querySelectorAll('.statusbtn');

// Loop through each button
statusButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Check the current class and toggle between "Block" and "UnBlock"
    if (button.classList.contains('btn-danger')) {
      button.classList.remove('btn-danger');
      button.classList.add('btn-success');
      button.innerHTML = 'Active';
    } else {
      button.classList.remove('btn-success');
      button.classList.add('btn-danger');
      button.innerHTML = 'Blocked';
    }
  });
});
