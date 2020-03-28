import React from 'react';
import classes from './BuildControl.module.css';
const BuildControl = (props) => {
    const { added, removed, disabled } = props;
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button
                className={classes.More}
                onClick={added}
            >More</button>
            <button
                className={classes.Less}
                onClick={removed}
                disabled={disabled}
            >Less</button>
        </div>
    );
}

export default BuildControl;