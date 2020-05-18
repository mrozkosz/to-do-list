<template>
  <div>
    <m-slider main-slider="Zarejestruj się"/>
    <div class="mx-auto" style="height: 100px;"></div>
    <div class="container">
      <div class="col-md-6 offset-md-3">
        <form v-on:submit.prevent="onSubmit">
          <div
            v-for="(error,index) in errors"
            :key="index"
            class="alert alert-danger"
            role="alert"
          >{{ error }}</div>
          <div class="form-group">
            <label for="name">Imie i Nazwisko</label>
            <input type="text" class="form-control" id="name" v-model="name" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="email"
            />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Hasło</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Powtórz hasło</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="confirmPassword"
            />
          </div>
          <button class="btn btn-primary">Submit</button>
        </form>
        <div class="mx-auto" style="height: 100px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import mainslider from "../components/MainSlider";
export default {
  name: "register",
  props: ["app"],
  components: {
    "m-slider": mainslider,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: []
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (!this.name) {
        this.errors.push("Wprowadz poprawne imie i nazwisko");
      }
      if (!this.email) {
        this.errors.push("Email jest wymagany");
      }
      if (this.password !== this.confirmPassword) {
        this.errors.push("Hasła nie są takie same");
      }

      console.log(this.error);
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };

      this.app.req
        .post("auth/register", data)
        .then(response => {
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