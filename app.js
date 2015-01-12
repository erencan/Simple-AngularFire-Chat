angular.module("gang",["firebase"])
.controller("messages-controller",function($scope, $firebase){
	var DB = new Firebase("https://gang-app.firebaseio.com/messages");
	var DBController = $firebase(DB);
	var messagesArray = DBController.$asArray();
	messagesArray.$loaded().then(function(){
		$scope.messages = messagesArray;
	});
	
	$scope.sendMessage = function(newMessage) {
		$scope.messages.$add({content:newMessage, timestamp: Firebase.ServerValue.TIMESTAMP}).then(function() {
			$scope.newMessage = "";
		});
	}
	DB.on('value', function(dataSnapshot) {
    		setTimeout(function(){
				var elem = document.getElementById('messages');
			  	elem.scrollTop = elem.scrollHeight;
			},100);
    });
})
;