import React from 'react';
import { ClipLoader } from 'react-spinners';
import { usePromiseTracker } from 'react-promise-tracker';
import styles from './LoadingSpinner.module.css';

/**
 * @name LoadingSpinner
 * @description creates the loading spinner component
 * @returns loading spinner component
 */
const LoadingSpinner = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (promiseInProgress
    && (
    <div data-testid="loading-spinner" className={styles.div}>
      <ClipLoader
        size={60}
        color="#ADF5FF"
      />
    </div>
    )
  );
};

export default LoadingSpinner;
