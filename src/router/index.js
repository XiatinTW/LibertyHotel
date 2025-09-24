import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/FullpageHome.vue';
import RoomList from '@/components/roomlist.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/roomlist',
      name: 'RoomList',
      component: RoomList
    }
  ]
});
