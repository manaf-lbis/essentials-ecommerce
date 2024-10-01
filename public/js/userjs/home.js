const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1, // Number of slides to show
   
    autoplay: {
        delay: 3000,            // Auto-scroll delay (3 seconds)
        disableOnInteraction: false, // Continue autoplay after user interaction
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });