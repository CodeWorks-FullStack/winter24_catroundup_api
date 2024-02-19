// REVIEW this will all change tomorrow!

export class Cat {
  constructor (data) {
    this.id = data.id
    this.name = data.name
    this.age = data.age
    this.hasTail = data.hasTail || true
    this.eatsCheese = data.eatsCheese || true
    this.temperament = data.temperament || 'lazy'
  }
}