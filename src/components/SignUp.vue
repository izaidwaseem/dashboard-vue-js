<template>
    <div>
        <section class="h-100 h-custom" style="background-color: #f9edcc;">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-8 col-xl-6">
                    <div class="card rounded-3">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                        class="w-100" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;"
                        alt="Sample photo">
                 
                    <div class="card-body p-4 p-md-5">
                        <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>

                        <form class="px-md-2" @submit="handleFormSubmit" ref="signupForm">

                        <div class="form-outline mb-4">
                            <input type="text" id="name" class="form-control" placeholder="Name" v-model="formData.name"/>
                            <div class="error" v-if="errors.name">{{ errors.name }}</div>
                        </div>
                        <div class="form-outline mb-4">
                            <input type="email" id="email" class="form-control" placeholder="Email" v-model="formData.email"/>
                            <div class="error" v-if="errors.email">{{ errors.email }}</div>
                        </div>
                        <div class="form-outline mb-4">
                            <input type="password" id="password" class="form-control" placeholder="Password" v-model="formData.password"/>
                            <div class="error" v-if="errors.password">{{ errors.password }}</div>
                        </div>
                        <div class="form-outline mb-4">
                            <input type="password" id="password2" class="form-control" placeholder="Confirm Password" v-model="formData.password2"/>
                            <div class="error" v-if="errors.password2">{{ errors.password2 }}</div>
                        </div>
                        
                        <div class="form-check mb-4 terms-services ">
                            <input class="form-check-input me-2" type="checkbox" value="" id="terms-services-checkbox" required/>
                            <label class="form-check-label" for="form2Example3g">
                                I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                            </label>
                        </div>

                        <button type="submit" class="btn btn-success btn-lg mb-1" id="submit-btn"> Submit</button>

                        <p class="text-center text-muted mt-3 mb-0">Have already an account? <a href="./login"
                             class="fw-bold text-body"><u>Login here</u></a>
                        </p>

                        </form>

                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default{
    data(){
        return{
            Users: [],
            formData: {
                userId: 0,
                name: "",
                email: "",
                password: "",
                password2: ""
            },
            errors: {},
        }
    },
    methods:{
        validateInput() {
            this.errors = {};

            //Name validation
            if (!this.formData.name.trim()) {
                this.setError("name", "Name is required");
            }

            //Email Validation
            if (!this.formData.email.trim()){
                this.setError("email", "Email is required");
            }
            else {
                const emailExists = this.Users.some(user => user.email === this.formData.email.trim());
                if (emailExists){
                    this.setError("email", "This Email already exists");
                }
            }

            // Password validation
            if (!this.formData.password.trim() && !this.formData.password2.trim()) {
                this.setError("password", "Password is required");
                this.setError("password2", "Password is required");
            } else if (this.formData.password.length < 8 || this.formData.password2.length < 8) {
                this.setError("password", "Password must be at least 8 characters");
                this.setError("password2", "Password must be at least 8 characters");
            } else if (this.formData.password !== this.formData.password2) {
                this.setError("password", "Passwords must match");
                this.setError("password2", "Passwords must match");
            } 
            

            // Add validation for other form fields

            // Return true if no errors are found
            return Object.keys(this.errors).length === 0;
        },
         // Load existing users from local storage
        loadUsersFromLocalStorage() {
            const storedUsers = JSON.parse(localStorage.getItem("Users")) || [];
            this.Users = storedUsers;
            this.formData.userId = storedUsers.length;

            this.$emit('users-loaded', storedUsers) //to use this function in login
        },
        saveUsersToLocalStorage() {
            localStorage.setItem("Users", JSON.stringify(this.Users));
        },

        setError(field, message){
            this.errors[field] = message;
        },
        
        handleFormSubmit(event) {
            event.preventDefault();

            if (this.validateInput()) {
                const newUser = {
                    userId: this.formData.userId,
                    name: this.formData.name,
                    email: this.formData.email,
                    password: this.formData.password,
                    password2: this.formData.password2,
                };
                this.Users.push(newUser);
                this.formData.userId++;

                // Save the updated users to local storage
                this.saveUsersToLocalStorage();

                // Reset the form fields
                this.formData.name = "";
                this.formData.email = "";
                this.formData.password = "";
                this.formData.password2 = "";

                // Clear any existing errors
                this.errors = {};

                alert("Registration Successful");
            }
        }, 
    },
    created() {
         // Load existing users from local storage when the component is created
        this.loadUsersFromLocalStorage();
    },
}
</script>

<style>
.terms-services{
    text-align: left;
}
.error{
    text-align: left;
    font-size: 12px;
}
.btn-success{
    background-color: #2d3d52 !important;
}
@media (min-width: 1025px) {
    .h-custom {
    height: 100vh !important;
    }
}

</style>