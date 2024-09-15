import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RankView from '@/views/RankView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/dashboard',
            name: 'home',
            component: HomeView
        },
        {
            path: '/dashboard/rank',
            name: 'rank',
            component: RankView
        }
    ]
})

export default router
