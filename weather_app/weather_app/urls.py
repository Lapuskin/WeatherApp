from django.contrib import admin
from django.urls import path

from main.views import WeatherView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', WeatherView.as_view(), name='weather_url')
]
