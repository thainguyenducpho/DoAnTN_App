import * as firebase from "firebase";

let config = {
  apiKey: "AIzaSyA7LmnMPvY0ZhQbmavAb7ihYMb_ftEoKS8",
  authDomain: "datn-52c1d.firebaseapp.com",
  databaseURL: "https://datn-52c1d.firebaseio.com",
  projectId: "datn-52c1d",
  storageBucket: "datn-52c1d.appspot.com",
  messagingSenderId: "336210289133",
  appId: "1:336210289133:web:976e90b8402b92bb73c7e4",
  measurementId: "G-D0S8KP52RG",
};
let app = firebase.initializeApp(config);
export const FirebaseKeys = app.database();

// export default FirebaseKeys = {
//   apiKey: "AIzaSyA7LmnMPvY0ZhQbmavAb7ihYMb_ftEoKS8",
//   authDomain: "datn-52c1d.firebaseapp.com",
//   databaseURL: "https://datn-52c1d.firebaseio.com",
//   projectId: "datn-52c1d",
//   storageBucket: "datn-52c1d.appspot.com",
//   messagingSenderId: "336210289133",
//   appId: "1:336210289133:web:976e90b8402b92bb73c7e4",
//   measurementId: "G-D0S8KP52RG",
// };
