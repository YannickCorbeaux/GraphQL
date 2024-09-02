import axios from 'axios';

class Weather {
  // Url de base de l'API qui permet d'accéder aux différents endpoints
  baseURL = 'http://api.weatherapi.com/v1/';

  constructor() {
    this.axios = axios.create({
      baseURL: this.baseURL,
    });
  }

  // Méthode qui permet de récupérer la météo du jour via le endpoint 'currect.json'
  async current({ y: lat, x: lng }) {
    // on doit faire un appel vers le endpoint en lui fournissant les paramètre de requête
    // On récupère les données de réponse
    const response = await this.axios.get(`/current.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lng}`);

    // on reformate les données pour se caller avec notre MCD
    const { current } = response.data;
    const mappedData = {
      temperature: current.temp_c,
      sky: current.condition.text,
      precipitation: current.precip_mm,
    };
    // En fin on retourner les données formatées
    return mappedData;
  }
}

export default new Weather();
