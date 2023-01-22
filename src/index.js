import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './js/pixabay';
import { createCards } from './js/photo-cards';
import { simpleLightboxGallery } from './js/simple-lightbox.js';

const searchForm = document.querySelector('.search-form');
const inputArea = document.querySelector('input[name="searchQuery"]');
const searchBtn = document.querySelector('button[type="submit"]');
const loadMoreBtn = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery');
const finishMessage = document.querySelector('.finish')

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onClick);


let pixabayApi = new PixabayAPI();
// console.log(pixabayApi);

async function addPhotos() {
    try {
        const { data }  = await pixabayApi.fetchQueryPhotos();
        galleryList.innerHTML = createCards({ data });

    } catch (error) {
        console.log(error);
    }
};


async function onSearch(e) {
    e.preventDefault();

    if (pixabayApi.query === e.target.elements.searchQuery.value) {
        return;
    }
    
    if (pixabayApi.query !== null) {
          finishMessage.classList.add('is-hidden')
      }

    searchBtn.disabled = true;
    

    pixabayApi.query = e.target.elements.searchQuery.value;
    pixabayApi.page = 1;

    try {
        const { hits, totalHits } = await pixabayApi.fetchQueryPhotos();
        
        if (hits.length === 0) {
            Notify.failure('Sorry,there are no images matching your search query. Please try again.');
            e.target.reset();
            galleryList.innerHTML = '';
            return;
        }

        if (totalHits > 40) {
            loadMoreBtn.classList.remove('is-hidden');
        }

        notifySuccess(totalHits);
        galleryList.innerHTML = createCards(hits)
        simpleLightboxGallery.refresh();
    } catch (err) {
        console.log(err);
    } finally {
        searchBtn.disabled = false;
    }
};

async function onClick() {
    loadMoreBtn.disabled = true;
    
    
    pixabayApi.page += 1;

    try {
       const  {hits}  = await pixabayApi.fetchQueryPhotos();
        
        if (hits.length === 0 || hits.length < 40) {
            loadMoreBtn.classList.add('is-hidden');
            finishMessage.classList.remove('is-hidden')
             Notify.info(
               "We're sorry, but you've reached the end of search results."
            );
            
        }
        galleryList.insertAdjacentHTML('beforeend', createCards(hits));
        simpleLightboxGallery.refresh();
    } catch (err) {
        console.log(err);
    } finally {
        loadMoreBtn.disabled = false;
    }
   
}    

function notifySuccess(amount) {
      Notify.success(`Hooray! We found ${amount} images.`);
}




