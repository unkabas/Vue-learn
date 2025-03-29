<script setup lang="ts">
import { ref } from 'vue'
import { getWeather } from './api/weather'

const cityInput = ref('')
const city = ref('')
const loading = ref(false)
const error = ref('')
const weatherData = ref<{
	temperature: number
	description: string
} | null>(null)

async function fetchWeather() {
	if (!cityInput.value.trim()) return
	city.value = cityInput.value
	loading.value = true
	error.value = ''
	weatherData.value = null

	try {
		const data = await getWeather(cityInput.value)
		weatherData.value = {
			temperature: data.temperature,
			description: data.description,
		}
	} catch (err) {
		error.value = 'Не удалось получить данные о погоде'
		console.error(err)
	} finally {
		loading.value = false
	}
}
</script>

<template>
	<div class="weather-app">
		<h1>Погодное приложение</h1>

		<div class="search-container">
			<input
				v-model="cityInput"
				type="text"
				placeholder="Введите город"
				@keyup.enter="fetchWeather"
			/>
			<button @click="fetchWeather">Получить погоду</button>
		</div>

		<div v-if="loading" class="loading">Загрузка...</div>
		<div v-if="error" class="error">{{ error }}</div>

		<div v-if="weatherData" class="weather-info">
			<h2>Погода в {{ city }}</h2>
			<p>Температура: {{ weatherData.temperature }}°C</p>
			<p>Описание: {{ weatherData.description }}</p>
		</div>
	</div>
</template>

<style scoped>
.weather-app {
	max-width: 100%;
	margin: 0 auto;
	padding: 20px;
	text-align: center;
	box-sizing: border-box;
}

.search-container {
	margin: 20px 0;
	display: flex;
}

input {
	padding: 8px;
	width: 100%;
	max-width: 300px;
	margin-right: 10px;
	box-sizing: border-box;
}

button {
	padding: 8px 16px;
	background-color: #42b983;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

button:hover {
	background-color: #33a06f;
}

.loading {
	margin: 20px 0;
	color: #666;
}

.error {
	margin: 20px 0;
	color: red;
}

.weather-info {
	margin-top: 20px;
	padding: 20px;
	background-color: #33a06f;
	border-radius: 8px;
}
</style>
