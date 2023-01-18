
import axios from 'axios';


export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '32928246-6ae7869637525638a20b8d67d';

  constructor() {
    this.page = 1;
    this.query = null;
    this.queryAmt = 40;
    
  }

  async fetchQueryPhotos() {
    const paramsPhoto = {
      params: {
        key: PixabayAPI.API_KEY,
        q: this.query,
        page: this.page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.queryAmt,
      },
    };

    const {data} = await axios.get(`${PixabayAPI.BASE_URL}`, paramsPhoto)
    return data;
    console.log(data)
  }
}
