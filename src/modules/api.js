export async function fetchImagesPage(page, count = 4) {
  const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${count}`);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return await response.json();
}
