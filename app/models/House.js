import { AppState } from "../AppState.js"

export class House {
  constructor(data) {
    this.bedrooms = data.bedrooms
    this.bathrooms = data.bathrooms
    this.levels = data.levels
    this.imgUrl = data.imgUrl
    this.year = data.year
    this.price = data.price
    this.description = data.description
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = data.creator
  }

  get houseCard() {
    return `
    <div class="col-6 p-3">
      <div class="row card shadow flex-row">
        <div class="col-4 p-0">
          <img class="house-img rounded-start"
            src="${this.imgUrl}" alt="house">
        </div>
        <div class="col-7 p-3">
          <h2>${this.year} ${this.levels} Levels ${this.bedrooms} beds ${this.bathrooms} Baths</h2>
          <h4>$${this.price}</h4>
          <div>
            <h6>posted By: <img class="img-fluid rounded-circle creator"
                src="${this.creator.picture}" alt="">
              ${this.creator.name}</h6>

          </div>
          <h6>posted at: ${this.createdAt.toLocaleDateString()} last updated:
            ${this.updatedAt.toLocaleDateString()}</h6>
          <p class="mb-0">Description:</p>
          <p class="mb-0">${this.description}</p>
        </div>
        <div class="col-1 pt-3">
            ${this.ComputeDeleteButton}
          </div>
      </div>
    </div>
    `
  }

  static get createHouseCard() {
    return `
      <div class="col-6 col-md-8 p-4 card">
      <h2>Create post:</h2>
      <form onsubmit="app.HousesController.createHouse(event)">
        <div class="mb-2">
          <label for="year">Year</label>
          <input id="year" type="number" required max="2024" placeholder="2020" name="year">
        </div>
        <div class="mb-2">
          <label for="bedrooms">number of bedrooms</label>
          <input id="bedrooms" type="number" required name="bedrooms">
        </div>

        <div class="mb-2">
          <label for="bathrooms">number of bathrooms</label>
          <input id="bathrooms" type="number" required name="bathrooms">
        </div>

        <div class="mb-2">
          <label for="levels">number of levels</label>
          <input id="levels" type="number" required name="levels">
        </div>


        <div class="mb-2">
          <label for="imgUrl">Image URL</label>
          <input id="imgUrl" type="url" required maxlength="5000" name="imgUrl" placeholder="Houses ImgUrl...">
        </div>

        <div class="mb-2">
          <label for="price">Price</label>
          <input id="price" type="number" required name="price" min="0">
        </div>

        <div class="mb-2">
          <label for="description">Description</label>
          <textarea name="description" id="description" rows="5" placeholder="House Description..."
            maxlength="500"></textarea>
        </div>


        <div>
          <button class="btn btn-success" type="submit">Submit</button>
        </div>
      </form>
    </div>`
  }


  get ComputeDeleteButton() {
    if (AppState.account?.id == this.creatorId) {
      return `<button onclick="app.HousesController.removeHouse('${this.id}')" class="btn btn-danger rounded-circle"><i class="mdi mdi-trash-can"></i></button>`
    }
    return ''
  }

}

const ex = {
  "_id": "645d60f381faf24223ae886b",
  "bedrooms": 3,
  "bathrooms": 2,
  "levels": 2,
  "imgUrl": "https://floorcentral.com/wp-content/uploads/2014/07/sick-house-syndrome.jpg",
  "year": 2003,
  "price": 230000,
  "description": "Super sick house",
  "creatorId": "63f7d6202d1cf882287f12e2",
  "createdAt": "2023-05-11T21:41:07.979Z",
  "updatedAt": "2023-05-11T21:41:07.979Z",
  "__v": 0,
  "creator": {
    "_id": "63f7d6202d1cf882287f12e2",
    "name": "Charles Francis Xavier",
    "picture": "https://www.looper.com/img/gallery/professor-xs-entire-backstory-explained/intro-1587748942.jpg",
    "id": "63f7d6202d1cf882287f12e2"
  },
  "id": "645d60f381faf24223ae886b"
}