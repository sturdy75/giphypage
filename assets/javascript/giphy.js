$(document).ready(function () {
    var animal = [];

    function displayAnimal() {

        var a = $(this).data("search");
        console.log(a);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + a + "&api_key=QHgE1TUsiJStc0s0GReBfLTILUqB0qq4&limit=10"
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $("<div class='col-md-4'>");

                    var rating = results[i].rating;
                    var defaultAnimatedSrc = results[i].images.fixed_height.url;
                    var staticSrc = results[i].images.fixed_height_still.url;
                    var animalImage = $("<img>");
                    var p = $("<p>").text("Rating: " + rating);

                    animalImage.attr("src", staticSrc);
                    animalImage.addClass("animalGiphy");
                    animalImage.attr("data-state", "still");
                    animalImage.attr("data-still", staticSrc);
                    animalImage.attr("data-animate", defaultAnimatedSrc);
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $("#gifsGoHere").prepend(animalDiv);

                }

            });
    }

    $("#addAnimal").on("click", function (event) {
        event.preventDefault();
        var newAnimal = $("#animalInput").val().trim();
        animal.push(newAnimal);
        console.log(animal);
        $("#animalInput").val('');
        displayButtons();

    });

    function displayButtons() {
        $("#mybuttons").empty();
        for (var i = 0; i < animal.length; i++) {
            var b = $('<button class="btn btn-primary">');
            b.attr("id", "animal");
            b.attr("data-search", animal[i]);
            b.text(animal[i]);
            $("#mybuttons").append(b);
        }
    }

    displayButtons();

    $(document).on("click", "#animal", displayAnimal);

    $(document).on("click", ".animalGiphy", pausePlayGifs);

    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
});