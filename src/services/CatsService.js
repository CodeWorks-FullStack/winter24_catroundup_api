import { fakeDb } from "../db/FakeDb.js"
import { Cat } from "../models/Cat.js"
import { BadRequest } from "../utils/Errors.js"

class CatsService {
  getCats() {
    const cats = fakeDb.cats
    return cats
  }

  getCatById(catId) {
    const foundCat = fakeDb.cats.find(cat => cat.id == catId)

    if (!foundCat) {
      throw new BadRequest(`${catId} not a valid id`)
    }

    return foundCat
  }
  createCat(catData) {
    const newCat = new Cat(catData)

    // NOTE weird stuff to get kind of unique ids.... this all changes tomorrow
    const lastCat = fakeDb.cats[fakeDb.cats.length - 1]
    newCat.id = lastCat.id + 1

    fakeDb.cats.push(newCat)
    return newCat
  }

  destroyCat(catId) {
    const catIndex = fakeDb.cats.findIndex(cat => cat.id == catId)

    if (catIndex == -1) {
      throw new BadRequest(`No cat found with the id of ${catId}`)
    }

    fakeDb.cats.splice(catIndex, 1)

    return 'Cat was removed!'
  }
}


export const catsService = new CatsService()