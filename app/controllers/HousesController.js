import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";
import { House } from "../models/House.js";

function _drawHouses() {
  let content = ''
  let houses = AppState.houses
  console.log('houses', houses);
  houses.forEach(house => content += house.houseCard);
  setHTML('houseShop', content)
  if (!AppState.account) {
    return
  }
  setHTML('formArea', House.createHouseCard)
}
export class HousesController {
  constructor() {
    this.getHouses()
    AppState.on('houses', _drawHouses)
    AppState.on('account', _drawHouses)
  }

  async getHouses() {
    try {
      await housesService.getHouses()
      console.log('Got Houses');
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  async createHouse(event) {
    try {
      event.preventDefault()
      const form = getFormData(event.target)
      await housesService.createHouse(form)
      Pop.success('created')
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }

  }

  async removeHouse(id) {
    try {
      await Pop.confirm('do you want to remove this post?', 'for other users to see your house you will need to repost it', 'yes remove!!', 'question')
      await housesService.removeHouse(id)
      Pop.success('deleted')
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }
}