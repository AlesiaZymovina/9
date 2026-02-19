const usedIds = new Set();

export function clearUsedIds() {
  usedIds.clear();
}

export function removeUsedId(id) {
  usedIds.delete(String(id));
}

export function appendImagesToGallery(galleryEl, photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const idStr = String(photo.id);
    if (usedIds.has(idStr)) return;
    usedIds.add(idStr);

    const img = document.createElement("img");
    img.src = `https://picsum.photos/id/${photo.id}/400/400`;
    img.alt = photo.author;
    img.loading = "lazy";

    img.style.opacity = 0;
    img.onload = () => {
      img.style.transition = "opacity 0.5s";
      img.style.opacity = 1;
    };

    fragment.appendChild(img);
  });

  galleryEl.appendChild(fragment);
}

export function reverseGallery(galleryEl) {
  const images = Array.from(galleryEl.children);
  images.reverse().forEach((img) => galleryEl.appendChild(img));
}

export function shuffleGallery(galleryEl) {
  const images = Array.from(galleryEl.children);
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  const fragment = document.createDocumentFragment();
  images.forEach((img) => fragment.appendChild(img));
  galleryEl.appendChild(fragment);
}
