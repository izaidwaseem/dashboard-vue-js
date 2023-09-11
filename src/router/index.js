import Vue from "vue";
import VueRouter from "vue-router";
import SignUp from "@/components/SignUp.vue";
import Login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard/Dashboard.vue";
import Profile from "@/components/Dashboard/Profile.vue";
import Users from "@/components/Dashboard/Users.vue";
import EditProfile from "@/components/Dashboard/EditProfile.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,

      children: [
        {
          path: "/profile",
          name: "profile",
          component: Profile
        },
        {
          path: "/users",
          name: "users",
          component: Users
        },
        {
          path: "/edit-profile",
          name: "edit-profile",
          component: EditProfile
        }
      ]
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
