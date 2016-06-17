angular.module('main.controllers', [])

.controller('GlobalCtrl', function($scope, $rootScope, General) {
	$scope.splitViewElement = document.getElementById("splitView");
    window.onresize = setPane;
    window.onload = setPane;
    
    General.getIcons().then( function(val) {
        $rootScope.icons = val;
    });
    
    function setPane() {
        document.getElementById("loader").innerHTML = "";
        document.getElementById("header-container").className = "";
        var width = window.innerWidth;
        
        if( width <= 500 ) {
            $scope.splitViewObject.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.none;
        } else {
            $scope.splitViewObject.closedDisplayMode = WinJS.UI.SplitView.ClosedDisplayMode.inline;
        }
    }
})

.controller('MainCtrl', function($scope, $rootScope) {
    $rootScope.title = "Home";
    
})

.controller('ProjectsCtrl', function($scope, $rootScope) {
	$rootScope.title = "Projects";
	$rootScope.game = "blackjack";
	$scope.template = "../templates/fun/views/cards/" + $rootScope.game + ".html";
	
	$scope.setGame = function( index ) {
		switch(index) {
			case 0: 
				$rootScope.game = "blackjack";
				break;
			case 1:
				$rootScope.game = "bspoker";
				break;
			case 2:
				$rootScope.game = "hearts";
				break;
		}
		$scope.template = "../templates/fun/views/cards/" + $rootScope.game + ".html";
	}
})

.controller('CardGameCtrl', function($scope, $rootScope) {
	$scope.started = false;
	var c = new Deck();
	$scope.dealer = new Hand(false);
	$scope.player = new Hand(true);
	$scope.counts = {};

	// Blackjack
	$scope.startBlackjack = function() {
		$scope.started = true;
		dealBlackjack();
	}

	$scope.hitBlackjack = function() {
		$scope.player.draw(c, 1);
		updateCountsBlackjack(false);
	}

	var dealBlackjack = function() {
		c.shuffle();
		
		$scope.dealer.draw(c, 2);
		$scope.player.draw(c, 2);

		$scope.dealer.reveal(1);

		updateCountsBlackjack(false);
	}

	var updateCountsBlackjack = function(final) {
		$scope.counts.player = 0;
		$scope.counts.dealer = 0;
		var dealerCards = $scope.dealer.getCards();
		var playerCards = $scope.player.getCards();

		if(!final)
			$scope.counts.dealer = getValueBlackjack(dealerCards[0].getValue());
		else {
			for(var a = 0; a < dealerCards.length; b++)
				$scope.counts.dealer += getValueBlackjack(playerCards[a].getValue(), $scope.counts.dealer);
		}

		for(var b = 0; b < playerCards.length; b++)
			$scope.counts.player += getValueBlackjack(playerCards[b].getValue(), $scope.counts.player);

		//if($scope.counts.player > 21)
			// player bust
	}

	var getValueBlackjack = function(rank, currScore) {
		if(rank > 0 && rank < 11)
			return rank + 1;
		else if(rank >= 11)
			return 10;
		else if(rank == 0)
			return (currScore + 11) > 21 ? 1 : 11;
	}
})

.controller('FinanceCtrl', function($scope, $rootScope) {
    $rootScope.title = "Finance";
	$scope.selected = 0;
    
    console.log("loaded");
    
    $scope.set = function( input ) {
        $scope.selected = input;
    }
})

