import React from "react";

const Card = ({ height, width, padding, margin, borderRadius, border, boxShadow, backgroundColor, children }) => {
    return (
        <div
            style={
                {
                    height: height || "18em",
                    width: width || "11em",
                    padding: padding || ".5em",
                    margin: margin || "1em",
                    borderRadius: borderRadius || "1em",
                    border: border || "none",
                    boxShadow: boxShadow || ".07em .07em .07em .07em #d1d1d1",
                    backgroundColor: backgroundColor || "#e5e5e5"
                }
            }
        >
            {children}
        </div>
    )

}

export default Card;