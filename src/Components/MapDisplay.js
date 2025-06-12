import React from 'react';

const MapDisplay = ({ lat, lon, city }) => {
    const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.05}%2C${lat - 0.05}%2C${lon + 0.05}%2C${lat + 0.05}&layer=mapnik&marker=${lat}%2C${lon}`;

    return (
        <div className="map-container">
            <iframe
                title={`Карта ${city}`}
                src={mapSrc}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default MapDisplay;