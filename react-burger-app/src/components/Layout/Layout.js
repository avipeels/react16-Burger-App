import React from "react";
import Aux from '../../hoc/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
const layout = (props) => (
    <Aux>
        <div>
            <Toolbar/>
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;