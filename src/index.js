import { Notify } from 'notiflix/build/notiflix-notify-aio';
import include from 'posthtml-include';
import { PixabayAPI } from './pixabay';
import { createCards } from './photo-cards.js';

const searchForm = document.querySelector('.search-form');
const inputArea = document.querySelector('input[name="searchQuery"]');
const searchBtn = document.querySelector('button[type="submit"]');
const loadMoreBtn = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery')

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onClick);


const pixabayApi = new PixabayAPI();
// console.log(pixabayApi);

async function addPhotos() {
    try {
        const  data  = await pixabayApi.fetchQueryPhotos();
        galleryList.innerHTML = createCards(data);

    } catch (error) {
        console.log(error);
    }
};
addPhotos();

async function onSearch(e) {
    e.preventDefault();

    searchBtn.disabled = true;
    searchBtn.classList.add('disabled');

    pixabayApi.query = e.target.elements.q.value;
    pixabayApi.page = 1;

    try {
        const  data  = await pixabayApi.fetchQueryPhotos();
        if (data.results.length === 0) {
            Notify.failure('Sorry,there are no images matching your search query. Please try again.');
            e.target.reset();
            galleryList.innerHTML = '';
            return;
        }
        if (data.per_page > 1) {
            loadMoreBtn.classList.remove('is-hidden');
        }

        galleryList.innerHTML = createCards(data)
    } catch (err) {
        console.log(err);
    }

    searchBtn.disabled = false;
    searchBtn.classList.remove('disabled');

};

async function onClick(evt) {
    evt.target.disabled = true;
    evt.target.classList.add('disabled');
    
    pixabayApi += 1;

    try {
       const  data  = await pixabayApi.fetchQueryPhotos();
        galleryList.insertAdjacentHTML('beforeend', createCards(data));

        if (data.per_page === pixabayApi.page) {
            loadMoreBtn.classList.add('is-hidden');
        }
    } catch (err) {
        console.log(err);
    }
    e.target.disabled = false;
    e.target.classList.remove('disabled');
}    

