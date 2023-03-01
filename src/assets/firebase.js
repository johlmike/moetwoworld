import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyASpcAwBIg-POSgfmjwd9dwwQFIylgSpWo',
  authDomain: 'moe2world.firebaseapp.com',
  databaseURL: 'https://moe2world.firebaseio.com',
  projectId: 'moe2world',
  storageBucket: 'moe2world.appspot.com',
  messagingSenderId: '927352095671',
  appId: '1:927352095671:web:6a325fa8b6c8fe2e1e1e32',
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const academyCollection = db.collection('academy');
const newsCollection = db.collection('news');

// export utils/refs
export {
  db,
  auth,
  academyCollection,
  newsCollection,
};
