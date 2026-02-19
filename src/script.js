import { setupGalleryControls } from "./modules/events.js";

const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");
const clearBtn = document.getElementById("clearGallery");
const removeLastBtn = document.getElementById("removeLast");
const reverseBtn = document.getElementById("reverseGallery");
const shuffleBtn = document.getElementById("shuffleGallery");

setupGalleryControls({
  galleryEl: gallery,
  loadMoreBtn,
  clearBtn,
  removeLastBtn,
  reverseBtn,
  shuffleBtn,
  initialPage: 1,
  perLoad: 4,
});
