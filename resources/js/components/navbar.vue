<template>
  <div>
    <nav class="nav">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img src="../img/logo.png" alt="Logo" id="logo" />
        </router-link>
        <div id="button" onclick="myFunction()"></div>
        <ul id="menu">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li v-if="app.user">
            <router-link to="/todolist">TODO List</router-link>
          </li>
          
          <li v-if="app.user" @click="logout" id="logout">
            <router-link to="/">Wyloguj</router-link>
          </li>

          <li v-if="!app.user">
            <router-link to="/login">Zaloguj się!</router-link>
          </li>
          <li v-if="!app.user">
            <router-link to="/register">Zarejestruj się!</router-link>
          </li>
          <li v-if="app.user" id="login">{{ app.user? app.user.name : ""}}</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: ["app"],
  data() {
    return {};
  },
  methods: {
    logout() {
      this.app.req.post("auth/logout").then(() => {
        this.app.user = null;
        this.$router.push("/login");
      });
    }
  }
};
</script>
