
import axios from 'axios';
// import include from 'posthtml-include';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '32928246-6ae7869637525638a20b8d67d';

  constructor() {
    this.page = 1;
    this.q = null;
  }

  fetchQueryPhotos() {
    const paramsPhoto = {
      params: {
        key: PixabayAPI.API_KEY,
        q: this.q,
        page: this.page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
      },
    };

    return axios.get('PixabayAPI.BASE_URL?PixabayAPI.API_KEY' & paramsPhoto).then(function(res)  {console.log(res)}).catch(function (error) {console.log(error)})
  }
}
