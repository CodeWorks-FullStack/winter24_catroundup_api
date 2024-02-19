import { fakeDb } from "../db/FakeDb.js"
import { BadRequest } from "../utils/Errors.js"

class CatsService {
  getCatById(catId) {
    const foundCat = fakeDb.cats.find(cat => cat.id == catId)

    if (!foundCat) {
      throw new BadRequest(`${catId} not a valid id`)
    }

    return foundCat
  }
  getCats() {
    const cats = fakeDb.cats
    return cats
  }
}

export const catsService = new CatsService()