import React from 'react';
import styles from './page.module.css';

const steps = [
    {
        step: 1,
        label: 'Processing',
    },
    {
        step: 2,
        label: 'Quotation Sent',
    },
    {
        step: 3,
        label: 'Confirmed',
    },
];

const ProgressStepsBar = ({ activeStep }) => {

    const totalSteps = steps.length;
    const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

    return (
        <div className={`${styles.mainContainer} ms-4 ms-lg-0 me-lg-4`}>
            <div className={styles.stepContainer} style={{ '--width': width }}>
                {steps.map(({ step, label }) => (
                    <div className={styles.stepWrapper} key={step}>
                        <div
                            className={styles.stepStyle}
                            style={{
                                '--step-border-color':
                                  activeStep >= step ? 'var(--primary-clr)' : 'var(--tab-button-background-clr)',
                                '--step-background-color': 
                                  activeStep >= step ? 'var(--primary-clr)' : 'var(--tab-button-background-clr)',
                            }}
                        >
                            {activeStep > step ? (
                                <span className={styles.active}/>
                            ) : (
                                <span className={styles.notActive}/>
                            )}
                        </div>
                        <div className={styles.stepsLabelContainer}>
                            <div 
                                className={styles.stepLabel} 
                                key={step}
                                style={{
                                    '--label-color':
                                      activeStep >= step ? 'var(--primary-text-clr)' : 'var(--inactive-progress-bar-text-clr)',
                                }}
                            >
                                {label}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  );
};


export default ProgressStepsBar;