import HealthCheck from "@ioc:Adonis/Core/HealthCheck";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class HealthCheckController {
  public async getHealthCheck({ view }: HttpContextContract) {
    const report = await HealthCheck.getReport();
    return view.render("health/healthCheck", { report });
  }
}
