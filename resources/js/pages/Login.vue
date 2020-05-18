<template>
  <div>
    <m-slider main-slider="Zaloguj się"/>
    <div class="mx-auto" style="height: 100px;"></div>
    <div class="container">
      <div class="col-md-6 offset-md-3">
        <form v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="username"
            />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="password"
            />
          </div>
       
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import mainslider from "../components/MainSlider";
export default {
  name: "login",
  props: ["app"],
  components: {
    "m-slider": mainslider
  },
  data() {
    return {
      username: "",
      password: "",
      error: []
    };
  },
  methods: {
    onSubmit() {
      const data = {
        username: this.username,
        password: this.password
      };

      this.app.req
        .post("auth/login", data)
        .then(response => {
          console.log(response.data);
          this.app.user = response.data;
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>