import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { House } from "../models/House.js";
class HousesService {
  async removeHouse(id) {
    const res = await api.delete(`api/houses/${id}`)
    const removeIndex = AppState.houses.findIndex(house => house.id == id)
    AppState.houses.splice(removeIndex, 1)
    AppState.emit('houses')
  }
  async createHouse(form) {
    const newHouse = await api.post('api/houses', form)
    AppState.houses.unshift(new House(newHouse.data))
    AppState.emit('houses')
  }
  async getHouses() {
    const res = await api.get('api/houses')
    console.log(res.data);
    const newHouses = res.data.reverse().map(housePOJO => new House(housePOJO))
    AppState.houses = newHouses
  }


}

export const housesService = new HousesService()