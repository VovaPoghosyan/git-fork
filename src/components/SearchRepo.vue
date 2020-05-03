<template>
<div class="container">
  <div class="search-bar d-flex justify-content-center">
    <div class="px-2"><i class="fa fa-search"></i></div>
    <div class="px-2"><input class="search-input" v-model="fullRepoName" /></div>
    <div>
      <button class="search-button" v-on:click="findRepo()">Find</button>
    </div>
  </div>
  <div class="table-container" v-if="ifShow">
    
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: "SearchRepo",
  data(){
    return {
        userName: "",
        repoName: "",
        fullRepoName: "",
        ifShow: false,
    }
  },
  methods: {
    findRepo(){
      this.ifShow = true;
      let repo = this.fullRepoName.split(':');
      this.userName = repo[0];
      this.repoName = repo[1];
      axios.get(`https://api.github.com/repos/${this.userName}/${this.repoName}`)
      .then(response => {
        console.log(response, '/////////////////////')
      }).catch(error => {
        this.ifShow = false;
        console.log(error);
      })
    },
  },
};
</script>