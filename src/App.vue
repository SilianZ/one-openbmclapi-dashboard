<script setup lang="ts">
import Menubar from 'primevue/menubar';
import { RouterView } from 'vue-router';
import { ref } from 'vue'; 
const items = ref([
    {
        label: '主页',
        icon: 'pi pi-home',
        url: '/',
    },
    {
        label: 'GitHub',
        icon: 'pi pi-github',
        url: 'https://github.com/TTB-Network/python-openbmclapi'
    }
])
</script>


<template>
    <div>
        <Menubar :model="items">
            <template #start>
                <img src="./assets/logo.svg" height="30" />
            </template>
        </Menubar>
    </div>
    <div id="body">
        <RouterView />
    </div>
</template>

<style scoped>
#body {
	padding: 1rem 2rem 4rem 2rem;
	min-height: 100vh;
}
</style>