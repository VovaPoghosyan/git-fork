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

    .backdrop {
        width: 100%;
        height: 100%;
        background: #00000063;
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
    }

    .lds-ripple {
        display: inline-block;
        position: absolute;
        width: 80px;
        height: 80px;
        z-index: 11;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .lds-ripple div {
        position: absolute;
        border: 4px solid #ed143d;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    }
</style>