import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDNvv1mHP_pMJw5zPlnWGarwTW-ojfwUZM',
  authDomain: 'greener-frontend-challenge.firebaseapp.com',
  projectId: 'greener-frontend-challenge',
  storageBucket: 'greener-frontend-challenge.appspot.com',
  messagingSenderId: '1030347470826',
  appId: '1:1030347470826:web:66b2e87f2cc27541126493',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
