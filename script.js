let map;

// Функција за прикажување на мапа
function showMap(lat, lon) {
    if (!map) {
        map = L.map('map').setView([lat, lon], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    } else {
        map.setView([lat, lon], 15);
    }
    L.marker([lat, lon]).addTo(map)
        .bindPopup(`Координати:<br>Lat: ${lat}<br>Lon: ${lon}`)
        .openPopup();
}

// Пробај GPS локација
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                showMap(pos.coords.latitude, pos.coords.longitude);
            },
            err => {
                console.warn("GPS недостапен, пробувам IP fallback...");
                getIPLocation();
            }
        );
    } else {
        console.warn("Нема поддршка за геолокација");
        getIPLocation();
    }
}

// IP fallback (користи бесплатен API)
function getIPLocation() {
    fetch("https://ipapi.co/json/")
        .then(res => res.json())
        .then(data => {
            showMap(data.latitude, data.longitude);
        })
        .catch(err => console.error("IP fallback не успеа:", err));
}

// Рефреш копче
document.getElementById("refreshBtn").addEventListener("click", getLocation);

// При старт
getLocation();
