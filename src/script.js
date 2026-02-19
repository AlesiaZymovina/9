const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");
const clearBtn = document.getElementById("clearGallery");
const removeLastBtn = document.getElementById("removeLast");
const reverseBtn = document.getElementById("reverseGallery");
const shuffleBtn = document.getElementById("shuffleGallery");

let page = 1;
const usedIds = new Set(); // щоб уникати повторів картинок

// Функція підвантаження картинок
async function fetchImages(count = 4) {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${count}`);
        const data = await response.json();

        const fragment = document.createDocumentFragment();

        data.forEach(photo => {
            if (usedIds.has(photo.id)) return; // пропускаємо повтори
            usedIds.add(photo.id);

            const img = document.createElement("img");
            img.src = `https://picsum.photos/id/${photo.id}/400/400`;
            img.alt = photo.author;
            img.loading = "lazy"; // lazy loading

            // плавна поява
            img.style.opacity = 0;
            img.onload = () => {
                img.style.transition = "opacity 0.5s";
                img.style.opacity = 1;
            };

            fragment.appendChild(img);
        });

        gallery.appendChild(fragment);
        page++;
    } catch (error) {
        console.error("Помилка при завантаженні картинок:", error);
    }
}

// Перше завантаження
fetchImages(4);

// Кнопки
loadMoreBtn.addEventListener("click", () => fetchImages(4));

clearBtn.addEventListener("click", () => {
    gallery.innerHTML = "";
    usedIds.clear(); // очищаємо set, щоб можна було завантажувати ті ж картинки знову
});

removeLastBtn.addEventListener("click", () => {
    const last = gallery.lastElementChild;
    if (last) {
        const id = last.src.split("/")[4]; // отримуємо id картинки
        usedIds.delete(id);
        gallery.removeChild(last);
    }
});

reverseBtn.addEventListener("click", () => {
    const images = Array.from(gallery.children);
    images.reverse().forEach(img => gallery.appendChild(img));
});

shuffleBtn.addEventListener("click", () => {
    const images = Array.from(gallery.children);
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
    const fragment = document.createDocumentFragment();
    images.forEach(img => fragment.appendChild(img));
    gallery.appendChild(fragment);
});

