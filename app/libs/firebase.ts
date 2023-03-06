import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyAraD7eeN358IK0XeqVrlE4euBhcwuAQhk',
    authDomain: 'warp-app-1933f.firebaseapp.com',
    projectId: 'warp-app-1933f',
    storageBucket: 'warp-app-1933f.appspot.com',
    messagingSenderId: '53257106628',
    appId: '1:53257106628:web:80fe33bf3207b084c30591',
    measurementId: 'G-208E8CQNTW'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage(app)
