angular.module('main.controllers', [])

.controller('MainCtrl', function($scope, $rootScope) {
	$scope.splitViewElement = document.getElementById("splitView");
})

.controller('FinanceCtrl', function($scope) {
	$scope.selected = 0;
    
    $scope.set = function( input ) {
        $scope.selected = input;
    }
})

.controller('AboutCtrl', function($scope, $rootScope, About) {
	$scope.selected;
	$scope.radioModel = 0;
	$scope.classModel = 0;

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
		About.loadItems('education').then( function(val) {
			var arr = new Array();
			for( var a in val ) {
				if( val[a].tags.indexOf( param ) != -1 )
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

.controller('ReportsCtrl', function($scope, Stocks) {
    Stocks.getPortfolio("reports").then( function( val ) {
        $scope.reports = val;
    });
    
    $scope.open = function( url ) {
        
    }
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