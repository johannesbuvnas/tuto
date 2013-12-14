define([
	"core/CoreClass"
],
function( CoreClass )
{
	function Proxy( name )
	{
		/* VARS */
		var _this = this;
		var _name;
		var _map = [];

		var construct = function( name )
		{
			if( !name ) return console.log("Proxy::construct - no name");
			_name = name;
		};

		/* METHODS */
		this.add = function( item, key )
		{
			if(key) _map[ key ] = item;
			else _map.push( item );
		};

		this.has = function( key )
		{
			return _map[ key ] == null;
		};

		this.get = function( key )
		{
			return _map[ key ];
		};

		/* SET AND GET */
		this.getMap = function()
		{
			return _map;
		};
		this.getName = function()
		{
			return _name;
		};

		construct( name );
	}

	Proxy.prototype = new CoreClass();
	Proxy.prototype.constructor = Proxy;

	return Proxy;
});