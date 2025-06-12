import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const API_KEY = '92b3a1df70c04ac1a61d74a5cc9b2e58';

const CitySearch = ({
                        onCitySelect,
                        selectedOption: externalSelectedOption,
                    }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const customStyles = {
        option: (provided) => ({
            ...provided,
            color: '#2d3748',
        }),
    };

    const loadOptions = async (inputValue) => {
        if (!inputValue) return [];

        try {
            const response = await axios.get(
                'https://api.openweathermap.org/geo/1.0/direct',
                {
                    params: {
                        q: inputValue,
                        limit: 10,
                        appid: API_KEY,
                        lang: 'ru',
                    },
                }
            );

            const seen = new Set();

            return response.data
                .filter((place) => {
                    const key = `${place.name}|${place.country}`;
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                })
                .map((place) => {
                    const countryName = new Intl.DisplayNames(['ru'], { type: 'region' }).of(place.country) || place.country;

                    return {
                        value: {
                            name: place.local_names?.ru || place.name,
                            lat: place.lat,
                            lon: place.lon,
                            country: place.country,
                        },
                        label: `${place.local_names?.ru || place.name}, ${countryName}`
                    };
                });
        } catch (err) {
            console.error('Ошибка загрузки городов:', err);
            return [];
        }
    };

    const handleSelect = (selected) => {
        if (selected?.value) {
            onCitySelect(selected.value);
            setSelectedOption(selected);
        }
    };

    return (
        <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            onChange={handleSelect}
            placeholder="Введите город (поиск по всему миру)"
            styles={customStyles}
            value={externalSelectedOption || selectedOption}
        />
    );
};

CitySearch.propTypes = {
    onCitySelect: PropTypes.func.isRequired,
    selectedOption: PropTypes.object,
    width: PropTypes.string
};

export default CitySearch;