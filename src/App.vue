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

<style>
    body::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 10px #ed143d94;
        background-color: #ed143d94;
    }

    body::-webkit-scrollbar {
        width: 10px;
        background-color: #F5F5F5;
    }

    body::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 5px;
    }
</style>