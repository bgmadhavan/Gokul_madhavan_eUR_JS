const app = {

    key : '4bab37b887ee0002d47d7985bf3336e7',

    init: ()=>{
        document.getElementById('getWeather').addEventListener('click',app.getLocation);
        document.getElementById('getLocation').addEventListener('click',app.useCurrentLocation);
    },

    getLocation : (ev) =>{
        const cityName = document.getElementById('city').value;
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${app.key}`;
        fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error('Enter a location!');
            }
            return response.json();
        })
        .then(data =>{
            app.getWeather(data);
        })
        .catch(err =>{
            alert(err);
        })
    },

    useCurrentLocation : ()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(app.format,app.showError);
        }
        else{
            alert('Geolocation is not supported');
        }
    },

    format : (position)=>{
        const required_param = [{
            "lat":position.coords.latitude,
            "lon":position.coords.longitude
        }]
        app.getWeather(required_param);
    },

    getWeather : (data) =>{
        const latitude = data[0].lat; 
        const longitude = data[0].lon;
        const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${app.key}&units=metric`

        fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error('Weather api failed')
            }
            return response.json();
        })
        .then(data =>{
            app.displayResults(data);
        })
        .catch(err =>{
            alert(err);
        })

    },

    displayResults : (data)=>{

        const result = document.getElementById('results');
        result.innerHTML = '';

        const dummy = document.createElement('div');
        dummy.classList.add('dummy');

        const loc = document.createElement('h2');
        loc.classList.add('inline-loc');
        loc.textContent = `${(data.city.name).toUpperCase()}`;
        if(data.city.name == 'Park Town'){
            loc.textContent = `Chennai`;
        }
        result.appendChild(loc);
        iter = 0;
        data.list.map((day,ind)=>{
            let today = new Date(Date.now());
            today.setDate(today.getDate()+iter);
            if(today.toISOString().split('T')[0] == day.dt_txt.split(' ')[0] && iter<=2){
                console.log(today.toISOString().split('T')[0],day.dt_txt.split(' ')[0]);
                const weatherImage = document.createElement('div');
                weatherImage.classList.add('weatherImage');
                const image = document.createElement('img');
                const url = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
                image.src = url;
                weatherImage.appendChild(image);

                const details = {
                    "Date": day.dt_txt.split(' ')[0],
                    "Temperature":day.main.temp+' \u00B0C',
                    "Feels-like":day.main.feels_like+' \u00B0C',
                    "Humidity":day.main.humidity+' %',
                    "Weather":day.weather[0].main,
                    "Wind":day.wind.speed +' m/s',
                    "Visibility":((day.visibility)/1000)+' km',
                }

                const weatherResults = document.createElement('div');
                weatherResults.classList.add('weatherResults');
                const table = document.createElement('table');

                Object.entries(details).forEach(([key, value]) => {
                    const row = document.createElement('tr');

                    const label = document.createElement('td');
                    label.textContent = key;

                    const semi = document.createElement('td');
                    semi.textContent = ':';

                    const val = document.createElement('td');
                    val.textContent = value;

                    row.appendChild(label);
                    row.appendChild(semi);
                    row.appendChild(val);
                    table.appendChild(row);
                });

                weatherResults.appendChild(table);

                const bundle = document.createElement('div');
                bundle.classList.add('bundle');
                bundle.appendChild(weatherImage);
                bundle.appendChild(weatherResults);

                dummy.appendChild(bundle);
                iter++;
            }
        })

        result.appendChild(dummy);
        document.getElementById('city').value = '';

    },

    showError :(error)=>{
        switch (error.code) {
            case error.PERMISSION_DENIED:
                document.getElementById('location').innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                document.getElementById('location').innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                document.getElementById('location').innerHTML = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                document.getElementById('location').innerHTML = "An unknown error occurred.";
                break;
        }
    }

}

document.addEventListener('DOMContentLoaded',app.init);