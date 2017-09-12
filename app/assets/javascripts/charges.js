document.addEventListener('turbolinks:load', function() {
    var stripe = Stripe('pk_test_iIiXWlThSgBTPJnqxpl7WH9g');
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    var style = {
            // Add your base input styles here. For example:
            base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '15px',

                '::placeholder': {
                    color: '#CFD7E0',
                },

        }
    };

    // Create an instance of the card Element
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    card.on('change', function(event) {
        setOutcome(event);
    });

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        var form = document.querySelector('form');
        /*var extraDetails = {
            name: form.querySelector('input[name=cardholder-name]').value,
        };*/
        //stripe.createToken(card, extraDetails).then(setOutcome);
        //stripe.createToken(card)//then(setOutcome);
        stripe.createToken(card).then(function(result) {
            if(result.error) {
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                console.log(result.token)
            }
        })
    });
})

function setOutcome(result) {
    var successElement = document.querySelector('.success');
    var errorElement = document.querySelector('.error');
    successElement.classList.remove('visible');
    errorElement.classList.remove('visible');

    if (result.token) {
        // Use the token to create a charge or a customer
        // https://stripe.com/docs/charges
        successElement.querySelector('.token').textContent = result.token.id;
        successElement.classList.add('visible');
    } else if (result.error) {
        errorElement.textContent = result.error.message;
        errorElement.classList.add('visible');
    }
}


