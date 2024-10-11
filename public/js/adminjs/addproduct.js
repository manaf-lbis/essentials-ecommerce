
let cropper;

function prepareCrop(event, previewId, canvasId) {
console.log('prepare crop');

const input = event.target;
const imagePreview = document.getElementById(previewId);

// Ensure cropper is destroyed before creating a new one
if (cropper) {
    cropper.destroy();
}

if (input.files && input.files[0]) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';

        // Initialize cropper
        cropper = new Cropper(imagePreview, {
            aspectRatio: 4/3, // Set the aspect ratio as needed
            viewMode: 1,
            autoCropArea: 1,
        });
    };

    reader.readAsDataURL(input.files[0]);
} else {
    imagePreview.style.display = 'none'; // Hide the image preview if no file is selected
}
}

function cropImage(canvasId) {

const canvas = document.getElementById(canvasId);

if (cropper) {
    const croppedCanvas = cropper.getCroppedCanvas();

    // Draw the cropped image on the canvas
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height); // Clear the previous content
    canvas.getContext('2d').drawImage(croppedCanvas, 0, 0);
    
    // Convert the canvas to a data URL and assign it to a hidden input
    const croppedImageData = croppedCanvas.toDataURL('image/jpeg');
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = canvasId;
    hiddenInput.value = croppedImageData;

    document.getElementById("productForm").appendChild(hiddenInput);
} else {
    console.error('Cropper is not initialized');
}
}
