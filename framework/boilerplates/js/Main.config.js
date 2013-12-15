require.config({
	deps: [ 'Main' ],
	paths:
	{
		jquery: Globals.baseURL + "/assets/js/jquery/jquery-2.0.3.min",
		"underscore": Globals.baseURL + "/assets/js/underscore-min",
		"tutons": Globals.tutoBaseURL + "/system/src/js/require/tutons",
		"json" : Globals.baseURL + "/assets/js/json2",
	},
	shim:
	{
		'tutons':
		{
			deps: [ 'jquery' ]
		}
	},
	baseUrl: Globals.baseURL + "/src/js/"
});