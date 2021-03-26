import firebase from "firebase"

let firebaseConfig = {
    apiKey: "AIzaSyASWzyRjBuQ97djqgpmm0toF7wRxSeGgT0",
    authDomain: "flow-609c0.firebaseapp.com",
    projectId: "flow-609c0",
    storageBucket: "flow-609c0.appspot.com",
    messagingSenderId: "779121560180",
    appId: "1:779121560180:web:1da31e87127095ffc49f21"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function useFirebase(){
    return {firebase: firebase}
} 
