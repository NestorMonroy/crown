import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_wf7QP1baQedjEdEMPfuRYvOV00qP48bntP'

    const onToken = token => {
        axios({
            url:'payment',
            method: 'post',
            data:{
                amount: priceForStripe,
                token,
            }
        })
        .then(response => {
            alert('succesful payment');
          })
        .catch(error => {
            console.log('Payment Error: ', error);
            alert(
              'There was an issue with your payment! Please make sure you use the provided credit card.'
            );
          });
        };

    return (
        <StripeCheckout 
        label="Payn Now"
        name='Crown'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishablekey}
        />
    )
}

export default StripeCheckoutButton;