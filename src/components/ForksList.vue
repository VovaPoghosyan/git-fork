<template>
    <div class="container">
        <div>
            <template v-if="forks_data.length">
                <div>
                    <md-table>
                        <md-table-row>
                            <md-table-head>Repo Name</md-table-head>
                            <md-table-head>Repo Owner</md-table-head>
                            <md-table-head>Stars Count</md-table-head>
                            <md-table-head>Forks Count</md-table-head>
                            <md-table-head>Favorites</md-table-head>
                        </md-table-row>

                        <md-table-row
                            v-for="(repo, index) in forks_data"
                            :key="index"
                        >
                            <md-table-cell>{{ repo.name }}</md-table-cell>
                            <md-table-cell>{{ repo.owner.login }}</md-table-cell>
                            <md-table-cell>{{ repo.stargazers_count }}</md-table-cell>
                            <md-table-cell>{{ repo.forks_count }}</md-table-cell>
                            <md-table-cell>
                                <input
                                    :id="`toggle-heart-${index}`"
                                    class="toggle-heart"
                                    type="checkbox"
                                    :checked="favorite_repos[index]"
                                >
                                <label
                                    :for="`toggle-heart-${index}`"
                                    @click="favorites(index)"
                                    class="toggle-heart-label"
                                    aria-label="like"
                                >
                                    ❤
                                </label>
                            </md-table-cell>
                        </md-table-row>
                    </md-table>
                    <div class="pagination">
                        <md-button
                            :disabled="current_page === 1"
                            class="md-icon-button md-raised"
                            @click="changePage(--current_page)"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="black"
                                width="18px"
                                height="18px"
                            >
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                                <path
                                    d="M0 0h24v24H0z"
                                    fill="none"/>
                            </svg>
                        </md-button>
                        <md-button class="md-icon-button md-raised">
                            {{ current_page }}
                        </md-button>
                        <md-button
                            :disabled="current_page === pages_count"
                            class="md-icon-button md-raised"
                            @click="changePage(++current_page)"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="black"
                                width="18px"
                                height="18px"
                            >
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                                <path
                                    d="M0 0h24v24H0z"
                                    fill="none"/>
                            </svg>
                        </md-button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div />
            </template>
            <template v-if="loading">
                <div class="backdrop"/>
                <div class="lds-ripple">
                    <div/>
                    <div/>
                </div>
            </template>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ForksList',
    data(){
        return {
            current_page: 1,
            pages_count: 1,
            per_page: 10,
            forks_data: [],
            repo_info: {},
            loading: true,
            favorite_repos: [],
        };
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
                    };
                    this.repo_info = repo_data;
                    this.$store.commit('SET_REPO', repo_data);
                    this.pages_count = Math.ceil(this.repo_info.forks_count / this.per_page);
                    this.getForksData();
                }).catch(error => {
                    console.log(error);
                });
        }
    },
    methods: {
        getForksData(){
            this.loading = true;
            let userName = this.repo_info.owner;
            let repoName = this.repo_info.repo_name;
            axios.get(`http://localhost:8080/repos/${userName}/${repoName}/forks?page=${this.current_page}&per_page=${this.per_page}`)
                .then(response => {
                    this.favorite_repos = [];
                    let favorites = localStorage.getItem("favorite_repositories");
                    if(favorites !== null) {
                        favorites = JSON.parse(favorites);
                        console.log(favorites);
                        for (let val in response.data) {
                            this.favorite_repos[val] = !!favorites[response.data[val]['full_name']]
                        }
                    }
                    this.forks_data = response.data;
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                    console.log(error);
                });
        },
        changePage(page) {
            console.log(page);
            let params = this.$route.params;
            params.id = page;
            this.$router.push({ name: this.$route.name, params: params });
            this.getForksData();
        },

        favorites(index) {
            this.favorite_repos[index] = !this.favorite_repos[index];
            let data = this.forks_data[index];
            let favorites = localStorage.getItem("favorite_repositories");
            if(favorites === null) {
                favorites = {};
                favorites[data.full_name] = true;
            } else {
                favorites = JSON.parse(favorites);
                if(favorites[data.full_name]) {
                    delete favorites[data.full_name];
                } else {
                    favorites[data.full_name] = true;
                }
            }
            localStorage.setItem("favorite_repositories", JSON.stringify(favorites));
        },
    },
};
// <style lang="scss">
</script>
<style lang="scss">
    .pagination {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }

    $pi: 3.14159265359;
    $_precision: 10;

    @function pow($base, $exp) {
        $value: $base;
        @if $exp > 1 {
            @for $i from 2 through $exp {
                $value: $value * $base;
            }
        }
        @if $exp < 1{
            @for $i from 0 through -$exp {
                $value: $value / $base;
            }
        }
        @return $value;
    }

    @function fact($num) {
        $fact: 1;
        @if $num > 0{
            @for $i from 1 through $num {
                $fact: $fact * $i;
            }
        }
        @return $fact;
    }

    @function _to_unitless_rad($angle) {
        @if unit($angle) == "deg" {
            $angle: $angle / 180deg * $pi;
        }
        @if unit($angle) == "rad" {
            $angle: $angle / 1rad;
        }
        @return $angle;
    }

    @function sin($angle){
        $a: _to_unitless_rad($angle);
        $sin: $a;
        @for $n from 1 through $_precision {
            $sin: $sin + (pow(-1, $n) / fact(2 * $n + 1) ) * pow($a, (2 * $n + 1));
        }
        @return $sin;
    }

    @function cos($angle){
        $a: _to_unitless_rad($angle);
        $cos: 1;
        @for $n from 1 through $_precision {
            $cos: $cos + ( pow(-1,$n) / fact(2*$n) ) * pow($a,2*$n);
        }
        @return $cos;
    }

    @function tan($angle){
        @return sin($angle) / cos($angle);
    }

    // @import compass;

    $bubble-d: 4.5rem; // bubble diameter
    $bubble-r: .5*$bubble-d; // bubble-radius
    $sparkle-d: .375rem;
    $sparkle-r: .5*$sparkle-d;

    @mixin sparkles($k) {
        $shadow-list: ();
        $n-groups: 7;
        $group-base-angle: 360deg/$n-groups;
        $group-distr-r: (1 + $k*.25)*$bubble-r;
        $n-sparkles: 2;
        $sparkle-base-angle: 360deg/$n-sparkles;
        $sparkle-off-angle: 60deg; // offset angle from radius
        $spread-r: -$k*$sparkle-r;

        @for $i from 0 to $n-groups {
            $group-curr-angle: $i*$group-base-angle - 90deg;
            $xg: $group-distr-r*cos($group-curr-angle);
            $yg: $group-distr-r*sin($group-curr-angle);

            @for $j from 0 to $n-sparkles {
                $sparkle-curr-angle: $group-curr-angle +
                $sparkle-off-angle + $j*$sparkle-base-angle;
                $xs: $xg + $sparkle-d*cos($sparkle-curr-angle);
                $ys: $yg + $sparkle-d*sin($sparkle-curr-angle);

                $shadow-list: $shadow-list, $xs $ys 0 $spread-r
                hsl(($i + $j)*$group-base-angle, 100%, 75%);
            }
        }

        box-shadow: $shadow-list;
    }

    @mixin bubble($ext) {
        transform: scale(1);
        border-color: #cc8ef5;
        border-width: $ext;
    }

    .toggle-heart {
        position: absolute;
        left: -100vw;

        &:checked + label {
            color: crimson;
            filter: none;
            will-change: font-size;
            animation: heart 1s cubic-bezier(.17, .89, .32, 1.49);

            &:before, &:after {
                animation: inherit;
                animation-timing-function: ease-out;
            }

            &:before {
                will-change: transform, border-width, border-color;
                animation-name: bubble;
            }

            &:after {
                will-change: opacity, box-shadow;
                animation-name: sparkles;
            }
        }
    }

    .toggle-heart-label {
        align-self: center;
        position: relative;
        color: #888;
        font-size: 2em;
        filter: grayscale(1);
        user-select: none;
        cursor: pointer;


    }

    @keyframes heart {
        0%, 17.5% { font-size: 0; }
    }

    @keyframes bubble {
        15% { @include bubble($bubble-r); }
        30%, 100% { @include bubble(0); }
    }

    @keyframes sparkles {
        0%, 20% { opacity: 0; }
        25% {
            opacity: 1;
            @include sparkles(0);
        }
    }
</style>