import { catsService } from "../services/CatsService.js";
import BaseController from "../utils/BaseController.js";

// NOTE inheriting all members from BaseController (properties and methods)
export class CatsController extends BaseController {
  constructor () {
    // NOTE calls the constructor on BaseController
    // NOTE label on door in hallway. allows us to send requests to http:localhost:3000/api/cats
    super('api/cats')
    // NOTE allows us to set up code to run when requests are sent to this endpoint
    this.router.get('', this.getCats)
  }

  /**
   * Sends all values back to the client
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
}