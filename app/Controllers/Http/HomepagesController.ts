import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Movie from "App/Models/Movie";

export default class HomepagesController {
  public async index({ view, auth }: HttpContextContract) {
    const movies = await Movie.all();

    if (movies.length === 0) {
      return view.render("home", { auth });
    }

    return view.render("home", { movies, auth });
  }
}
