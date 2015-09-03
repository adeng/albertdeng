angular.module('main.controllers', [])

.controller('MainCtrl', function($rootScope) {
	// $rootScope.module = 
})

.controller('FinanceCtrl', function($scope) {
	
})

.controller('StocksCtrl', function($q, $scope, $modal, Stocks) {
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
		return (parseFloat(diff) > 0 ? "+" : "" ) + diff;
	}
})

.controller('ModalInstanceCtrl', function ($scope, $sce, $modalInstance, $http, name, ticker, template) {
	$scope.name = name;
	$scope.ticker = ticker;
	$http.get(template).success( function( data, something, headers, config ) {
		$scope.template = $sce.trustAsHtml(data);
	});

	$scope.ok = function () {
		$modalInstance.close();
	};
});