// Initialize the map
const map = L.map('map').setView([51.4046, 30.057], 12);

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Radiation danger zone overlays
const radiationCircles = [
  { lat: 51.3890, lng: 30.0995, name: "Reactor 4", intensity: 120 },
  { lat: 51.3830, lng: 30.1080, name: "Red Forest", intensity: 80 }
];

radiationCircles.forEach(zone => {
  L.circle([zone.lat, zone.lng], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.4,
    radius: zone.intensity * 10
  }).addTo(map);
});

// Marker definitions
const locations = [
  {
    lat: 51.4046, lng: 30.0571,
    name: "Middle School Number 3",
    description: "Gas masks scattered inside classrooms."
  },
  {
    lat: 51.4085, lng: 30.0579,
    name: "The Hospital",
    description: "First responders' radioactive clothing stored in basement."
  },
  {
    lat: 51.4064, lng: 30.0553,
    name: "The Azure Swimming Pool",
    description: "Used until 1998 by liquidators. One of the cleanest today."
  },
  {
    lat: 51.4069, lng: 30.0586,
    name: "The Amusement Park",
    description: "Abandoned ferris wheel, symbol of the ghost city."
  },
  {
    lat: 51.5871, lng: 30.2033,
    name: "The Duga Radar",
    description: "Massive Soviet radar array near Chernobyl."
  },
  {
    lat: 51.3890, lng: 30.0995,
    name: "Reactor 4",
    description: "Click to view live radiation data.",
    link: "reactor-4.html"
  },
  {
    lat: 51.3830, lng: 30.1080,
    name: "Red Forest",
    description: "Click to learn about one of the most radioactive places on Earth.",
    link: "red-forest.html"
  },
  {
    lat: 51.2786, lng: 30.2241,
    name: "Chernobyl Town Monument",
    description: "Tribute to those who responded to the disaster."
  }
];

// Add markers
locations.forEach(loc => {
  const marker = L.marker([loc.lat, loc.lng]).addTo(map);
  marker.bindPopup(`<b>${loc.name}</b><br>${loc.description}`);

  // Hover to preview
  marker.on("mouseover", function () {
    this.openPopup();
  });
  marker.on("mouseout", function () {
    this.closePopup();
  });

  // Click to redirect if there's a link
  if (loc.link) {
    marker.on("click", function () {
      window.location.href = loc.link;
    });
  }
});
