require.config({
	baseUrl: Tuto.baseURL + "/src/js/",
	deps: [ 'Main' ],
	paths:
	{
		"jquery" : Tuto.baseURL + "/libs/js/jquery-2.0.3.min",
		"base64" : Tuto.baseURL + "/libs/js/base64",
		"tutons" : "require/tutons",
	},
	shim:
	{
		'tutons':
		{
			deps: [ 'jquery' ]
		}
	}
});