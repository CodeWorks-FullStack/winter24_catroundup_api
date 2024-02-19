import { Cat } from "../models/Cat.js";

// REVIEW this will all change tomorrow!
class FakeDb {
  cats = [
    new Cat({ id: 1, name: 'Nick', age: 12, temperament: 'angry', hasTail: false, eatsCheese: true }),
    new Cat({ id: 2, name: 'Jeremy', age: 33, temperament: 'happy', hasTail: false, eatsCheese: true }),
    new Cat({ id: 3, name: 'Jake', age: 2, temperament: 'whiny', hasTail: true, eatsCheese: false }),
    new Cat({ id: 4, name: 'Larry', age: 4, temperament: 'stoic', hasTail: true, eatsCheese: false }),
    new Cat({ id: 5, name: 'Mick', age: 13, temperament: 'moody', hasTail: true, eatsCheese: true }),
  ]
}

export const fakeDb = new FakeDb()