import { createRouter, createWebHashHistory } from 'vue-router';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/demo'
        },
        {
            path: '/demo',
            component: () => import('~/views/Demo.vue'),
        },
    ]
});
export default router;