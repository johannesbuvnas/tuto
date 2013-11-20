define([],
function( Facade )
{
	function CoreClass()
	{
		/* PRIVATE REFERENCES */
		var _this = this;
		var _facadeKey;

		/* ACTIONS */
		this.initializeFacadeKey = function( facadeKey )
		{
			_facadeKey = facadeKey;

			return _facadeKey;
		};

		/* SET AND GET */
		this.getFacadeKey = function()
		{
			return _facadeKey;
		};

		this.getFacade = function()
		{
			return CoreClass.prototype.facadeClass.prototype.getInstance( _facadeKey );
		};

		this.getCore = function()
		{
			return _this;
		};

		/* EVENTS */
		this.onRegister = function()
		{
		};
	}

	return CoreClass;
});