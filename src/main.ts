import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.js';
import router from './router';
import './main.scss';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBkFxDzi4UICW10WZf_rSDHb5CXuWhQYFA',
  authDomain: 'taskmanager-9557b.firebaseapp.com',
  projectId: 'taskmanager-9557b',
  storageBucket: 'taskmanager-9557b.appspot.com',
  messagingSenderId: '999678865868',
  appId: '1:999678865868:web:6cde90bbaee9646ac8ed69',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app');
