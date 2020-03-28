import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'
firebase.initializeApp(firebaseConfig)

const storageRef = firebase.storage().ref().child('restaurants')

export default storageRef;
