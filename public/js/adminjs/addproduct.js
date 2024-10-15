
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
    imagePreview.style.display = 'none'; 
}
}

function cropImage(canvasId) {
    const canvas = document.getElementById(canvasId);

    if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();

        // Convert the cropped image to a base64 data URL
        const croppedImageData = croppedCanvas.toDataURL('image/jpeg');

        // Assign the cropped image data to a hidden input
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "croppedImage"; // This name should match what you expect in the backend
        hiddenInput.value = croppedImageData;

        document.getElementById("productForm").appendChild(hiddenInput);
    } else {
        console.error('Cropper is not initialized');
    }
}
