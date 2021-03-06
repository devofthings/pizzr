// HELPER FUNCTIONS
// get random int from 1 to max input
const getRandomInt = (max) => 1 + (Math.floor(Math.random() * Math.floor(max)));
// create a picture string
const getPizzaImageString = () => `assets/img/pizza-card${getRandomInt(5)}.jpg`.toString();
// animate css helpers
const animateCSSLastElement = (element, animationName, callback) => {
    const nodes = document.querySelectorAll(element)
    const last = nodes[nodes.length-1]
    last.classList.add('animated', animationName)

    handleAnimationEnd = () => {
        last.classList.remove('animated', animationName)
        last.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    last.addEventListener('animationend', handleAnimationEnd)
}

const animateCSSCurrentElement = (element, animationName, callback) => {
    const node = element
    node.classList.add('animated', animationName)

    handleAnimationEnd = () => {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}
// add percentage to the progressbar
const addProgress = () => {
    let diameter = $('#input-diameter').val()
    let side_a = $('#input-side-a').val()
    let side_b = $('#input-side-b').val()
    let price = $('#price-input').val()
    let progress = $('#progress');
    let total_percent_progress = 0;
    if ($('#radio-round').is(':checked')) {
        if(diameter.length !== 0) {
            total_percent_progress += 50;
        }
        if(price.length !== 0) {
            total_percent_progress += 50;
        }
    }else if($('#radio-square').is(':checked')) {
        if(side_a.length !== 0) {
            total_percent_progress += 33;
        }
        if(side_b.length !== 0) {
            total_percent_progress +=33;
        }
        if(price.length !== 0) {
            total_percent_progress += 34;
        }
    }

    progress.html(total_percent_progress+"%")
    progress.css("width", total_percent_progress+"%")
    if (total_percent_progress == 100){
        $('#btn_add').removeClass('disabled');
    }else if(total_percent_progress == 0){
        progress.css("width", "12%");
    }
}

// clear input values
const getPurged = () => {
    $('#input-diameter').val(null)
    $('#price-input').val(null)
    $('#input-side-a').val(null)
    $('#input-side-b').val(null)
    $('#btn_add').addClass('disabled');
    $('#progress').css("width", "12%");
    $('#progress').html("0%")
} 

const highlight_best_value = () => {
    all_price_per_cm2 = $('.price_per_cm2');
    all_price_per_cm2.parent().removeClass('best-value');
    let best_price = all_price_per_cm2[0];

    all_price_per_cm2.each(function(){
        if(this.innerHTML < best_price.innerHTML){
            best_price = this;
        }
    })
    console.log("beste value",all_price_per_cm2[0])
    $(best_price.parentNode).addClass("best-value");
}



// MAIN FUNCTIONS
// switch input-form on radio selection
$("#radio-square").click(() => {
    $("#diameter-div").hide();
    $("#square-div").show();
    getPurged();
    addProgress();
});

$("#radio-round").click(() => {
    $("#square-div").hide();
    $("#diameter-div").show();
    getPurged();
    addProgress();
});

// check for input in the input fields
$('#input-side-a').keyup(() => {
    addProgress()
})
$('#input-side-b').keyup(() => {
    addProgress()
})
$('#input-diameter').keyup(() => {
    addProgress()
})
$('#price-input').keyup(() => {
    addProgress()
})

// create new cards
$('#btn_add').click(() => {
    
    if ($('#btn_add').hasClass('disabled')){
        alert('One or Two fields are empty. Please fill up all fields');
        return null;
    }

    const price = $('#price-input').val();
    console.log("price:", price);
    $('#manual').hide()

    if ($('#radio-round').is(':checked')) {
        // round
        console.log("round pizza");
        const diameter = $('#input-diameter').val();
        console.log("diameter:", diameter);
        const pizza_area = (3.14159 * (diameter / 2) ** 2).toFixed(2);
        console.log("total area pizza:", pizza_area, "cm²");
        let price_per_cm2 = price / pizza_area;
        console.log("price per cm²:", price_per_cm2)
        cent_per_cm2 = (price_per_cm2 * 100).toFixed(2)
        price_per_cm2 = price_per_cm2.toFixed(4)

        $('#pizza-cards-container').append(`
            <div class="card">
                <div id="close-button" onClick="deleteCard($(this))">
                    <span class="text-center text-light font-weight-bold close-button-x">x</span>
                </div>
                <img src=${getPizzaImageString()} class="card-image" alt="...">
                <div class="card-body">
                    <div class="input-group card-results">
                        <div class="input-group-prepend">
                            <span class="input-group-text input-group-card">${price}€</span>
                            <span class="input-group-text input-group-card">Ø${diameter}cm</span>
                            <span class="input-group-text input-group-card">${pizza_area}cm&sup2;</span>
                            <span class="input-group-text input-group-card"><span class="price_per_cm2">${cent_per_cm2}</span>cent/cm&sup2;</span>
                        </div>
                    </div>
                </div>
            </div>`
        );
        animateCSSLastElement('.card', 'fadeInLeft')

    } else if ($('#radio-square').is(':checked')) {
        // square
        console.log("square pizza");
        const side_a = $('#input-side-a').val();
        const side_b = $('#input-side-b').val();
        console.log("size:", side_a, "x", side_b);
        const pizza_area = side_a * side_b;
        console.log("total area pizza:", pizza_area, "cm²");
        let price_per_cm2 = price / pizza_area;
        console.log("price per cm²:", price_per_cm2)
        cent_per_cm2 = (price_per_cm2 * 100).toFixed(2)
        price_per_cm2 = price_per_cm2.toFixed(4)

        $('#pizza-cards-container').append(`
            <div class="card">
                <div id="close-button" onClick="deleteCard($(this))">
                    <span class="text-center text-light font-weight-bold close-button-x">x</span>
                </div>
                <img src=${getPizzaImageString()} class="card-image" alt="...">
                <div class="card-body">
                    <div class="input-group mb-3 card-results">
                        <div class="input-group-prepend">
                            <span class="input-group-text input-group-card">${price}€</span>
                            <span class="input-group-text input-group-card">${side_a}cm X ${side_b}cm </span>
                            <span class="input-group-text input-group-card">${pizza_area}cm&sup2;</span>
                            <span class="input-group-text input-group-card"><span class="price_per_cm2">${cent_per_cm2}</span>cent/cm&sup2;</span>
                        </div>
                    </div>
                </div>
            </div>`
        );
    }
    getPurged();
    highlight_best_value();
});

//delete card
const deleteCard = (card) => {
    animateCSSCurrentElement(card.parent()[0], 'zoomOut', () =>
    {
        card.parent().remove();
        $('.card').length === 0?$('#manual').show():null
    }
    )}
    