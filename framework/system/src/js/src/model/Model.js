define([
	"core/model/proxy/Proxy"
],
function( Proxy )
{
	function Model( key )
	{
		/* VARS */
		var _this = this;
		var _facadeKey;
		var _proxyMap = [];

		var _construct = function( key )
		{
			_facadeKey = key;

			Model.prototype.instanceMap[ _facadeKey ] = _this;

			console.log("Model::_construct");
		};

		/* METHODS */
		this.registerProxy = function( proxy )
		{
			if( !(proxy instanceof Proxy) ) return console.log( "Model::registerProxy - proxy isnt instance of Proxy" );

			proxy.initializeFacadeKey( _this.getFacadeKey() );
			_proxyMap[ proxy.getName() ] = proxy;
			proxy.onRegister();

			return proxy;
		};

		this.retrieveProxy = function( proxyName )
		{
			return _proxyMap[ proxyName ];
		};

		/* SET AND GET */
		this.getFacadeKey = function()
		{
			return _facadeKey;
		};

		_construct( key );
	}

	/* STATIC VARS */
	Model.prototype.instanceMap = [];

	/* STATIC SET AND GET */
	Model.prototype.getInstance = function( key )
	{
		if( !key ) return console.log( "Model::getInstance - no key" );

		if( Model.prototype.instanceMap[ key ] ) 
		{
			return Model.prototype.instanceMap[ key ];
		}
		else
		{
			return new Model( key );
		}

		return null;
	};

	return Model;
});