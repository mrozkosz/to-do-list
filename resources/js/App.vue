<template>
  <div>
    <v-navbar :app="this" />
    <router-view :app="this" />
    
  </div>
</template>
<style>
@import "./style/todolist.css";
@import "./style/old_blog_style.css";
</style>
<script>
import navigationBar from "./components/navbar";
export default {
  name: "app",
  components: {
    "v-navbar": navigationBar,
  },
  data() {
    return {
      user: {},
      loading: false,
      initiated: false,
      req: axios.create({
        baseUrl: BASE_URL
      })
    };
  },
  created: function() {
    this.loading = true;

    this.req.get("auth/init").then(response => {
      var userDetails = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email
      };
      if (response.data.id) {
        this.user = userDetails;
      }else{
        this.user = null;
      }
      this.loading = false;
    });
  }
};
</script>