angular.module('main.services', [])

.factory('Stocks', function($q, $http) {
	
	return {
		getPortfolio: function(filename) {
			var deferred = $q.defer();
            // var url = '/data/' + filename + '.json'
			console.log("Fetching " + url);
			$http.get(url).success( function(data, status, headers, config) {
				deferred.resolve(data);
			}).error( function(data, status, headers, config) {
				console.log(data);
                $http.get('/data/' + filename + '.json').success( function(data, status, headers, config) { 
                    deferred.resolve(data);
                });
            });
			
			return deferred.promise;
		},
		getStock: function(ticker) {
			var deferred = $q.defer();
			var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22" + ticker + "%22)&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&format=json";
			
			$http.get(url).success( function(data, status, headers, config) {
				deferred.resolve(data);
			});
			
			return deferred.promise;
		},
		getStocks: function(tickers) {
			var deferred = $q.defer();
			var ticks = "";
			
			for( var i = 0; i < tickers.length; ++i ) {
				ticks += "%22" + tickers[i] + "%22";
				ticks += (i != tickers.length - 1) ? "%2C" : "";
			}
			
			var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(" + ticks + ")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
			
			$http.get(url).success( function(data, status, headers, config) {
				deferred.resolve(data.query.results.quote);
			});
			
			return deferred.promise;
		},
	}
})

.factory('General', function($q, $http) {
	
	return {
		getIcons: function() {
			var deferred = $q.defer();
			
			$http.get('https://cdn.rawgit.com/adeng/albertdeng/dev/data/finance/icons.json').success( function(data, status, headers, config) {
				deferred.resolve(data);
			});
			
			return deferred.promise;
		},
		getJSON: function(url) {
			var deferred = $q.defer();

            var fullrl = 'https://cdn.rawgit.com/adeng/albertdeng/dev/data/' + url;
			$http.get(fullrl).success( function(data, status, headers, config) {
				deferred.resolve(data);
			});
			
			return deferred.promise;
		}
	}
});