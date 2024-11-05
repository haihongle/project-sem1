import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3080",
  headers: {
    "Content-type": "application/json"
  }
});