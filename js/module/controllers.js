angular.module('main.controllers', [])

.controller('MainCtrl', function($rootScope) {
	// $rootScope.module = 
})

.controller('FinanceCtrl', function($scope) {
	
})

.controller('AboutCtrl', function($scope, About) {
	$scope.selected;
	$scope.filter = 0;

	
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
		switch( $scope.filter ) {
			case 0:
				return first || second;
				
			case 1:
				return first;
			
			case 2:
				return second;
		}
	}
	
	About.loadItems('experience').then( function(val) {
		$scope.experiences = val;
	});
})

.controller('StocksCtrl', function($q, $scope, $modal, $sce, Stocks) {
	var tickers = new Array();
	var promises = [ Stocks.getPortfolio("shorts"), Stocks.getPortfolio("longs") ];
	
	$q.all(promises).then( function( val ) {
		$scope.shorts = val[0];
		$scope.longs = val[1];
		
		for( var i = 0; i < val[0].length; ++i ) {
			tickers.push(val[0][i]['ticker']);
		}
		for( var j = 0; j < val[1].length; ++j ) {
			tickers.push(val[1][j]['ticker']);
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
	
	$scope.open = function ( stockobj ) {
		$modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: '/templates/interface/modal.html',
			controller: 'ModalInstanceCtrl',
			size: 'lg',
			resolve: {
				name: function() { return stockobj.name },
				ticker: function() { return stockobj.ticker },
				template: function() { return '/data/stocks/' + stockobj.ticker + '.html'}
			}
    	});
  	}
	
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