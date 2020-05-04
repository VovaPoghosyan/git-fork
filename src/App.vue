<template>
    <div 
        id="app" 
        class="flexible-content">
        <Header/>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
import Header from './components/Header';
export default {
    name: 'App',
    components: {
        Header,
    },
    mounted() {

    },
};
</script>