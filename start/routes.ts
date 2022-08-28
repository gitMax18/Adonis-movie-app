import Route from "@ioc:Adonis/Core/Route";

Route.get("/", "HomepagesController.index").as("home");
//auth
Route.get("/login", "AuthController.login").as("auth_login");
Route.get("/register", "AuthController.register").as("auth_register");
Route.post("/login", "AuthController.validateUser").as("auth_validateUser");
Route.post("/register", "AuthController.createUser").as("auth_createUser");
Route.get("/logout", "AuthController.logout").as("auth_logout");
