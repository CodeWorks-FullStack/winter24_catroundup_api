import { catsService } from "../services/CatsService.js";
import BaseController from "../utils/BaseController.js";

// NOTE inheriting all members from BaseController (properties and methods)
export class CatsController extends BaseController {
  constructor () {
    // NOTE calls the constructor on BaseController
    // NOTE label on door in hallway. allows us to send requests to http:localhost:3000/api/cats
    super('api/cats')
    // NOTE allows us to set up code to run when requests are sent to this endpoint
    this.router
      .get('', this.getCats)
      .get('/:catId', this.getCatById)
      .post('', this.createCat)
  }


  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  getCats(request, response, next) {
    try {
      const cats = catsService.getCats()
      response.send(cats)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  getCatById(request, response, next) {
    try {
      const catId = request.params.catId
      const cat = catsService.getCatById(catId)
      response.send(cat)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  createCat(request, response, next) {
    try {
      const catData = request.body
      const cat = catsService.createCat(catData)
      response.send(cat)
    } catch (error) {
      next(error)
    }
  }
}