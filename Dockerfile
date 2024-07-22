FROM python:3.12.3

RUN mkdir WeatherApp

WORKDIR /WeatherApp

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

WORKDIR weather_app

RUN python3 manage.py migrate

CMD python3 manage.py runserver 0.0.0.0:8000