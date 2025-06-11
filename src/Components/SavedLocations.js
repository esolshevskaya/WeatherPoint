// src/Components/SavedLocations.js
import React from 'react';
import './SavedLocations.css';
import axios from "axios";

const SavedLocations = ({ locations, onLocationSelect }) => {
    return (
        <div className="saved-container">
            <h3>Сохранённые города</h3>
            {locations.length === 0 ? (
                <p className="no-saved-cities">Нет сохранённых городов</p>
            ) : (
                <div className="saved-list">
                    {locations.map((location, index) => (
                        <button
                            key={index}
                            className="saved-city"
                            onClick={async () => {
                                try {
                                    const geo = await axios.get(
                                        'https://api.openweathermap.org/geo/1.0/direct',
                                        {
                                            params: {
                                                q: location,
                                                limit: 1,
                                                appid: '92b3a1df70c04ac1a61d74a5cc9b2e58',
                                                lang: 'ru',
                                            }
                                        }
                                    );
                                    const data = geo.data[0];

                                    onLocationSelect({
                                        name: data.local_names?.ru || data.name,
                                        lat: data.lat,
                                        lon: data.lon,
                                        country: data.country
                                    });
                                } catch (err) {
                                    console.error('Ошибка получения координат сохранённого города:', err);
                                }
                            }}
                        >
                            {location}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedLocations;