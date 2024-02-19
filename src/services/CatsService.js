import { fakeDb } from "../db/FakeDb.js"

class CatsService {
  getCats() {
    const cats = fakeDb.cats
    return cats
  }
}

export const catsService = new CatsService()