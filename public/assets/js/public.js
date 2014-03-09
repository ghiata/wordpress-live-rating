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

        var rating= 6;
        var articleId= 777;
        myRootRef.push({ articleId: articleId, rating: rating });


        // Add a callback that is triggered for each chat message.
        myRootRef.limit(10).on('child_added', function (snapshot) {
            var message = snapshot.val();
            console.log(message);
//        $('<div/>').text(message.text).prepend($('<em/>')
//                .text(message.name+': ')).appendTo($('#messagesDiv'));
//        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
        });

	});

}(jQuery));