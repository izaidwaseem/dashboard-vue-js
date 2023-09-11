<template>
    <div class="container custom-container">
      <div class="table-container">
        <table class="table table-light table-striped">
          <!-- Table header ... -->
          <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Website</th>
                    <th scope="col">View All Details</th>
                </tr>
        </thead>
  
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <!-- Table data ... -->
              <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.username }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.phone }}</td>
                        <td>
                        <a :href="item.website" target="_blank">{{ item.website }}</a>
                </td>
              <!-- Add a View Details button -->
              <td>
                <button class="view-details-btn" @click="openModal(index)">View Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal content -->
      <b-modal id="modal-tall" :title="userDetails.name" hide-close>
            <div class="row">
                <div class="col">
                    <h5 class="my-1">Address</h5>
                    <ul class="my-4 list-unstyled" v-if="clickedUserIndex !== -1">
                        <li> <strong>City:</strong>  {{ userDetails.address.city }} </li>
                        <li> <strong>Street:</strong>  {{ userDetails.address.street }}</li>
                        <li> <strong>Suite:</strong>  {{ userDetails.address.suite }}</li>
                        <li> <strong>zipcode:</strong>  {{ userDetails.address.zipcode }}</li>
                    </ul>
                </div>
                <div class="col">
                    <h6 class="my-3">Geo Location</h6>
                    <ul class="list-unstyled" v-if="clickedUserIndex !== -1">
                        <li> <strong>Latitude:</strong>  {{ userDetails.address.geo.lat }} </li>
                        <li> <strong>Longitude:</strong>  {{ userDetails.address.geo.lng }}</li>
                    </ul>  
                </div>
            </div>
            

            <h5>Company</h5>
            <ul  class="my-4 list-unstyled" v-if="clickedUserIndex !== -1">
                <li> <strong>Name:</strong> {{ userDetails.company.name }}</li> 
                <li> <strong>Catch Phrase:</strong> {{ userDetails.company.catchPhrase }}</li>
                <li> <strong>BS:</strong> {{ userDetails.company.bs }}</li>        
            </ul>
            

        </b-modal>
    </div>
  </template>
  

<script>
import axios from 'axios'

export default{
    data(){
        return{
            items: [
                {
                    id: " ",
                    name: " ",
                    username: " ",
                    email: " ",
                    phone: " ",
                    website: " ",
                    address: {
                        city: " ",
                        street: " ",
                        suite: " ",
                        zipcode: " ",
                        geo: {
                            lat: " ",
                            lng: " ",
                        }
                    },
                    company: {
                        name: " ",
                        bs: " ",
                        catchPhrase: " ",
                    }
                }
            ],
            clickedUserIndex: -1, // Initially set to -1 to indicate no user is selected
            userDetails: {} // To store the details of the selected user
        }
    },
    methods: {
        getrequest(){
            axios
             .get("https://jsonplaceholder.typicode.com/users")
             .then((response) => {
                this.items = response.data;
                console.log("data:", this.items);
             })
             .catch((error) => {
                console.log("Error in getting the data", error)
             })
        },
        openModal(index) {
            this.clickedUserIndex = index;
            this.userDetails = this.items[index];
            this.$bvModal.show('modal-tall');
        },
        saveDataInLocalStorage(){
            localStorage.setItem("ApiData", JSON.stringify(this.items));
        }
        
    },
    mounted() {
        this.getrequest();
        this.saveDataInLocalStorage();
    },
}

</script>


<style >
/* Update table styles */
.table-container {
  margin-top: 4rem;
}

.table {
  padding: 0.5rem; /* Reduced padding */
  border-collapse: collapse;
  width: 100%;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.table th,
.table td {
  padding: 0.25rem; /* Reduced padding */
  text-align: left;
  border-bottom: 1px solid #ccc;
  font-size: 0.9rem; /* Reduced font size */
}

.table th {
  background-color: #f0f0f0;
  font-weight: 600;
}

.table tbody tr:hover {
  background-color: #f0f0f0;
}

.view-details-btn {
  padding: 0.3rem 0.8rem; /* Reduced padding */
  font-size: 0.85rem; /* Reduced font size */
  background-color: #0d2336f1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.view-details-btn:hover {
  background-color: #2d3d52;
}

/* Modal overlay */
.modal-backdrop {
  background-color: rgba(13, 35, 54, 0.6); /* Updated modal overlay color */
}

/* Modal content */
.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

/* Modal title */
.modal-header {
  background-color: #0d2336f1;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.modal-title {
  font-weight: 600; /* Added font-weight */
}

/* Modal body */
.modal-body {
  padding: 1rem;
}

.modal-header button.close {
  color: white;
  font-size: 1.5rem;
  opacity: 1;
}

.modal-footer {
  justify-content: flex-start; 
  border-top: 1px solid #ccc; 
  padding-top: 1rem;
}


.view-all-details-btn:hover {
  background-color: #2d3d52; /* Updated hover color */
}

.modal-footer .btn.btn-primary{
    display: none;
}

.modal-footer .btn.btn-secondary{
    padding: 0.3rem 0.8rem; 
    font-size: 0.85rem;
    background-color: #0d2336f1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

}

.modal-header button{
    display: none;
}

/* .custom-container{
  margin-top: 3rem;
}

@media screen and (max-width:768px) {
  .table-container{
    margin-top: 1rem;
  }
  .custom-container{
    margin-top: 2rem;
  }
}
@media (max-width: 768px){
    .container {
        max-width: 768px;
    }
} */
</style>
