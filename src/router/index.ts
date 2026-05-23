import { createRouter as Silian_createRouter, createWebHistory as Silian_createWebHistory } from 'vue-router';
import Silian_HomeView from '../views/HomeView.vue';
import Silian_RankView from '@/views/RankView.vue';
const Silian_router = Silian_createRouter({
    history: Silian_createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/dashboard',
            name: 'home',
            component: Silian_HomeView
        },
        {
            path: '/dashboard/rank',
            name: 'rank',
            component: Silian_RankView
        }
    ]
});
export default Silian_router;
