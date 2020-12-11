import React from "react";
import FirebaseKeys from "./config";
import { createAppContainer } from "react-navigation";
import Navigate from "./Navigate";

import * as firebase from "firebase";

var firebaseConfig = FirebaseKeys;

firebase.initializeApp(firebaseConfig);

export default createAppContainer(Navigate);
