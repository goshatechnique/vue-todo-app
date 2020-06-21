import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Initial',
    component: () => import('../views/Initial.vue'),
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: () => import('../views/Task.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
