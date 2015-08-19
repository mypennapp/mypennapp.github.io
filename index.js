function size() {
    var gutter = 0;
    var amt = 0;
    if($(window).height() - $("#bottom").outerHeight() - $("header").height() <= gutter) {
        amt = $(window).height() -$("#bottom").outerHeight() - $("header").height()
        console.log(amt);
        $("#bottom").css({
            'margin-bottom': -490
        });
    } else {
        $("#bottom").css({
            'margin-bottom': 0
        });
    }
    $("#top").css({
        'bottom': $("#bottom").height() + amt + "px"
    });

    $("header").css({
        'margin-top': -$("header").outerHeight()/2 + "px"
    });
}

function clearInput() {
    $(this).removeClass("check");
    $(this).removeClass("error");
    $(this).css({
        'background-image': "none"
    });
}

$(document).ready(function() {
    //functions
    function choose(e) {
        var iOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
        var Facebook = /FBIOS/i.test(navigator.userAgent);
        if(iOS && !Facebook) {
            invite(e);
        } else {
            var where = "on your iPhone";
            if(Facebook) where = "using Safari";
            $("p#tagline").html("Please visit to <strong>teleport.co</strong> " + where); // show input
            $("header").css({
                'width': "90%",
                'left': "5%",
                'margin-left': 0,
                'margin-top': 0
            });
            $("button.download").hide();
            $("h1").hide();
        }
    }

    function testCode(e) {
        var input = $("input");
        input.blur();

        var code = input.val().toLowerCase();
        console.log(code);

        var refer = Parse.Object.extend("refer");
        var query = new Parse.Query(refer);

        query.equalTo("code", code);
        query.find({
            success: function(results) {
                console.log(results);

                if (results.length <= 0) {
                    input.addClass("error");
                } else {
                    input.addClass("check");

                    setTimeout(function(){
                        $("#content").hide();
                        $("#install").show(); //instructions

                        var result = results[0];
                        console.log(result.get('ipa'));

                        $("#dl").attr('href', result.get('ipa'));

                        setTimeout(function(){
                            window.location.href = result.get('ipa');
                        }, 600);

                        result.increment("count");
                        result.save();
                    }, 1200);
                }
            },
            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    }

    function invite(e) {
        Parse.initialize("Fw2IWMAtOlElWO6NaKRIaLlqfKymXx9HNrg8dVJr", "g6Z77hyx1nUfKqE6W1oa8Gag1CN1ZpxKRV7KLKJa");

        $("#invite").show(); // show input
        $(".download").html("<span>Submit Code</span>");
        $(".download").removeClass("download");
        $("button").addClass("submit");
        $("p#tagline").hide();

        $(".submit").click(testCode);
    }

    // events
    $("button.download").click(choose);
    $("input").focus(clearInput)
})

$(window).resize(function() {
    size();
});

$(window).load(function() {
    size();
    clearInput();
})
