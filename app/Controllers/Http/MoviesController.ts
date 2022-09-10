import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Movie from "App/Models/Movie";
import cloudinary from "@ioc:Adonis/Addons/Cloudinary";

export default class MoviesController {
  public async createForm({ view }: HttpContextContract) {
    return view.render("movies/create");
  }

  public async createValidation({
    request,
    auth,
    response,
  }: HttpContextContract) {
    const payload = request.body();

    const image = request.file("image");

    let cloudinaryResponse;

    if (image) {
      cloudinaryResponse = await cloudinary.upload(
        image,
        "movie-app/movies/" + Date.now() + "-" + image.clientName
      );
    }

    await Movie.create({
      ...payload,
      image:
        cloudinaryResponse?.secure_url ||
        "https://res.cloudinary.com/drc7piqbh/image/upload/v1662079524/movie-app/movies/default-movie_xonblz.jpg",
      user: auth.user?.id,
    });
    return response.redirect().toRoute("home");
  }

  public async updateForm({ view, params }: HttpContextContract) {
    const movie = await Movie.find(params.id);

    return view.render("movies/update", { movie });
  }

  public async updateValidation({
    params,
    request,
    response,
  }: HttpContextContract) {
    const movie = await Movie.find(params.id);

    const image = request.file("image");

    let cloudinaryResponse;

    if (image) {
      cloudinaryResponse = await cloudinary.upload(
        image,
        "movie-app/movies/" + Date.now() + "-" + image.clientName
      );
    }

    await movie
      ?.merge({
        ...request.body(),
        image: cloudinaryResponse?.secure_url || movie.image,
      })
      .save();

    return response.redirect().toRoute("home");
  }

  public async delete({ response, params }: HttpContextContract) {
    const movie = await Movie.find(params.id);
    await movie?.delete();
    return response.redirect().toRoute("home");
  }

  public async details({ params, view }: HttpContextContract) {
    const movie = await Movie.find(params.id);

    return view.render("movies/details", { movie });
  }

  public async list({ view, params }: HttpContextContract) {
    const movies = await Movie.query().where("user", params.id);

    if (movies.length == 0) {
      return view.render("movies/list");
    }
    return view.render("movies/list", { movies });
  }
}
