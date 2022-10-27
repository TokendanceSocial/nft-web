import { createApp } from 'vue';
import VConsole from 'vconsole';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/reset.styl';

// const vConsole = new VConsole();
// or init with options
const vConsole = new VConsole({ theme: 'dark' });
console.log(vConsole);
createApp(App).use(store).use(router).mount('#app');
