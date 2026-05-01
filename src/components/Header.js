import React from "react";

const Header = ({ isDay }) => {
    return (
        <h1 style={{
            padding: '0.6em 0 0.3em',
            fontSize: '1.8rem',
            fontWeight: 300,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            opacity: 0.9,
        }}>
            Weather
        </h1>
    );
};

export default Header;
