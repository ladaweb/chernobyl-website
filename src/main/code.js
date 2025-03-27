// Initialize Leaflet Map
const map = L.map('map').setView([51.3890, 30.0995], 12);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// Add tourist site markers
const sites = [
    { name: "Reactor 4", coords: [51.3890, 30.0995] },
    { name: "Pripyat Ferris Wheel", coords: [51.4060, 30.0565] },
    { name: "Red Forest", coords: [51.3830, 30.1080] },
    { name: "Duga Radar", coords: [51.3777, 30.0730] },
    { name: "Chernobyl Town Monument", coords: [51.2786, 30.2241] }
];

sites.forEach(site => {
    L.marker(site.coords)
     .addTo(map)
     .bindPopup(`<b>${site.name}</b>`);
});
