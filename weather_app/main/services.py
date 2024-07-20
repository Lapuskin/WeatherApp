import aiohttp


class APIClient:
    def __init__(self, base_url):
        self.base_url = base_url

    async def get_data(self, endpoint: str,  params: dict = None):
        """
        The function makes a request to the API https://open-meteo.com/ to receive weather data.
        :param endpoint: endpoint route.
        :param params: dictionary containing parameters for retrieving weather data.
        :return: weather data defined by the function's input parameters.
        """
        url = f"{self.base_url}/{endpoint}"

        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                data = await response.json()
        return data


class WeatherAPIClient(APIClient):
    async def get_data(self, endpoint: str,  params: dict = None):
        data = await super().get_data(endpoint, params)
        await self.format_data_for_days(data)
        return data

    @classmethod
    async def format_data_for_days(self, data):
        result = []
        for i in range(len(data['daily']['time'])):
            day_data = {}
            for key, values in data['daily'].items():
                day_data[key] = values[i]
            result.append(day_data)
        data['daily'] = result
        return data
