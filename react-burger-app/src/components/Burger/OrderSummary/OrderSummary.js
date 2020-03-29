import React from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const { ingredients, purchaseCancelled, purchaseContinued, price } = props;
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
            <p><strong>Total Price: {price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;