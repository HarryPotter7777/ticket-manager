import axios from "axios";

/**
 * Base api requests configuration.
 *
 * @return  void
 */
export default axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: '/api'
});