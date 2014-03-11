(function ( $ ) {
	"use strict";

	$(function () {

        // TODO: firebase address has to be configured in the wordpress admin
        var myRootRef = new Firebase('https://live-rating.firebaseio.com/');
        myRootRef.auth(TOKEN, function(error) {
            if(error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Login Succeeded!");
            }
        });

        var ballotBox= myRootRef.child('domains/'+DOMAIN+'/ballot_boxes/'+'post_'+POST_ID);
        var ballots= ballotBox.child('ballots');

        var $starsDiv= $('<div id="star"></div>');
        $starsDiv.prependTo('body');

        // Get the last submitted ballot. Correct order/priority is guaranteed by setWithPriority
        ballots.limit(1).on('value', function (ballotListSnapshot) {

            console.log('triggered value event for ballots, limit 1:', ballotListSnapshot.val());

            ballotListSnapshot.forEach(function(ballotSnapshot) {
                var ballot= ballotSnapshot.val();

                $starsDiv.raty({
                    score: ballot.sum_votes / ballot.nr_votes,
                    // FIXME: the path will not work like this on another user's setup.
                    path: '/wp-content/plugins/live-rating/assets/vendor/jquery.raty/images/',
                    click: function(value, evt) {

                        var newSumVotes= ballot.sum_votes + value;
                        var newNrVotes= ballot.nr_votes + 1;

                        // FIXME: relying on the client to update the nr_votes and sum_votes is very, very bad!!!
                        ballots.child(IP).setWithPriority({value: value, nr_votes: newNrVotes, sum_votes: newSumVotes}, Firebase.ServerValue.TIMESTAMP);
                    }
                });
            });

        });

	});

}(jQuery));