<template>
    <div>
        <div>
            <!-- <h1>This is your dashboard</h1> -->
            <div class="container-fluid container-custom g-0">
                <div class="row">
                    <div class="col-lg-2 col-md-12 nav-section">
                        <div>
                            <Navbar />
                            <div>
                                <h4 class="dashboard-title">Dashboard</h4>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-lg-10 col-md-12 content-section ">
                        <router-view />
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

import Navbar from "./Navbar.vue"
export default{

    components: {
        Navbar,
    },
}

</script>

<style>



.nav-section{
    border: 1px solid black;
    height: 100vh;
    background-color: #0d2336f1;
    color: white;
}

.dashboard-title{
    text-align: center;
    font-weight: 600;
    margin: 2rem 0rem;
}

.content-section{
    text-align: center;
    background-color: white;
    border-radius: 16px;
}
@media screen and (max-width: 768px) {
    .nav-section{
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .dashboard-title{
        margin: 1rem 0rem;
    }
    .nav-items .dashboard-title{
        display: none;
    }
}
</style>