import Route from "@ioc:Adonis/Core/Route";

Route.get("/", "HomepagesController.index").as("home");
//auth
Route.get("/login", "AuthController.login").as("auth_login");
Route.get("/register", "AuthController.register").as("auth_register");
Route.post("/login", "AuthController.validateUser").as("auth_validateUser");
Route.post("/register", "AuthController.createUser").as("auth_createUser");
Route.get("/logout", "AuthController.logout").as("auth_logout");

//movie
Route.get("/movie/create", "MoviesController.createForm")
  .middleware("auth")
  .as("movie_create");

Route.post("/movie/create", "MoviesController.createValidation")
  .middleware("auth")
  .as("movie_createValidation");

Route.get("/movie/update/:id", "MoviesController.updateForm")
  .middleware("auth")
  .as("movie_updateForm");

Route.post("/movie/update/:id", "MoviesController.updateValidation")
  .middleware("auth")
  .as("movie_updateValidation");

Route.get("/movie/delete/:id", "MoviesController.delete")
  .middleware("auth")
  .as("movie_delete");

Route.get("/movie/details/:id", "MoviesController.details").as("movie_details");

Route.get("/movie/list/:id", "MoviesController.list").as("movie_list");
// HealthCheck
Route.get("/health", "HealthCheckController.getHealthCheck").as("health_check");
