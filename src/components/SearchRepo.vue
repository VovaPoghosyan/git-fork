<template>
<div class="container">
  <div class="search-bar d-flex justify-content-center">
    <div class="px-2"><i class="fa fa-search"></i></div>
    <div class="px-2"><input class="search-input" v-model="fullRepoName" /></div>
    <div>
      <button class="search-button" v-on:click="findRepo()">Find</button>
    </div>
  </div>
  <div
    class="table-container"
    v-if="Object.keys(repo_data).length"
  >
    <p>repo_name {{repo_data.repo_name}}</p>
    <p>owner {{repo_data.owner}}</p>
    <p>stars_count {{repo_data.stars_count}}</p>
    <p>forks_url {{repo_data.forks_url}}</p>
    <p>forks_count {{repo_data.forks_count}}</p>

    <mdb-nav-item :to="{ name: 'forks-list' }" waves-fixed active class="active">
      Go to forks list
    </mdb-nav-item>
    
  </div>
</div>
</template>

<script>
import axios from 'axios';
import {
  mdbNavItem,
} from "mdbvue";
export default {
  name: "SearchRepo",
  components: {
    mdbNavItem,
  },
  data(){
    return {
        userName: "",
        repoName: "",
        fullRepoName: "",
        repo_data: {},
    }
  },
  methods: {
    findRepo(){
      this.ifShow = true;
      let repo = this.fullRepoName.split(':');
      this.userName = repo[0];
      this.repoName = repo[1];
      // forks?page=2
      axios.get(`https://api.github.com/repos/${this.userName}/${this.repoName}`)
      .then(response => {
        let data = response.data;
        this.repo_data = {
          repo_name: data.name,
          owner: data.owner.login,
          stars_count: data.stargazers_count,
          forks_url: data.forks_url,
          forks_count: data.forks_count
        }
        this.$store.commit('SET_REPO', this.repo_data);
      }).catch(error => {
        console.log(error);
      })
    },
  },
};
</script>