import React, { Component } from "react";
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { INGREDIENT_PRICE } from './constants';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
        }
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((acc, el) => {
                return acc + el;
            }, 0)
        this.setState({ purchasable: sum > 0 })
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const additionalPrice = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + additionalPrice;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const removedPrice = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - removedPrice;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    }

    purchaseContinueHandler = () => {
        this.setState({
            loading: true,
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'AVinash',
                address: {
                    street: 'test street',
                    zipcode: '12234',
                    country: 'India',
                },
                email: 'aaa@bbb.com',
                deliveryMethod: 'Express',
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing:false,
                })
            })
            .catch(err => {
                this.setState({
                    loading: true,
                    purchasing:false,
                })
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
        />
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosing={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;