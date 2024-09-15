<script setup lang="ts">
import Menubar from 'primevue/menubar'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import Button from 'primevue/button'
import './styles.css'
const items = ref([
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
])

const iconClass = ref('pi-sun')

function toggleColorScheme() {
    const root = document.getElementsByTagName('html')[0]
    root.classList.toggle('p-dark')
    iconClass.value = iconClass.value === 'pi-moon' ? 'pi-sun' : 'pi-moon'
}
</script>

<template>
    <div>
        <Menubar :model="items" class="menubar">
            <template #start>
                <img src="./assets/logo.svg" style="height: 30px" />
            </template>
            <template #end>
                <Button @click="toggleColorScheme()" class="button">
                    <i :class="`pi ${iconClass}`" />
                </Button>
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
