import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/person',
    name: 'person',
    component: () => import(/* webpackChunkName: "about" */ '../views/Person.vue'),
  },
  {
    path: '/getTicket',
    name: 'getTicket',
    component: () => import(/* webpackChunkName: "GetTicket" */ '../views/GetTicket.vue'),
  },
  {
    path: '/ticketInfo',
    name: 'ticketInfo',
    component: () => import('../views/TicketInfo.vue'),
  },
  {
    path: '/ticketList',
    name: 'ticketList',
    component: () => import(/* webpackChunkName: "GetTicket" */ '../views/TicketList.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
