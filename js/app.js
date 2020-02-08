// HELPER FUNCTIONS
// get random int from 1 to max input
const getRandomInt = (max) => 1 + (Math.floor(Math.random() * Math.floor(max)));
// create a picture string
const getPizzaImageString = () => `assets/img/pizza-card${getRandomInt(5)}.jpg`.toString()


// MAIN FUNCTIONS
// create new cards
$('#btn_add').click(function () {

    const price = $('#price_input').val();
    console.log("price:", price);

    if ($('#radio_round').is(':checked')) {
        // round
        console.log("round pizza");
        const diameter = $('#input_diameter').val();
        console.log("diameter:", diameter);
        const pizza_area = 3.14159 * (diameter / 2) ** 2;
        console.log("total area pizza:", pizza_area, "cm²");
        let price_per_cm2 = price / pizza_area;
        console.log("price per cm²:", price_per_cm2)
        cent_per_cm2 = (price_per_cm2 * 100).toFixed(2)
        price_per_cm2 = price_per_cm2.toFixed(4)

        $('#pizza_container').append(`
            <div class="card">
                <img src=${getPizzaImageString()} class="card-image" alt="...">
                <div class="card-body">
                    <div class="input-group mb-3 card-results">
                        <div class="input-group-prepend">
                            <span class="input-group-text">${price}€</span>
                            <span class="input-group-text">Ø${diameter}cm</span>
                            <span class="input-group-text">${pizza_area}cm&sup2;</span>
                            <span class="input-group-text">${cent_per_cm2}cent/cm&sup2;</span>
                        </div>
                    </div>
                </div>
            </div>`
        );

    } else if ($('#radio_square').is(':checked')) {
        // square
        console.log("square pizza");
        const side_a = $('#input_side_a').val();
        const side_b = $('#input_side_b').val();
        console.log("size:", side_a, "x", side_b);
        const pizza_area = side_a * side_b;
        console.log("total area pizza:", pizza_area, "cm²");
        let price_per_cm2 = price / pizza_area;
        console.log("price per cm²:", price_per_cm2)
        cent_per_cm2 = (price_per_cm2 * 100).toFixed(2)
        price_per_cm2 = price_per_cm2.toFixed(4)

        $('#pizza_container').append(`
            <div class="card">
                <img src=${getPizzaImageString()} class="card-image" alt="...">
                <div class="card-body">
                    <div class="input-group mb-3 card-results">
                        <div class="input-group-prepend">
                            <span class="input-group-text">${price}€</span>
                            <span class="input-group-text">${side_a}cm X ${side_b}cm </span>
                            <span class="input-group-text">${pizza_area}cm&sup2;</span>
                            <span class="input-group-text">${cent_per_cm2}cent/cm&sup2;</span>
                        </div>
                    </div>
                </div>
            </div>`
        );
    }
});



$("#radio_square").click(() => {
    $("#square_div").show()
    $("#diameter_div").hide()
});

$("#radio_round").click(() => {
    $("#square_div").hide()
    $("#diameter_div").show()
});