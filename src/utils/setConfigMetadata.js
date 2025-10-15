export function setFavicon(iconURL) {
  const link = document.querySelector("link[rel~='icon']");
  if (!link) {
    const newLink = document.createElement("link");
    newLink.rel = "icon";
    newLink.href = iconURL;
    document.head.appendChild(newLink);
  } else {
    link.href = iconURL;
  }
}

export const setSiteTitle = (title) => {
  const titleEle = document.querySelector("title");
  
  if (titleEle) {
    titleEle.textContent = title;
  }
}