// Initialize the map
const map = L.map('map').setView([51.4046, 30.057], 12);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Determine marker color based on radiation level
function getMarkerColor(radiation) {
  if (radiation < 0.2) return 'green';
  if (radiation < 0.5) return 'orange';
  return 'red';
}

// Create custom colored marker icons
function createColoredIcon(color) {
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41]
  });
}

// Radiation sites with simulated values
const locations = [
  { lat: 51.3890, lng: 30.0995, name: "Reactor 4", description: "The site of the 1986 explosion.", radiation: 1.2, link: "reactor-4.html" },
  { lat: 51.3830, lng: 30.1080, name: "Red Forest", description: "Highly radioactive forest near the reactor.", radiation: 400, link: "red-forest.html" },
  { lat: 51.4085, lng: 30.0579, name: "The Hospital", description: "Basement holds radioactive clothing of first responders.", radiation: 0.4 },
  { lat: 51.4046, lng: 30.0571, name: "Middle School Number 3", description: "Gas masks scattered across abandoned classrooms.", radiation: 0.2 },
  { lat: 51.4064, lng: 30.0553, name: "Azure Swimming Pool", description: "One of the cleanest places in the zone, used until 1998.", radiation: 0.15 },
  { lat: 51.4069, lng: 30.0586, name: "Amusement Park", description: "Ferris wheel and bumper cars, never officially opened.", radiation: 0.3 },
  { lat: 51.5871, lng: 30.2033, name: "Duga Radar", description: "Soviet over-the-horizon radar system in the forest.", radiation: 0.1 },
  { lat: 51.2786, lng: 30.2241, name: "Chernobyl Town Monument", description: "Tribute to those who responded to the disaster.", radiation: 0.12 }
];

// Add markers to map
locations.forEach(loc => {
  const color = getMarkerColor(loc.radiation);
  const icon = createColoredIcon(color);
  const safeHours = Math.floor(1000 / loc.radiation); // based on 1 mSv/year limit

  const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);

  const popupContent = `
    <b>${loc.name}</b><br>
    ${loc.description}<br>
    <strong>Radiation:</strong> ${loc.radiation} µSv/h<br>
    <small><em>(µSv/h = microsieverts per hour)</em></small><br>
    <strong>Safe Exposure Time:</strong> ~${safeHours} hours/year
  `;

  marker.bindPopup(popupContent);

  // Hover preview
  marker.on("mouseover", () => marker.openPopup());
  marker.on("mouseout", () => marker.closePopup());

  // Redirect on click if page link provided
  if (loc.link) {
    marker.on("click", () => window.location.href = loc.link);
  }
});

// Add legend to bottom right
const legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  const div = L.DomUtil.create("div", "info legend bg-white bg-opacity-80 p-3 rounded shadow-md text-sm");
  div.innerHTML += "<strong>Radiation Levels</strong><br>";
  div.innerHTML += '<i style="background:green; width:12px; height:12px; display:inline-block; margin-right:4px;"></i> Safe (< 0.2)<br>';
  div.innerHTML += '<i style="background:orange; width:12px; height:12px; display:inline-block; margin-right:4px;"></i> Moderate (0.2–0.5)<br>';
  div.innerHTML += '<i style="background:red; width:12px; height:12px; display:inline-block; margin-right:4px;"></i> High (> 0.5)<br>';
  return div;
};

legend.addTo(map);
