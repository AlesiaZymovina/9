import { fetchImagesPage } from "./api.js";
import {
  appendImagesToGallery,
  clearUsedIds,
  removeUsedId,
  reverseGallery,
  shuffleGallery,
} from "./gallery.js";

export function setupGalleryControls({
  galleryEl,
  loadMoreBtn,
  clearBtn,
  removeLastBtn,
  reverseBtn,
  shuffleBtn,
  initialPage = 1,
  perLoad = 4,
}) {
  let page = initialPage;

  async function load(count = perLoad) {
    try {
      const data = await fetchImagesPage(page, count);
      appendImagesToGallery(galleryEl, data);
      page++;
    } catch (error) {
      console.error("Помилка при завантаженні картинок:", error);
    }
  }

  // перше завантаження
  load(perLoad);

  loadMoreBtn.addEventListener("click", () => load(perLoad));

  clearBtn.addEventListener("click", () => {
    galleryEl.innerHTML = "";
    clearUsedIds();
    page = initialPage;
  });

  removeLastBtn.addEventListener("click", () => {
    const last = galleryEl.lastElementChild;
    if (last) {
      const id = last.src.split("/")[4];
      removeUsedId(id);
      galleryEl.removeChild(last);
    }
  });

  reverseBtn.addEventListener("click", () => reverseGallery(galleryEl));
  shuffleBtn.addEventListener("click", () => shuffleGallery(galleryEl));
}
