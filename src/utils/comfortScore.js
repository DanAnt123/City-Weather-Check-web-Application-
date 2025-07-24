//
// Utility function to compute the "Can I Go Outside?" comfort score
// Scores range from 1 (very uncomfortable) to 10 (ideal conditions).
// The function expects temperature (C), wind speed (m/s), humidity (%), airQuality (AQI), and uvIndex as inputs.
//
// All factors are heuristically weighted. You can fine-tune the scoring logic as needed.
//
// PUBLIC_INTERFACE
export function computeComfortScore({
  temperature,    // in Celsius
  wind,           // in m/s
  humidity,       // in percent
  airQuality,     // AQI value, lower is better
  uvIndex         // 0-11+
}) {
  // --- Scoring factors (each 0-2 points) ---
  let score = 0;

  // Temperature: ideal 18–25°C
  if (temperature >= 18 && temperature <= 25) score += 2;
  else if (temperature >= 14 && temperature <= 28) score += 1;
  // temperature outside that = 0

  // Wind: ideal < 6 m/s
  if (wind <= 3) score += 2;
  else if (wind > 3 && wind <= 6) score += 1;
  // very windy, 0

  // Humidity: ideal 30-60%
  if (humidity >= 30 && humidity <= 60) score += 2;
  else if ((humidity >= 20 && humidity < 30) || (humidity > 60 && humidity <= 75)) score += 1;

  // Air Quality Index (AQI): ideal <=50 (Good)
  if (airQuality <= 50) score += 2;
  else if (airQuality > 50 && airQuality <= 100) score += 1;

  // UV Index: ideal <= 3
  if (uvIndex <= 3) score += 2;
  else if (uvIndex > 3 && uvIndex <= 7) score += 1;

  // Total score: 0–10, map to at least 1
  score = Math.max(1, Math.round(score));

  return score;
}
