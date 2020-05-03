<template>
<div class="container">
  
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
      axios.get(`https://api.github.com/repos/${userName}/${repoName}/orks?page=${current_page}`)
      .then(response => {
        this.forks_data = response.data;
      }).catch(error => {
        console.log(error);
      })
    },
  },
};
</script>