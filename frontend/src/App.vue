<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #bb1146">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="https://aux.iconspalace.com/uploads/1922419712.png" alt="Logo" width="25" height="25" class="d-inline-block align-text-top">
        Qatar World Cup 2022
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="d-flex">
      
        <button type="button" class="btn btn-dark" v-if="!isLoggedIn">
          <i class="fa-solid fa-right-to-bracket"></i>&nbsp; Entrar
        </button>

        <div class="btn-group" v-if="isLoggedIn">
          <button type="button" class="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Nome do usuário
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Menu item</a></li>
            <li><a class="dropdown-item" href="#">Menu item</a></li>
            <li><a class="dropdown-item" href="#">Menu item</a></li>
          </ul>
        </div>   
        
      </div>

    </div>
  </nav>

  <ul class="nav">
    <li class="nav-item">
      <router-link to="/" class="nav-link"><i class="fas fa-house"></i> Dashboard</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/bet" class="nav-link"><i class="fas fa-play"></i> Aposta</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/teams" class="nav-link"><i class="fas fa-people-group"></i> Times</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/matches" class="nav-link"><i class="fas fa-futbol"></i> Jogos</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/about" class="nav-link"><i class="fas fa-circle-info"></i> Sobre</router-link>
    </li>
  </ul> 

  <router-view/>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoggedIn = ref(false) // TODO imprement Login and set as global
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

* body {
  font-family: "Roboto";
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  display: inline-flex;
  padding: 5px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #bb1146;
    }
  }
}
</style>
