import React from "react";
import "./../animations.css";

const Rainy = () => {
    const populateDrops = () => {
        var increment = 0;
        var drops = [];

        while (increment < 400) {
            var randoHundo = (Math.floor(Math.random() * (25 - 1 + 1) + 1));
            var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
            increment += randoFiver;

            drops.push(<div
                className="drop"
                style={{
                    left: + increment + '%',
                    bottom: + ({ randoFiver } + randoFiver - 1 + 100) + '%;',
                    animationDuration: randoHundo + 's'
                }}>
                <div
                    className="stem"
                    style={{
                        animationDuration: randoHundo + 's'
                    }}>
                </div>
            </div>);
        }
        return drops;
    }

    const populateBackDrops = () => {
        var increment = 0;
        var backDrops = [];

        while (increment < 400) {
            var randoHundo = (Math.floor(Math.random() * (25 - 1 + 1) + 1));
            var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
            increment += randoFiver;

            backDrops.push(
                <div
                    className="drop"
                    style={{
                        right: + increment + '%',
                        bottom: + (randoFiver + randoFiver - 1 + 100) + '%',
                        animationDuration: randoHundo + 's'
                    }}
                >
                    <div
                        className="stem"
                        style={{
                            animationDuration: randoHundo + 's'
                        }}
                    >
                    </div>
                </div>);
        }
        return backDrops;
    }

    return (
        <>
            <div className="rain front-row">
                {populateDrops()}
            </div>
            <div className="rain back-row">
                {populateBackDrops()}
            </div>
        </>
    )
}

export default Rainy;