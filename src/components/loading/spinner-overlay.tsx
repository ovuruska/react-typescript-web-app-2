import React from 'react';
import styles from './spinner-overlay.module.scss';

interface SpinnerOverlayProps {
  children?: React.ReactNode;
}

const SpinnerOverlay = ({
  children
                        } : SpinnerOverlayProps) => (
  <div className={styles.spinnerOverlay}>
    <div className={styles.spinnerOverlay__spinner} />
    {children}
  </div>
);

export default SpinnerOverlay;
