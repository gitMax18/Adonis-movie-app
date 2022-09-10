import User from "App/Models/User";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import ValidateUserValidator from "App/Validators/ValidateUserValidator";
import cloudinary from "@ioc:Adonis/Addons/Cloudinary";

export default class AuthController {
  public async login({ view }: HttpContextContract) {
    return view.render("auth/login");
  }

  public async register({ view }: HttpContextContract) {
    return view.render("auth/register");
  }

  public async createUser({ request, view }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);

    const avatar = request.file("avatar");

    let response;

    if (avatar) {
      response = await cloudinary.upload(
        avatar,
        "movie-app/users/" + Date.now() + "-" + avatar.clientName
      );
    }

    await User.create({
      ...payload,
      avatar:
        response?.secure_url ||
        "https://res.cloudinary.com/drc7piqbh/image/upload/v1662079089/movie-app/users/default_je62pg.jpg",
    });

    return view.render("auth/login");
  }

  public async validateUser({
    auth,
    request,
    view,
    response,
  }: HttpContextContract) {
    const payload = await request.validate(ValidateUserValidator);

    try {
      await auth.use("web").attempt(payload.email, payload.password);
      return response.redirect().toRoute("home");
    } catch {
      return view.render("auth/login", {
        message: "Email ou mot de passe invalide",
      });
    }
  }

  public async logout({ auth, response }) {
    await auth.use("web").logout();
    response.redirect().toRoute("home");
  }
}
