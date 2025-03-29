const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'
interface WeatherResponse {
	temperature: number
	description: string
}

export async function getWeather(city: string): Promise<WeatherResponse> {
	try {
		const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const data = await response.json()
		return {
			temperature: data.main.temp,
			description: data.weather[0].description,
		}
	} catch (error) {
		console.error('Error fetching weather data:', error)
		throw error
	}
}
