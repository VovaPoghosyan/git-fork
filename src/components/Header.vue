<template>
    <md-toolbar
        class="md-accent"
        md-elevation="1">
        <h3
            class="md-title"
            style="flex: 1"
        >
            <md-button :to="{ name: 'search-repo' }">
                Git-forks
            </md-button>
        </h3>
        <md-button :to="{ name: 'search-repo' }">Search Repo</md-button>
        <md-button
            :to="{ name: 'search-user' }"
            class="md-primary"
        >
            Search User
        </md-button>
    </md-toolbar>

</template>

<script>

export default {
    name: 'Header',
};
</script>
<style>
    .md-toolbar.md-theme-default.md-accent {
        background: crimson!important;
    }
</style>