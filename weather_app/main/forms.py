from django import forms


class WeatherForm(forms.Form):
    city = forms.CharField(max_length=100, required=False, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'City', 'id': 'city-input'}))
    latitude = forms.FloatField(required=True, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Latitude', 'id': 'latitude-input', 'name': 'latitude'}))
    longitude = forms.FloatField(required=True, widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Longitude', 'id': 'longitude-input', 'name': 'longitude'}))
