const slides = [...document.querySelectorAll(".slider > img")];
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const imageCounter = document.querySelector(".img-id");
const slider = document.querySelector(".slider");
const galleryContainer = document.querySelector(".gallery-container");
let currentSlide = 0;

function updateSliderControls() {
  if (!slides.length) return;
  if (prevButton) prevButton.disabled = false;
  if (nextButton) nextButton.disabled = false;
  if (imageCounter) imageCounter.textContent = `Image ${currentSlide + 1} of ${slides.length}`;
  slides.forEach((image, index) => {
    const isActive = index === currentSlide;
    image.classList.toggle("active", isActive);
    image.setAttribute("aria-hidden", String(!isActive));
  });
  updateThumbnailActiveState(currentSlide);
}

function goToSlide(index) {
  if (!slides.length) return;
  const total = slides.length;
  currentSlide = ((index % total) + total) % total;
  updateSliderControls();
}

function updateThumbnailActiveState(index) {
  galleryContainer?.querySelectorAll(".thumbnail").forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function buildThumbnails() {
  if (!galleryContainer) return;
  galleryContainer.replaceChildren();
  slides.forEach((image, index) => {
    const thumbnailButton = document.createElement("button");
    thumbnailButton.type = "button";
    thumbnailButton.className = "thumbnail";
    thumbnailButton.setAttribute("aria-label", `Show image ${index + 1}`);
    thumbnailButton.setAttribute("aria-current", String(index === currentSlide));
    const thumbnail = image.cloneNode(true);
    thumbnail.removeAttribute("id");
    thumbnail.setAttribute("alt", `Thumbnail for ${image.alt || `image ${index + 1}`}`);
    thumbnail.removeAttribute("aria-hidden");
    thumbnailButton.appendChild(thumbnail);
    thumbnailButton.addEventListener("click", () => goToSlide(index));
    galleryContainer.appendChild(thumbnailButton);
  });
}

prevButton?.addEventListener("click", () => goToSlide(currentSlide - 1));
nextButton?.addEventListener("click", () => goToSlide(currentSlide + 1));
slider?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goToSlide(currentSlide - 1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    goToSlide(currentSlide + 1);
  }
});

if (slides.length > 0) {
  buildThumbnails();
  updateSliderControls();
} else if (imageCounter) {
  imageCounter.textContent = "No images available";
}
