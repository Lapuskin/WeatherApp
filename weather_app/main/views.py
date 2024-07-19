from django.shortcuts import render
from django.views import View


class WeatherView(View):
    def get(self, request):
        return render(request, 'weather.html')
