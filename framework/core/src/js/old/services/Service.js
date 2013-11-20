define([
	"jquery"
],
function($)
{	
	/* CLASS */
	function Service()
	{
		var _this = this;

		// Constructor
		var initialize = function()
		{
			
		};

		initialize();
	}

	/* PUBLIC REFERENCES */
	Service.prototype.call = function(action, data, onSuccess, onError)
	{
		if(!onSuccess) onSuccess = function(){};

		if(!onError) onError = function(){};

		if(!data) data = {};

		data.action = action;
		data.nonce = WP_NONCE_ID;

		$.ajax({
			type: "post",
			dataType: "json",
			url: WP_URL + "/wp-admin/admin-ajax.php",
			data: data,
			success: onSuccess,
			error: onError
		});
	};

	Service.prototype.callForHTML = function(action, data, onSuccess, onError)
	{
		if(!onSuccess) onSuccess = function(){};

		if(!onError) onError = function(){};

		if(!data) data = {};

		data.action = action;
		data.nonce = WP_NONCE_ID;

		$.ajax({
			type: "post",
			dataType: "html",
			url: WP_URL + "/wp-admin/admin-ajax.php",
			data: data,
			success: onSuccess,
			error: onError
		});
	};

	Service.prototype.getWPQuery = function(args, onSuccess, onError)
	{
		if(!onSuccess) onSuccess = function(){};

		if(!onError) onError = function(){};

		if(!args) args = {};

		// console.log("Service.getWPQuery:");
		// console.log(args);

		$.ajax({
			type: "post",
			dataType: "json",
			url: WP_URL + "/wp-admin/admin-ajax.php",
			data: {
				action: "getWPQuery",
				args: args,
				nonce: WP_NONCE_ID,
			},
			success: onSuccess,
			error: onError
		});
	};

	Service.prototype.getWPQueryWhereDateIsOlder = function(args, date, onSuccess, onError)
	{
		if(!onSuccess) onSuccess = function(){};

		if(!onError) onError = function(){};

		if(!args) args = {};

		$.ajax({
			type: "post",
			dataType: "json",
			url: WP_URL + "/wp-admin/admin-ajax.php",
			data: {
				action: "getWPQueryWhereDateIsOlder",
				args: args,
				date: date,
				nonce: WP_NONCE_ID,
			},
			success: onSuccess,
			error: onError
		});
	};

	Service.prototype.getCategories = function(search, onSuccess, onError)
	{
		if(!onSuccess) onSuccess = function(){};

		if(!onError) onError = function(){};

		if(!search) search = "";

		// console.log("Service.getCategories:");
		// console.log(search);

		$.ajax({
			type: "post",
			dataType: "json",
			url: WP_URL + "/wp-admin/admin-ajax.php",
			data: {
				action: "getCategories",
				s: search,
				nonce: WP_NONCE_ID,
			},
			success: onSuccess,
			error: onError
		});
	};


	return Service;
});