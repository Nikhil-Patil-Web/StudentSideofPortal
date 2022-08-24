import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDsQi8iQorY_nKSJ5g4ehJl0t3FG0dtiMU',
  authDomain: 'crudreactwithfb.firebaseapp.com',
  projectId: 'crudreactwithfb',
  storageBucket: 'crudreactwithfb.appspot.com',
  messagingSenderId: '448971048395',
  appId: '1:448971048395:web:ba7984ddce490b64e2e24e',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
