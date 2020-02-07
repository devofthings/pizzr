// function add_button(){
$('#btn_add').click(function() {
    
    var price = $('#price_input').val();
    console.log("price:", price);

    if($('#radio_round').is(':checked')){
        // round
        console.log("round pizza");
        var diameter = $('#input_diameter').val();
        console.log("diameter:", diameter);
        var pizza_area = 3.14159 * (diameter/2)**2;


    }else if($('#radio_square').is(':checked')){
        // square
        console.log("square pizza");
        var side_a = $('#input_side_a').val();
        var side_b = $('#input_side_b').val();
        console.log("size:", side_a, "x", side_b);
        var pizza_area = side_a * side_b

    }

    console.log("total area pizza:", pizza_area, "cm²");
    var price_per_cm2 = price / pizza_area;
    console.log("price per cm²:", price_per_cm2)
    cent_per_cm2 = (price_per_cm2 * 100).toFixed(2)
    price_per_cm2 = price_per_cm2.toFixed(4)




    $('#pizza_container').append('<div class="card"><img src="assets/img/pizza.png" width=64 height=64 alt="..."><div class="card-body"><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text">' + price + '€</span><span class="input-group-text">' + side_a + '.' + side_b + '</span><span class="input-group-text">' + diameter + 'Ø</span><span class="input-group-text">' + pizza_area + ' cm&sup2;</span><span class="input-group-text">' + cent_per_cm2 + 'cent/cm&sup2;</span></div><span class="input-group-text">' + price + '€</span></div></div>');



});



$("#radio_square").click(function(){
    $("#square_div").show()
    $("#diameter_div").hide()
});

$("#radio_round").click(function(){
    $("#square_div").hide()
    $("#diameter_div").show()
});