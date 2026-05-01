import React from "react";

const Card = ({ height, width, padding, margin, isDay, children }) => {
    return (
        <div
            style={{
                height: height || "18em",
                width: width || "11em",
                padding: padding || "0.8em",
                margin: margin || "0.5em",
                borderRadius: "16px",
                border: `1px solid ${isDay ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)'}`,
                background: isDay
                    ? 'rgba(255, 255, 255, 0.65)'
                    : 'rgba(20, 30, 50, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: isDay
                    ? '0 4px 20px rgba(0,0,0,0.08)'
                    : '0 4px 20px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = isDay
                    ? '0 8px 32px rgba(0,0,0,0.12)'
                    : '0 8px 32px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isDay
                    ? '0 4px 20px rgba(0,0,0,0.08)'
                    : '0 4px 20px rgba(0,0,0,0.3)';
            }}
        >
            {children}
        </div>
    );
};

export default Card;
