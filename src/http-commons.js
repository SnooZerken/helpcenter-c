import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8080",
  baseURL: "http://helpcenter-eprochelpcenter.apps.us-east-1.starter.openshift-online.com:80",
  headers: {
    "Content-type": "application/json",
  },
  mode : "no-cors"
});