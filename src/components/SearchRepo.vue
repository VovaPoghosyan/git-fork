<template>
<div class="container">
  <div class="search-container">
    <input
      type="text"
      placeholder="Owner:Repo-name"
      v-model="fullRepoName"
      @keypress.enter.exact.prevent="findRepo()"
    >
    <div class="search"></div>
  </div>
  <div
    class="table-container"
    v-if="Object.keys(repo_data).length"
  >
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>Repo Name</md-table-head>
        <md-table-head>Repo Owner</md-table-head>
        <md-table-head>Stars Count</md-table-head>
        <md-table-head>Forks Count</md-table-head>
        <md-table-head>Forks Url</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell>{{repo_data.repo_name}}</md-table-cell>
        <md-table-cell>{{repo_data.owner}}</md-table-cell>
        <md-table-cell>{{repo_data.stars_count}}</md-table-cell>
        <md-table-cell>{{repo_data.forks_count}}</md-table-cell>
        <md-table-cell>
          <mdb-nav-item :to="{ name: 'forks-list', params: {repo: fullRepoName, id:'1'} }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
          </mdb-nav-item>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>

    
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
        config: {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
    }
  },
  methods: {
    findRepo(){
      let repo = this.fullRepoName.split(':');
      this.userName = repo[0];
      this.repoName = repo[1];
      axios.get(`https://api.github.com/repos/${this.userName}/${this.repoName}`, this.config)
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

<style>
  li {
    list-style-type: none;
  }
  .search-container {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    height: 100px;
  }
  .search-container .search {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 80px;
    background: crimson;
    border-radius: 50%;
    transition: all 1s;
    z-index: 4;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);
  }
  .search-container .search:hover {
    cursor: pointer;
  }
  .search-container .search::before {
    content: "";
    position: absolute;
    margin: auto;
    top: 22px;
    right: 0;
    bottom: 0;
    left: 22px;
    width: 12px;
    height: 2px;
    background: white;
    transform: rotate(45deg);
    transition: all 0.5s;
  }
  .search-container .search::after {
    content: "";
    position: absolute;
    margin: auto;
    top: -5px;
    right: 0;
    bottom: 0;
    left: -5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid white;
    transition: all 0.5s;
  }
  .search-container input {
    font-family: 'Inconsolata', monospace;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 50px;
    outline: none;
    border: none;
    background: crimson;
    color: white;
    text-shadow: 0 0 10px crimson;
    padding: 0 80px 0 20px;
    border-radius: 30px;
    box-shadow: 0 0 25px 0 crimson, 0 20px 25px 0 rgba(0, 0, 0, 0.2);
    transition: all 1s;
    opacity: 0;
    z-index: 5;
    font-weight: bolder;
    letter-spacing: 0.1em;
  }
  .search-container input:hover {
    cursor: pointer;
  }
  .search-container input:focus {
    width: 300px;
    opacity: 1;
    cursor: text;
  }
  .search-container input:focus ~ .search {
    right: -250px;
    background: #151515;
    z-index: 6;
  }
  .search-container input:focus ~ .search::before {
    top: 0;
    left: 0;
    width: 25px;
  }
  .search-container input:focus ~ .search::after {
    top: 0;
    left: 0;
    width: 25px;
    height: 2px;
    border: none;
    background: white;
    border-radius: 0%;
    transform: rotate(-45deg);
  }
  .search-container input::placeholder {
    color: white;
    opacity: 0.5;
    font-weight: bolder;
  }
  
</style>