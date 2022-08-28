import User from "App/Models/User";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import Application from "@ioc:Adonis/Core/Application";
import ValidateUserValidator from "App/Validators/ValidateUserValidator";

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
    if (avatar) {
      await avatar.move(Application.tmpPath("uploads"));
    }
    await User.create({
      ...payload,
      avatar: avatar?.filePath,
    });

    return view.render("auth/login");
  }

  public async validateUser({ auth, request, view }: HttpContextContract) {
    const payload = await request.validate(ValidateUserValidator);

    try {
      await auth.use("web").attempt(payload.email, payload.password);
      return view.render("home", { auth });
    } catch {
      return view.render("auth/login", {
        message: "Email ou mot de passe invalide",
      });
    }
  }

  public async logout({ auth, response }) {
    await auth.use("web").logout();
    response.redirect("/");
  }
}
