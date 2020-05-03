<template>
<div class="container">
    <div>
        <md-table>
            <md-table-row>
                <md-table-head>Repo Name</md-table-head>
                <md-table-head>Repo Owner</md-table-head>
                <md-table-head>Stars Count</md-table-head>
                <md-table-head>Forks Count</md-table-head>
            </md-table-row>

            <template v-for="(repo, index) in forks_data">
                <md-table-row :key="index">
                    <md-table-cell>{{repo.name}}</md-table-cell>
                    <md-table-cell>{{repo.owner.login}}</md-table-cell>
                    <md-table-cell>{{repo.stargazers_count}}</md-table-cell>
                    <md-table-cell>{{repo.forks_count}}</md-table-cell>
                </md-table-row>
            </template>
        </md-table>
    </div>
  
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ForksList",
  data(){
    return {
        current_page: 1,
        forks_data: [],
        repo_info: {},
    }
  },
  mounted() {
      this.repo_info = this.$store.getters.REPO;
      this.getForksData();
  },
  methods: {
    getForksData(){
      let userName = this.repo_info.owner;
      let repoName = this.repo_info.repo_name;
      axios.get(`https://api.github.com/repos/${userName}/${repoName}/forks?page=${this.current_page}`)
      .then(response => {
          console.log('////////////',  response.data)
        this.forks_data = response.data;
      }).catch(error => {
        console.log(error);
      })
    },
  },
};
</script>