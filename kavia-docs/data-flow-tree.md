# Data Flow Tree: React Weather Application

This document provides a data flow analysis for the React-based Weather application found in this repository. It demonstrates how data such as the user's city query moves through the app, resulting in weather results and a computed comfort score being rendered in the UI.

---

## Overview

The application enables a user to search the weather for a city. The main sequence of data movement is:

1. **User enters a city in the search box.**
2. **API call** to OpenWeatherMap fetches weather data for that city.
3. **Received weather data** is stored in the application's state.
4. **Derived values** (AQI, UV index, and comfort score) are calculated using utility functions and local heuristics.
5. **UI renders** weather data and score to the user.

---

## Data Flow Diagram

```mermaid
flowchart TD
    A["User inputs city name (search box)"] -->|onKeyPress ('Enter')| B["fetchWeather(query) API call"]
    B -->|OpenWeatherMap weather data response| C["weather state updated"]
    C --> D["Estimate AQI, UV Index"]
    D --> E["computeComfortScore(temperature, wind, humidity, AQI, UV)"]
    E --> F["State: canGoScore, scoreFactors"]
    C --> G["UI Renders Weather: city, description, icon, temperature"]
    F --> G
    G["UI Renders Comfort Score and factors"]
```

---

## Step-by-step Data Flow Explanation

### 1. User Input
- The user enters a city name into the search box (input field in `App.js`).
- When the user presses 'Enter', the `search` function triggers.

### 2. API Call
- `search` function calls `fetchWeather(query)` (`src/api/fetchWeather.js`):
  - Uses Axios to request weather data for the queried city from OpenWeatherMap.
  - Response contains temperature, weather condition, wind, humidity, and more.

### 3. State Update
- The weather API response is stored in the local React state variable `weather`.
- The input field `query` is reset to empty.

### 4. Derived Data Calculation
- **AQI and UV Index:**  
  - Heuristic functions `estimateAQI(weather)` and `estimateUVIndex(weather)` create fallback estimates from the weather response.
- **Comfort Score:**  
  - `computeComfortScore({ temperature, wind, humidity, airQuality, uvIndex })` calculates a "Can I Go Outside?" score (1–10) based on ideal ranges for each parameter.
  - The breakdown of parameters (score factors) is prepared for tooltip display.

### 5. UI Rendering
- If valid weather data exists, UI components render:
  - **City details** (name, country)
  - **Temperature** (converted from Kelvin to Celsius)
  - **Weather description and icon**
  - **Comfort score** and a tooltip with calculation criteria and current values

---

## Detailed Data Paths

- **Input ➔ API:**  
  User string ➔ `fetchWeather(query)` ➔ OpenWeatherMap Request

- **API Response ➔ State:**  
  OpenWeatherMap data ➔ `setWeather(data)`

- **State ➔ Processing:**  
  `weather` provides input for:
    - `estimateAQI(weather)`
    - `estimateUVIndex(weather)`
    - `computeComfortScore({ ... })`

- **State & Derived ➔ UI:**  
  All values are used directly or indirectly to format and display the results, icons, and the Comfort Score for the user's query.

---

## Source Files Referenced

- [`src/App.js`](../src/App.js): UI, state logic, triggers API call
- [`src/api/fetchWeather.js`](../src/api/fetchWeather.js): API data fetch utility
- [`src/utils/comfortScore.js`](../src/utils/comfortScore.js): Score computation logic

---

## Summary

This data flow tree demonstrates the end-to-end journey of user interaction from entering a city, through fetching and processing remote weather data, to presenting a comfort-oriented score and visual feedback within the application UI.

