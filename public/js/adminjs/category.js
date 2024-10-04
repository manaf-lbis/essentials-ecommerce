const addBtn = document.getElementById('addCategory');
const list = document.querySelector('.categoryList');
const popup = document.querySelector('.categoryPopup');
const closeBtn = document.querySelector('.btn-close');

const toggle = ()=>{
    list.classList.toggle('blur');
    popup.classList.toggle('active')  
}

addBtn.addEventListener("click", toggle);
closeBtn.addEventListener("click", toggle);

