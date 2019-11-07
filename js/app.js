window.addEventListener('DOMContentLoaded', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/9d5605a949abbf6384eec35a0690ab36/${lat},${long}`;
            // const api = `https: //api.weather.yandex.ru/v1/forecast?lat=${lat}&lon=${long}`;
            console.log(api);
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    // Набор элементов DOM для API
                    temperatureDegree.textContent = Math.round((temperature - 32) * (5 / 9));
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Иконки
                   setIcons(icon, document.querySelector('.icon'));

                    //Меняем еденицу измерения C/F
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.round((temperature - 32) * (5 / 9));
                        } else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.round(temperature);
                        }
                    })

                })
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
});