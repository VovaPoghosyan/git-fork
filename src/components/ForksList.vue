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

            <md-table-row
                v-for="(repo, index) in forks_data"
                :key="index"
            >
                <md-table-cell>{{repo.name}}</md-table-cell>
                <md-table-cell>{{repo.owner.login}}</md-table-cell>
                <md-table-cell>{{repo.stargazers_count}}</md-table-cell>
                <md-table-cell>{{repo.forks_count}}</md-table-cell>
            </md-table-row>
        </md-table>
        <div class="pagination">
            <md-button
                class="md-icon-button md-raised"
                :disabled="current_page === 1"
                @click="changePage(--current_page)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
            </md-button>
            <md-button class="md-icon-button md-raised">
                {{current_page}}
            </md-button>
            <md-button
                class="md-icon-button md-raised"
                :disabled="current_page === pages_count"
                @click="changePage(++current_page)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
            </md-button>
        </div>
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
        pages_count: 1,
        per_page: 10,
        forks_data: [],
        repo_info: {},
    }
  },
    mounted() {
        this.current_page = Number(this.$route.params.id);
        console.log(this.$route);
        this.repo_info = this.$store.getters.REPO;
        if(Object.keys(this.repo_info).length) {
            this.pages_count = Math.ceil(this.repo_info.forks_count / this.per_page);
            this.getForksData();
        } else {
          let repo = this.$route.params.repo.split(':');
      let userName = repo[0];
      let repoName = repo[1];
      axios.get(`http://localhost:8080/repos/${userName}/${repoName}`, this.config)
      .then(response => {
        let data = response.data;
        let repo_data = {
          repo_name: data.name,
          owner: data.owner.login,
          stars_count: data.stargazers_count,
          forks_url: data.forks_url,
          forks_count: data.forks_count
        }
        this.repo_info = repo_data;
        this.$store.commit('SET_REPO', repo_data);
        this.pages_count = Math.ceil(this.repo_info.forks_count / this.per_page);
        this.getForksData();
      }).catch(error => {
        console.log(error);
      })
        }
    },
  methods: {
    getForksData(){
      let userName = this.repo_info.owner;
      let repoName = this.repo_info.repo_name;
      axios.get(`http://localhost:8080/repos/${userName}/${repoName}/forks?page=${this.current_page}&per_page=${this.per_page}`)
      .then(response => {
          console.log('////////////',  response.data)
        this.forks_data = response.data;
      }).catch(error => {
        console.log(error);
      })
    },
    changePage(page) {
        console.log(page);
        let params = this.$route.params;
        params.id = page;
        this.$router.push({ name: this.$route.name, params: params })
        this.getForksData();
    },
  },
};
</script>
<style>
    .pagination {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }
</style>