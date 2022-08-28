import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HomepagesController {
  public async index({ view }: HttpContextContract) {
    return view.render("home");
  }
}
