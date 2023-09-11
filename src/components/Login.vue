<template>
    <div>
        <section class="h-100 gradient-form" style="background-color: #eee;">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-xl-10">
                        <div class="card rounded-3 text-black">
                            <div class="row g-0">
                                <div class="col-lg-6">
                                    <div class="card-body p-md-5 mx-md-4">

                                        <div class="text-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                style="width: 185px;" alt="logo">
                                            <h4 class="mt-1 mb-5 pb-1">We are The Kings</h4>
                                        </div>

                                        <form>
                                            <p>Please login to your account</p>

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form2Example11">Email</label>
                                                <input type="email" id="login-email" class="form-control"
                                                    v-model="loggedUser.loginEmail" />
                                                <div class="error" v-if="errors.email">{{ errors.email }}</div>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form2Example22">Password</label>
                                                <input type="password" id="login-password" class="form-control"
                                                    v-model="loggedUser.loginPassword" />
                                                <div class="error" v-if="errors.password">{{ errors.password }}</div>
                                            </div>

                                            <div class="text-center pt-1 mb-5 pb-1 d-flex flex-column">
                                                <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                    @click="login()" type="button">Log
                                                    in</button>
                                                <a class="text-muted" href="#!">Forgot password?</a>
                                            </div>

                                            <div class="d-flex align-items-center justify-content-center pb-4">
                                                <p class="mb-0 me-2">Don't have an account?</p>
                                                <router-link to="/signup" class="btn btn-outline-danger">Create new</router-link>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                                <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 class="mb-4">We are more than just a company</h4>
                                        <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                            do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loggedUser: {
                loginId: "",
                name: "",
                loginEmail: "",
                loginPassword: ""
            },
            loadedUsers: [],
            errors: {}
        }
    },
    methods: {
        loadUsersFromLocalStorage() {
            const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];
            this.loadedUsers = storedUsers;

        },
        onUsersLoaded(users) {
            this.loadedUsers = users;
        },
        setError(field, message) {
            this.errors[field] = message;
        },
        checkEmail() {
            const emailToCheck = this.loggedUser.loginEmail;

            // Check if the email is empty
            if (!emailToCheck) {
                this.setError('email', 'Email is required.');
            } else {
                this.errors.email = '';
                const userExists = this.loadedUsers.some(user => user.email === emailToCheck);

                if (userExists) {
                    // Email exists, perform further actions (like checking password or logging in)
                    console.log("Email exists:", emailToCheck);
                }
                else {
                    // Email does not exist, show an error message
                    this.setError('email', 'This email does not exist.');
                }
            }


        },

        checkPassword() {
            const passwordToCheck = this.loggedUser.loginPassword;

            // Check if the password is empty
            if (!passwordToCheck) {
                this.setError('password', 'Password is required.');
            } else {
                this.errors.password = '';

                // Rest of the code to check the password
                const user = this.loadedUsers.find(user => user.email === this.loggedUser.loginEmail);

                if (user) {
                    // User found, check password
                    if (user.password === passwordToCheck) {
                        console.log("Login successful!");
                        // You can implement further actions for successful login here
                    } else {
                        this.setError('password', 'Incorrect password.');
                    }
                } else {
                    // User not found, show an error message
                    this.setError('email', 'This email does not exist.');
                }
            }

        },

        login() {
            this.checkEmail();
            this.checkPassword();

            if (!this.errors.email && !this.errors.password) {
                const user = this.loadedUsers.find(user => user.email === this.loggedUser.loginEmail);

                if (user) {
                    // User found, set the logged-in user's name
                    this.loggedUser.name = user.name;
                    this.loggedUser.loginId = user.userId;
                    // Save the 'loggedUser' to local storage
                    localStorage.setItem("LoggedUser", JSON.stringify(this.loggedUser));

                    // Redirect to the dashboard route
                    this.$router.push({ name: "profile" }); // Replace 'dashboard' with the actual name of your dashboard route
                }
            }
        }

    },
    created() {
        this.loadUsersFromLocalStorage();


    },
    beforeDestroy() {

    },
}
</script>
<style>
.gradient-custom-2 {

    /* background: rgb(143, 196, 183);
    background: linear-gradient(90deg, rgba(143, 196, 183, 1) 12%, rgba(238, 174, 202, 1) 100%); */

    background-color: #2d3d52;
}
.form-label {
    float: left;
}

.error {
    text-align: left;
    font-size: 12px;
}

@media (min-width: 768px) {
    .gradient-form {
        height: 100vh !important;
    }
}

@media (min-width: 769px) {
    .gradient-custom-2 {
        border-top-right-radius: .3rem;
        border-bottom-right-radius: .3rem;
    }
}
</style>