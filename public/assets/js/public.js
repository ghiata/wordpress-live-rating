(function ( $ ) {
	"use strict";

	$(function () {

        var myRootRef = new Firebase('https://blinding-fire-1205.firebaseio.com/');
        myRootRef.auth(TOKEN, function(error) {
            if(error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Login Succeeded!");
            }
        });

        var $starsDiv= $('<div id="star"></div>');
        $starsDiv.appendTo('body');

        var rating= 2;
        var articleId= 777;
        myRootRef.push({ articleId: articleId, rating: rating });


        // Add a callback that is triggered for each chat message.
        myRootRef.limit(1).on('value', function (snapshot) {
            var message = snapshot.val();
            console.log(message);
            $starsDiv.raty({ score: message.rating, path: '/wp-content/plugins/live-rating/assets/vendor/jquery.raty/images/' });
        });

	});

}(jQuery));