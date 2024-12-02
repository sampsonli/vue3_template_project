import { createRouter, createWebHashHistory } from 'vue-router';



const routes = [
    {
        path: '/',
        redirect: '/home'
    },
   /* {
        path: '/home',
        component: () => import('./views/Home'),
    },*/

];
((r) => {
    r.keys()
        .forEach((key) => {
            const module = r(key);
            const md = {
                component: module.default,
                path: `/${key.split('/')[1]}`,
            };
            routes.push(md);
        });
})(require.context('./views/', true, /\.\/[^/]+\/_index\.js$/));




const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;