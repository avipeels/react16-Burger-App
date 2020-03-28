import React from 'react';
import Aux from '../../../hoc/Auxilary';

const orderSummary = (props) => {
    const { ingredients } = props;
    const ingredientsList = Object.keys(ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients[igKey]}
                </li>
            )
        })
    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>A delicious burger with following ingredients</p>
            <ul>
                {ingredientsList}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );
}

export default orderSummary;