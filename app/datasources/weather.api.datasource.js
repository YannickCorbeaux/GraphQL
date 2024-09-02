import { RESTDataSource } from '@apollo/datasource-rest';

class WeatherAPI extends RESTDataSource {
  baseURL = 'http://api.weatherapi.com';

  async current({ y: lat, x: lng }) {
    const data = await this.get(`/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lng}`);

    const { current } = data;
    const mappedData = {
      temperature: current.temp_c,
      sky: current.condition.text,
      precipitation: current.precip_mm,
    };

    return mappedData;
  }
}

export default WeatherAPI;
