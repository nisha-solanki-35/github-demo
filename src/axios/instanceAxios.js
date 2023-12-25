import axios from 'axios'

const instanceAxios = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization:
      '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'
  }
})

export default instanceAxios
