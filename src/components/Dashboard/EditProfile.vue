<template>
    <div class="container ">
      <div class="main-body">
        <div class="row gutters-sm custom-row-container">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                <div class="mt-3">
                  <h4 class="profile-name">{{ loggedUser.name }}</h4>
                  <p class="text-secondary mb-1">Full Stack Developer</p>
                  <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Additional profile details (website, social links, etc.) can go here -->
        </div>
          <div class="col-md-5">
            <div class="card mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-12">
                    <h6 class="text-center">Edit Profile</h6>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-12">
                    <label for="editName">Name</label>
                    <input id="editName" type="text" class="form-control" v-model="editedName">
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-12">
                    <label for="Password">Password</label>
                    <input id="Password" type="password" class="form-control" v-model="Password">
                    <div v-if="errors.Password" class="text-danger">{{ errors.Password }}</div>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-12">
                    <label for="newPassword">New Password</label>
                    <input id="newPassword" type="password" class="form-control" v-model="newPassword">
                    <div v-if="errors.newPassword" class="text-danger">{{ errors.newPassword }}</div>

                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-12">
                    <label for="confirmPassword">Confirm New Password</label>
                    <input id="confirmPassword" type="password" class="form-control" v-model="confirmPassword">
                    <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>

                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-12">
                    <button class="btn save-changes-btn" @click="saveChanges">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        loggedUser: {
          name: " ",
          email: " ",
        },
        editedName: "",
        Password: "",
        newPassword: "",
        confirmPassword: "",

        loadedUsers: [],
        errors: {
            Password: '',
            newPassword: ' ',
            confirmPassword: ' ',
        },

      };
    },
    methods: {
        loadLoggedUserFromLocalStorage() {
        this.loggedUser = JSON.parse(localStorage.getItem("LoggedUser")) || [];
        
        },
        loadUsersFromLocalStorage() {
            const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];
            this.loadedUsers = storedUsers;
            console.log(this.loadedUsers);

        },
        setError(field, message) {
            this.errors[field] = message;
        },

        clearError(field) {
            this.errors[field] = '';
        },
        updateName() {
            // Save the current loggedUser's name
            const oldName = this.loggedUser.name;

            // Update loggedUser's name
            this.loggedUser.name = this.editedName;

            // Find and update the user's name in loadedUsers array
            const userToUpdateIndex = this.loadedUsers.findIndex(
                (user) => user.email === this.loggedUser.email
            );
            if (userToUpdateIndex !== -1) {
                this.loadedUsers[userToUpdateIndex].name = this.editedName;
            }
            //console.log("Users:", this.loadedUsers[userToUpdateIndex].name)
            // Update the stored users in local storage
            localStorage.setItem("LoggedUser", JSON.stringify(this.loggedUser));
            localStorage.setItem("Users", JSON.stringify(this.loadedUsers));

            // Display success message or perform any necessary actions after updating the name
            console.log(`Name updated from "${oldName}" to "${this.editedName}"`);
        },
        checkPassword(){
            if (this.loggedUser.loginPassword === this.Password){
                return true;
            }
            return false;
        },
    
        setNewPassword() {
            if (this.checkPassword()){

                if (this.newPassword === this.Password) {
                this.setError('newPassword', 'Old and New Password can not be the same');
                } else {
                    if (this.newPassword !== this.confirmPassword) {
                        this.setError('confirmPassword', 'New Password and Confirm Password does not match.');
                    } else {
                    // Update loggedUser's password
                    this.loggedUser.loginPassword = this.newPassword;

                    // Find and update the user's password in loadedUsers array
                    const userToUpdateIndex = this.loadedUsers.findIndex(
                        (user) => user.email === this.loggedUser.email
                    );
                    if (userToUpdateIndex !== -1) {
                        this.loadedUsers[userToUpdateIndex].loginPassword = this.newPassword;
                    }

                    // Update the stored users in local storage
                    localStorage.setItem("LoggedUser", JSON.stringify(this.loggedUser));
                    localStorage.setItem("Users", JSON.stringify(this.loadedUsers));
                    
                    // Display success message or perform any necessary actions
                    }
                    this.clearError('Password');

                }
            }
            else{
                this.setError('Password', 'Password is incorrect.');
            }
            
        },

        saveChanges() {
            console.log(this.checkPassword());
            this.updateName();
            this.setNewPassword();
        },
        
    
    },
    mounted(){
        this.loadLoggedUserFromLocalStorage();
        this.loadUsersFromLocalStorage();

    }
  };
</script>
  
<style>
.custom-row-container{
    margin-top: 3rem !important;
    display: flex;
    justify-content: center;
}
.card-body{
    text-align: left;
}
.profile-name {
  font-size: 24px;
  color: #333;
  margin-bottom: 5px;
}

.text-secondary {
  color: #777;
}

.font-size-sm {
  font-size: 14px;
}
.save-changes-btn{
    background-color: #2d3d52 !important;
    color: white !important;
}



</style>
  