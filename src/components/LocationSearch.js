import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { searchLocations } from "../apis/getCurrentWeather";

const useStyles = makeStyles({
    wrapper: {
        position: 'relative',
        width: '320px',
        maxWidth: '80vw',
        alignSelf: 'center',
    },
    textInput: {
        height: '44px',
        fontSize: '15px',
        width: '100%',
        border: 'none',
        borderRadius: '22px',
        padding: '0 20px',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        color: 'inherit',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        '&::placeholder': {
            opacity: 0.6,
        },
        '&:focus': {
            background: 'rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
    },
    dropdown: {
        position: 'absolute',
        top: 'calc(100% + 6px)',
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: '14px',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    },
    option: {
        padding: '12px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background 0.15s ease',
        '&:hover': {
            background: 'rgba(255,255,255,0.15)',
        },
    },
});

const LocationSearch = ({ isDay, onSelect }) => {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const timerRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target))
                setShowDropdown(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        if (timerRef.current) clearTimeout(timerRef.current);
        if (val.length < 3) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }
        timerRef.current = setTimeout(async () => {
            try {
                const results = await searchLocations(val);
                setSuggestions(results);
                setShowDropdown(results.length > 0);
            } catch {
                setSuggestions([]);
            }
        }, 400);
    };

    const handleSelect = (location) => {
        const label = `${location.name}${location.state ? ', ' + location.state : ''}, ${location.country}`;
        setQuery(label);
        setShowDropdown(false);
        onSelect(location);
    };

    return (
        <div className={classes.wrapper} ref={wrapperRef}>
            <input
                type="text"
                value={query}
                placeholder="Search for a city..."
                onChange={handleChange}
                className={classes.textInput}
                style={{ color: isDay ? '#1a1a2e' : '#f0f0f0' }}
            />
            {showDropdown && (
                <div
                    className={classes.dropdown}
                    style={{
                        background: isDay ? 'rgba(255,255,255,0.7)' : 'rgba(30,40,60,0.85)',
                        border: `1px solid ${isDay ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                >
                    {suggestions.map((loc, i) => (
                        <div
                            key={`${loc.lat}-${loc.lon}-${i}`}
                            className={classes.option}
                            style={{ color: isDay ? '#1a1a2e' : '#f0f0f0' }}
                            onClick={() => handleSelect(loc)}
                        >
                            {loc.name}{loc.state ? `, ${loc.state}` : ''}, {loc.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSearch;