.controller('AboutCtrl', function($scope, $rootScope, About) {
	$scope.selected;
    $scope.selectBox = 0;
	$scope.radioModel = 0;
	$scope.classModel = 0;
    $rootScope.title = "About";

	$scope.set = function( curr ) {
		switch(curr) {
			case 0:
				$scope.selected = 'templates/about/panels/experience.html';
				break;
			
			case 1:
				$scope.selected = 'templates/about/panels/extracurriculars.html';
				break;
			
			case 2:
				$scope.selected = 'templates/about/panels/education.html';
				break;
				
			case 3:
				$scope.selected = 'templates/about/panels/bio.html';
				break;
		}
	}
	
	$scope.match = function( first, second ) {
		switch( parseInt( $scope.radioModel )) {
			case 0:
				return first || second;
				
			case 1:
				return first;
			
			case 2:
				return second;
		}
	}
	
	$scope.filterClasses = function( param ) {
        $scope.selectBox = parseInt(param);
        
		About.loadItems('education').then( function(val) {
			var arr = new Array();
			for( var a in val ) {
				if( val[a].tags.indexOf( parseInt(param) ) != -1 )
					arr.push( val[a] );
			}
			
			$scope.classes = arr;
			$scope.gpa = $scope.calculateGPA();
		});
	}
	
	About.loadItems('experience').then( function(val) {
		$scope.experiences = val;
	});
	
	About.loadItems('extracurriculars').then( function(val) {
		$scope.extracurriculars = val;
	});
	
	About.loadItems('education').then( function(val) {
		$scope.classes = val;
		$scope.gpa = $scope.calculateGPA();
	});
	
	$scope.calculateGPA = function() {
		var gA = {"A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7};
		var units = 0, sum = 0;
		for( var c in $scope.classes ) {
			var cla = $scope.classes[c];
			
			// Skip P/NP
			if( cla.grade == "P" || cla.grade == "IP" )
				continue;
				
			sum += gA[cla.grade]*cla.units;
			units += cla.units;
		}
		
		return (sum/units).toFixed(3);
	}
})
.controller('ReportsCtrl', function($scope, $rootScope, $state, Stocks) {
    $scope.fundBuys = [];
    $scope.fundHolds = [];
    $scope.fundSells = [];
    $scope.techBuys = [];
    $scope.techSells = [];
    $scope.selected = 0;
    
    Stocks.getPortfolio("reports").then( function( val ) {
        for(var i = 0; i < val.length; i++) {
            var temp = val[i];
            temp.icon = $rootScope.icons[val[i]['industry'].toLowerCase().replace(/\s/g, '')];
            temp.icon = temp.icon == undefined ? $rootScope.icons['default'] : temp.icon;
            
            if( val[i].type == "fundamental") {
                if( val[i].rating == 'Buy' )
                    $scope.fundBuys.push(temp);
                else if ( val[i].rating == 'Hold' )
                    $scope.fundHolds.push(temp);
                else
                    $scope.fundSells.push(temp);
            }
            else {
                if( val[i].rating == 'Buy' )
                    $scope.techBuys.push(temp);
                else
                    $scope.techSells.push(temp);
            }
        }
    });

	$scope.openReport = function(id, name) {
		$state.go('report', {"ticker": id, "title": name});
	}
    
    $scope.select = function(chosen) {
        $scope.selected = parseInt(chosen);
    }
})

.controller('ReportCtrl', function($scope, $rootScope, $stateParams) {
    $rootScope.title = $stateParams.title;
	console.log("Loaded new page", $stateParams);
})

.controller('StocksCtrl', function($q, $scope, $modal, $sce, Stocks) {
	var tickers = new Array();
	var promises = [ Stocks.getPortfolio("shorts"), Stocks.getPortfolio("longs"), Stocks.getPortfolio("closed") ];
	
	$q.all(promises).then( function( val ) {
		$scope.shorts = val[0];
		$scope.longs = val[1];
		$scope.closeds = val[2];
		
		for( var i = 0; i < val[0].length; ++i ) {
			tickers.push(val[0][i]['ticker']);
		}
		for( var j = 0; j < val[1].length; ++j ) {
			tickers.push(val[1][j]['ticker']);
		}
		
		for( var k = 0; k < $scope.closeds.length; ++k ) {
			$scope.closeds[k]['diff'] = $scope.getDiff($scope.closeds[k]['cost'], $scope.closeds[k]['exit']);
		}
		
		Stocks.getStocks(tickers).then( function( val ) {
			var a = 0;
			for( ; a < $scope.shorts.length; ++a ) {
				$scope.shorts[a]['price'] = val[a]['LastTradePriceOnly'];
				$scope.shorts[a]['diff'] = $scope.getDiff($scope.shorts[a]['cost'], $scope.shorts[a]['price']);
			}
			
			for( var b = 0; a < val.length; ++a, ++b ) {
				$scope.longs[b]['price'] = val[a]['LastTradePriceOnly'];
				$scope.longs[b]['diff'] = $scope.getDiff($scope.longs[b]['cost'], $scope.longs[b]['price']);				
			}
		});
	});
	
	$scope.formatMoney = function( money ) {
		return parseFloat(money).toFixed(2);
	}
	
	$scope.getDiff = function( cost, lastprice ) {
		var price = parseFloat(lastprice);
		var diff = $scope.formatMoney(price - parseFloat(cost));
		return $sce.trustAsHtml("<span style='color:" + (parseFloat(diff) > 0 ? "green" : "red") + "'>" + (parseFloat(diff) > 0 ? "+" : "" ) + diff + " (" + (parseFloat(diff)*100/parseFloat(cost)).toFixed(2) + "%)</span>");
	}
})

.controller('ModalInstanceCtrl', function ($scope, $sce, $modalInstance, $http, name, ticker, template) {
	$scope.name = name;
	$scope.ticker = ticker;
	$http.get(template).success( function( data, something, headers, config ) {
		$scope.template = $sce.trustAsHtml(data);
	}).error( function( data, blah, headers, config ) {
		$scope.template = "<p>No due diligence available at the moment! I promise I will get around to it soon!</p>";
	});

	$scope.ok = function () {
		$modalInstance.close();
	};
});