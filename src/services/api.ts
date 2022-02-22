import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhst:3000/api'
})