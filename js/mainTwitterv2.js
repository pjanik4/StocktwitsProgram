'use strict';

StockRender.AppRender.register({
	id: "49e90eee6ce1942a94136fc8db19319c",
	name: "Twitter",
	version: "1.0.0",
	defaults: {
		terminal: {
			x: 0,
			y: 0,
			w: 100,
			h: 100
		}
	},
	beforeRender: function () {
		console.log('running beforeRender!');
	},
ready: function(AppMemory, AppData) {
		/*Defining Variables*/
		var last_input;

		/*Reading User-Data*/
		AppMemory.read('last_input')
			.success(function(data){
				if(!data) {
					AppMemory.write('last_input','A');
					last_input = 'A';
				} else {
					last_input = data;
				}
			})
			.error(function(err, data){
				if(err) {
					console.log('AppMemory not retrieved',data);
					AppMemory.write('last_input','A');
					last_input = 'A';
				}
			});
	
		//autocomplete
		AppData.v1.Tickerlist.GET('json')
			.then(function(data){
				var tickers = new Array();
				for (var i = 0; i < data.response.length; i++ ){
					tickers[i] = data.response[i].Ticker;
				}
			 	$("#autocomplete").autocomplete({
    				lookup: tickers,
    				onSelect: function (suggestion) {
      					var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
      					$('#outputcontent').html(thehtml);
      					$("#autocomplete").focus();
    				}
  				});
			});

		$('#autocomplete').keypress(function(e){
			if( e.which === 13 ) {
				//Runner.toggleOverhead();	
				Runner.loadData(AppData, $('#autocomplete')[0].value);
				return;
			}
		})

	}
});

 function Runner () {}

 Runner.loadData = function loadData(AppData, stockId){
	return Appdata;
 };

 