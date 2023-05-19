import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
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
})
export default router;