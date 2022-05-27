import { Link } from 'react-router-dom';
import React from 'react';
import classes from './Navigation.module.css';

/**
 * Displays Navigation Bar
 *
 * @returns Navigation Bar
 */
const Navigation = () => (
  <div className={classes.navContainer}>
    <div className={classes.content}>
      <Link data-testid="logo" className={classes.link} to="/">
        <h4>MT Enterprises</h4>
      </Link>
    </div>
  </div>
);

export default Navigation;
