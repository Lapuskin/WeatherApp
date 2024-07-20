import asyncio

from django.shortcuts import render
from django.views import View

from main.forms import WeatherForm
from main.services import WeatherAPIClient


class WeatherView(View):
    APIClient = WeatherAPIClient(base_url='https://api.open-meteo.com')

    def get(self, request):
        form = WeatherForm()
        return render(request, 'weather.html', {'form': form})

    def post(self, request):
        form = WeatherForm(request.POST)
        if form.is_valid():
            latitude = form.cleaned_data['latitude']
            longitude = form.cleaned_data['longitude']
            params = {
                "latitude": latitude,
                "longitude": longitude,
                "daily": ["temperature_2m_max", "temperature_2m_min"]
            }
            weather_data = asyncio.run(self.APIClient.get_data(params=params, endpoint='v1/forecast'))
            return render(request, 'weather.html', {'weather_data': weather_data, 'form': form})
