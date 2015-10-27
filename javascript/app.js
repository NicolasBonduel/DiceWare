(function() {
  var app = angular.module('diceWare', []);

  app.controller('DefaultController', function($scope) {

		var cursorX = 0;
		var cursorY = 0;
		document.onmousemove = function(e){
			cursorX = e.pageX;
			cursorY = e.pageY;
		}
  
		$scope.words = ["", "", "", ""];
		var randomNumber = 0;
		$scope.busy = false;

		$scope.shuffle = function(index){
			randomNumber = 0;
			setTimeout(function() {
				$scope.$evalAsync(function(){$scope.busy = false});
			},(1000));
			for (var i = 0; i < 1000; i = i + 25) {
				setTimeout(function() {randomizer();},i);
			}
			function randomizer() {
				$scope.$evalAsync(function(){$scope.busy = true});
				var values = [];
				for(i = 0; i < 5; i++) {
					randomNumber = (parseInt((randomNumber+cursorX+cursorY+Math.floor((Math.random() * 10) + 1)).toString(6))%10)+1;
					$('.dices-'+index+' span').eq(i).attr('class','dice-'+randomNumber);
					values[i] = randomNumber;
				}
				$scope.$evalAsync(function(){$scope.words[index] = diceware[values.join('')];});
			}
		};
		
		$scope.shuffleAll = function(length){
			for (var i = 0; i < length; i++) {
				$scope.shuffle(i);
			}
		}
		
		$scope.addAWord = function(){
			$scope.$evalAsync(function(){$scope.words.push("")});
			$scope.shuffle($scope.words.length);
		}
		
		$scope.deleteAWord = function(){
			$scope.$evalAsync(function(){$scope.words.pop()});
		}
  });

})();
