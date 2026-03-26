import axios from 'axios'

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

export const getNews = async (page = 1, pageSize = 10) => {
	try {
		const response = await axios.get(`${BASE_URL}top-headlines?country=us`, {
		//const response = await axios.get(`${BASE_URL}everything?q`, {
			params: {
				//api_token: API_KEY
				apiKey: API_KEY,
				page,
				pageSize
			}
		})
		return response.data
	} catch (error) {
		console.log(error)
	}
}