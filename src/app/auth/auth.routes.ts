import { Route } from "@angular/router";
import { Register } from "./components/register/register";
import { Login } from "./components/login/login";

export const registerRoutes:Route[]=[
  {
    path:'',
    component:Register
  },
]

export const loginRoutes:Route[]=[
  {
    path:'',
    component:Login
  },
]
