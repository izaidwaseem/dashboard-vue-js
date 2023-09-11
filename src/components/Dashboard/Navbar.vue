<template>
    <div>
      <div class="toggle-button" @click="toggleNavbar">
        <i class="bi bi-list"></i>
      </div>
      <div class="nav-bar" :class="{ 'nav-bar-active': navbarActive }">
        <div class="nav-items">
            <h4 class="dashboard-title">Dashboard</h4>

            <div class="row">
              <div class="col-md-12">
                <!-- Profile Link -->
          <router-link to="/profile" class="nav-item">
            <img src="@/assets/user (2).png" alt="Profile Icon" />
            Profile
          </router-link>
              </div>
              <div class="col-md-12">
                <!-- Users Link -->
          <router-link to="/users" class="nav-item">
            <img src="@/assets/group.png" alt="Users Icon" />
            Users
          </router-link>
              </div>
              <div class="col-md-12">
                <router-link to="/edit-profile" class="nav-item">
            <img class="edit-avatar" src="@/assets/user-avatar (5).png" alt="Edit profile Icon" width="30px" height="30px"/>
            Edit Profile
          </router-link>
              </div>
            </div>
          
  
          
          
        </div>
        <div>
            <button class="btn btn-danger logout-button" @click="logout">
              <i class="bi bi-box-arrow-right"></i> Logout
            </button>
        </div>
       
      </div>
        

     </div>
  </template>
  

<script>

export default{
    data(){
        return{
            items: [
                {
                    path: "/profile",
                    name: "Profile",
                    img: require("../../assets/user (2).png") // Using 'require' to load the image
                },
                {
                    path: "/users",
                    name: "Users",
                    img: require("../../assets/group.png")
                },
                {
                    path: "/edit-profile",
                    name: "Edit Profile",
                    img: require("../../assets/user-avatar (5).png")
                }
            ],
            loggedUser: {},
            navbarActive: false
        }
    },
    methods: {
      logout() {
        console.log('Logging out...');
        localStorage.removeItem('LoggedUser');
        console.log('Logged out successfully.');
        // Redirect to the login page
        this.$router.push('/login');
      },
      toggleNavbar() {
       this.navbarActive = !this.navbarActive;
      }
    }
}

</script>


<style>

.nav-bar{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.dashboard-title{
    text-align: center;
    font-weight: 600;
    margin: 2rem 0rem;
}


.nav-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 17px;
  color: white;
  text-decoration: none;
  border-bottom: 1px solid salmon;
}

.nav-item img {
  margin-right: 15px;
  width: 26px;
  height: 24px;
}

.edit-avatar{
    width: 30px !important;
    height: 30px !important;
}

.nav-item:hover {
  background-color: #f0f0f0;
  color: #0d2336f1;
  border-radius: 4px;

}
.logout-button {
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 17px;
  text-align: left;
  border: none;
  border-top: 1px solid salmon;
  margin-bottom: 3rem;
  margin-left: 5px;
  width: 100%;
}

.logout-button:hover {
  background-color: #f0f0f0;
  color: #0d2336f1;
  /* border-radius: 0; */
}


.toggle-button {
  display: none;
  cursor: pointer;
  font-size: 24px;
  padding: 0.5rem;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
}

@media screen and (max-width: 768px) {
  .nav-bar {
    display: none;
    position: absolute;
    top: 4rem;
    left: 0;
    right: 0;
    background-color: rgb(124, 60, 60);
    z-index: 100;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    border-top: none;
    height: 42vh;
  }

  .nav-bar-active {
    display: flex;
  }

  .toggle-button {
    display: block;
  }
  .nav-items{
    margin-top: 0rem;
  }
  .nav-bar{
    justify-content: space-evenly;
  }
  .logout-button{
    margin: 0;
  }
}

</style>
