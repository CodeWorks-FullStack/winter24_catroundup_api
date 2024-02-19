import { fakeDb } from "../db/FakeDb.js"
import { Cat } from "../models/Cat.js"
import { BadRequest } from "../utils/Errors.js"

class CatsService {
  createCat(catData) {
    const newCat = new Cat(catData)

    // NOTE weird stuff to get kind of unique ids.... this all changes tomorrow
    const lastCat = fakeDb.cats[fakeDb.cats.length - 1]
    newCat.id = lastCat.id + 1

    fakeDb.cats.push(newCat)
    return newCat
  }
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