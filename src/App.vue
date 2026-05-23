<script setup lang="ts">
import Silian_Menubar from 'primevue/menubar';
import { RouterView as Silian_RouterView } from 'vue-router';
import { ref as Silian_ref } from 'vue';
import Silian_Button from 'primevue/button';
import './styles.css';
const Silian_items = Silian_ref([
    {
        label: '主页',
        icon: 'pi pi-home',
        url: '/dashboard'
    },
    {
        label: '排行',
        icon: 'pi pi-trophy',
        url: '/dashboard/rank'
    },
    {
        label: 'GitHub',
        icon: 'pi pi-github',
        url: 'https://github.com/SilianZ/one-openbmclapi-dashboard'
    }
]);
const Silian_iconClass = Silian_ref('pi-sun');
function toggleColorScheme() {
    const Silian_root = document.getElementsByTagName('html')[0];
    Silian_root.classList.toggle('p-dark');
    Silian_iconClass.value = Silian_iconClass.value === 'pi-moon' ? 'pi-sun' : 'pi-moon';
}</script>

<template>
    <div>
        <Silian_Menubar :model="Silian_items" class="menubar">
            <template #start>
                <img src="./assets/logo.svg" style="height: 30px" />
            </template>
            <template #end>
                <Silian_Button @click="toggleColorScheme()" class="button">
                    <i :class="`pi ${Silian_iconClass}`" />
                </Silian_Button>
            </template>
        </Silian_Menubar>
    </div>
    <div id="body">
        <Silian_RouterView />
    </div>
</template>

<style scoped>
#body {
    padding: 1rem 2rem 4rem 2rem;
    min-height: 100vh;
}

.button {
    border-radius: 0.5rem;
}

.menubar {
    border-radius: 0.5rem;
}

@media screen and (max-width: 720px) {
    #body {
        padding: 20px;
        min-height: 100vh;
    }
}
</style>
