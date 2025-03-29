const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'

interface WeatherResponse {
	temperature: number
	description: string
}

// Кеш в памяти (хранит данные 10 минут)
const cache = new Map<string, { data: WeatherResponse; timestamp: number }>()

export async function getWeather(city: string): Promise<WeatherResponse> {
	const cacheKey = city.toLowerCase().trim()
	const now = Date.now()

	// Проверяем кеш (данные актуальны 10 минут)
	if (cache.has(cacheKey)) {
		const cached = cache.get(cacheKey)
		if (cached && now - cached.timestamp < 600000) {
			// 10 минут в миллисекундах
			return cached.data // Возвращаем закешированные данные
		}
	}

	try {
		const url = `${apiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
		const response = await fetch(url)

		if (!response.ok) throw new Error(`Ошибка API: ${response.status}`)

		const apiData = await response.json()
		const result = {
			temperature: apiData.main.temp,
			description: apiData.weather[0].description,
		}

		// Обновляем кеш
		cache.set(cacheKey, {
			data: result,
			timestamp: now,
		})

		return result
	} catch (error) {
		console.error('Ошибка запроса погоды:', error)
		throw error
	}
}
