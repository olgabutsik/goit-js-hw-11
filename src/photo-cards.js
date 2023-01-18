export function createCards(cardInfo) {
    const card = cardInfo.map(el => {
        return ` <div class="photo-card">
  <img src="${(webformatURL, largeImageURL)}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>; `;
    });
    return card.join('');
};












