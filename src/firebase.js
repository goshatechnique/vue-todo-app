import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyALxjvLSDoSCUTdK_gzFIbHb4ZCAlBiZnA',
  authDomain: 'vue-todo-app-bf349.firebaseapp.com',
  databaseURL: 'https://vue-todo-app-bf349.firebaseio.com',
  projectId: 'vue-todo-app-bf349',
  storageBucket: 'vue-todo-app-bf349.appspot.com',
  messagingSenderId: '961229961142',
  appId: '1:961229961142:web:c126c2f3f2f1b91faff317',
};

const firebaseAPI = firebase.initializeApp(firebaseConfig);
export default firebaseAPI;
