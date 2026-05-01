import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    footer: {
        marginTop: 'auto',
        padding: '2em 1em 1.5em',
        fontSize: '0.7rem',
        opacity: 0.7,
        textAlign: 'center',
        width: '100%',
    },
    links: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1em',
        flexWrap: 'wrap',
        marginBottom: '0.6em',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        opacity: 0.8,
        transition: 'opacity 0.2s',
        '&:hover': {
            opacity: 1,
            textDecoration: 'underline',
        },
    },
    credits: {
        opacity: 0.6,
        lineHeight: 1.6,
    },
});

const Footer = ({ isDay }) => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <div className={classes.links}>
                <a className={classes.link} href="https://github.com/dasanakudigenithin" target="_blank" rel="noopener noreferrer">
                    Developer
                </a>
                <span>·</span>
                <a className={classes.link} href="https://github.com/dasanakudigenithin/react-weather-app" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <span>·</span>
                <a className={classes.link} href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">
                    Open Weather API
                </a>
            </div>
            <div className={classes.credits}>
                CSS Animations:&nbsp;
                <a className={classes.link} href="https://codepen.io/antonioescudero/pen/zrxGve" target="_blank" rel="noopener noreferrer">Clouds</a>,&nbsp;
                <a className={classes.link} href="https://codepen.io/irshadav/pen/bfplK" target="_blank" rel="noopener noreferrer">Sun</a>,&nbsp;
                <a className={classes.link} href="https://codepen.io/arickle/pen/XKjMZY" target="_blank" rel="noopener noreferrer">Rain</a>,&nbsp;
                <a className={classes.link} href="https://codepen.io/frontendcharts/pen/EpEgox" target="_blank" rel="noopener noreferrer">Globe</a>
            </div>
        </footer>
    );
};

export default Footer;
