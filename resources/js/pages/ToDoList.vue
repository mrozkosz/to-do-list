<template>
  <div>
    <m-slider main-slider="TODO List" />
    <div class="mx-auto" style="height: 100px;"></div>
    <div class="container">
      <h1>To Do List</h1>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-lg-12">
              <div class="card px-3">
                <div class="card-body">
                  <form v-on:submit.prevent="addToList">
                    <div class="add-items d-flex">
                      <input
                        type="text"
                        class="form-control todo-list-input"
                        placeholder="What do you need to do today?"
                        v-model="text"
                      />
                      <button class="add btn btn-primary font-weight-bold todo-list-add-btn">Dodaj</button>
                    </div>
                  </form>
                  <div class="list-wrapper">
                    <ul class="d-flex flex-column-reverse todo-list">
                      <square v-if="loading" v-bind:loading="loading"></square>
                      <li
                        v-if="!loading"
                        v-for="(list,index) in lists"
                        :key="index"
                        v-bind:class="{ completed: list.isDone }"
                      >
                        <div class="form-check">
                          <label class="form-check-label">
                            <input
                              v-model="list.isDone"
                              class="checkbox"
                              type="checkbox"
                              @change="handleChange(list)"
                            />
                            {{ list.text }}
                            <i class="input-helper"></i>
                          </label>
                        </div>

                        <i class="remove" v-on:click="deleteItem(list,index)">
                          <svg
                            class="bi bi-x"
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
                              clip-rule="evenodd"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto" style="height: 100px;"></div>
  </div>
</template>
<script>
import mainslider from "../components/MainSlider";
import { SquareSpinner } from "vue-spinners";
export default {
  name: "todolist",
  props: ["app"],
  components: {
    square: SquareSpinner,
    "m-slider": mainslider
  },

  created() {
    this.loadData();
  },
  data() {
    return {
      lists: [],
      text: "",
      loading: true
    };
  },
  methods: {
    loadData: function() {
      this.app.req.get("list/getList").then(response => {
        this.loading = false;
        this.lists = response.data;
      });
    },
    addToList: function() {
      const data = {
        text: this.text
      };
      this.loading = true;
      this.app.req.put("list/addToList", data).then(response => {
        this.lists = response.data;
        this.text = "";
        this.loading = false;
      });
    },
    handleChange: function(e) {
      const data = {
        id: e.id,
        isDone: e.isDone
      };
      this.app.req.post("list/updateList", data).then(response => {
        this.lists = response.data;
      });
    },
    deleteItem: function(e, index) {
      const data = {
        id: e.id
      };
      this.lists.splice(index, 1);
      this.app.req.post("list/deleteItemFromList", data).then(response => {
        this.lists = response.data;
      });
    }
  }
};
</script>