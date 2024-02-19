import { fakeDb } from "../db/FakeDb.js";
import { catsService } from "../services/CatsService.js";
import BaseController from "../utils/BaseController.js";

// NOTE all controllers will be built and registered by a setup file
// NOTE inheriting all members from BaseController (properties and methods)
export class CatsController extends BaseController {
  constructor () {
    // NOTE calls the constructor on BaseController
    // NOTE label on door in hallway. allows us to send requests to http:localhost:3000/api/cats
    super('api/cats')
    // NOTE the express router allows us to set up code to run when requests are sent to this endpoint
    this.router
      // NOTE if you send a get request to http:localhost:3000/api/cats, we run our callback function this.getCats, which is a method on this CatsCOntroller class
      .get('', this.getCats)

      // NOTE a colon after a slash denotes that this a variable we can target from the request parameters. If a get request is sent to http://localhost:3000/api/cats/2, we can target the '2' from the URL by drilling into request.parameters.catId
      .get('/:catId', this.getCatById)

      // NOTE post request to http://localhost:3000/api/cats triggers this.createCat to run
      .post('', this.createCat)
      // NOTE delete request to http://localhost:3000/api/cats/3 triggers this.destroyCat to run, and we can target 3 by drilling into the request parameters object
      .delete('/:catId', this.destroyCat)
  }


  // NOTE good intellisense from express
  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */

  // NOTE request is the request object from express, stores all information about the HTTP request being made from the client (knight). You can access headers, body, parameters, etc by drilling into the request object
  // NOTE response is the response object from express that can send an HTTP response back to client. We will almost always use the send method on this object to send a response body to the client
  // NOTE next is a function from express that is for error handling. Should always gon in catch, and pass our error object as an argument
  getCats(request, response, next) {
    try {
      // NOTE the cats variable is assigned a value by the return in the service
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
      // NOTE we pull out the value stored in the request url. If the user sends a request to http://localhost:3000/api/cats/4, the value of the catId variable will be 4. The property accessed from the requests params should match the spelling set up for our mount path .get('/:catId', this.getCatById)
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
      // NOTE target the values stored in the request body object. Essentially the request body is the second argument passed to axios instances
      // NOTE example: api.post('api/cars', carData) -> carData is request body
      const catData = request.body
      const cat = catsService.createCat(catData)
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
  destroyCat(request, response, next) {
    try {
      // NOTE http:localhost:3000/api/cats/79 -> catId value is 79
      const catId = request.params.catId
      const message = catsService.destroyCat(catId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}