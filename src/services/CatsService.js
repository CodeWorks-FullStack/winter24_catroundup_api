import { fakeDb } from "../db/FakeDb.js"
import { Cat } from "../models/Cat.js"
import { BadRequest } from "../utils/Errors.js"

// REVIEW this will all change tomorrow
class CatsService {
  getCats() {
    const cats = fakeDb.cats
    // NOTE we return a value out of this method that the controller can target and capture. 
    // const cats = catsService.getCats()
    // cats variable in the controller takes on the value returned here
    return cats
  }

  getCatById(catId) {
    const foundCat = fakeDb.cats.find(cat => cat.id == catId)

    if (!foundCat) {
      // NOTE BadRequest is a custom error class that will send our message with a 400 response code
      throw new BadRequest(`${catId} not a valid id`)
    }

    return foundCat
  }
  createCat(catData) {
    const newCat = new Cat(catData)

    // NOTE weird stuff to get kind of unique ids.... this all changes tomorrow
    const lastCat = fakeDb.cats[fakeDb.cats.length - 1]

    // NOTE if array is empty, id is 1
    if (!lastCat) {
      newCat.id = 1
    }

    // NOTE if the last cat in our array has an id of 7, our new cat will have an id of 8
    else {
      newCat.id = lastCat.id + 1
    }

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