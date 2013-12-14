define([
	"core/controller/event/EventDispatcher",
	"core/view/mediator/Mediator"
],
function( EventDispatcher, Mediator )
{
	function View( key )
	{
		/* VARS */
		var _this = this;
		var _facadeKey;
		var _mediatorMap = [];

		var _construct = function( key )
		{
			_facadeKey = key;

			View.prototype.instanceMap[ _facadeKey ] = _this;

			console.log("View::_construct");
		};

		/* ACTIONS */

		/* METHODS */
		this.registerMediator = function( viewComponent, mediator )
		{
			if( !(mediator instanceof Mediator) ) return console.log( "View::registerMediator - mediator doesn't extend Mediator" );

			mediator.initializeFacadeKey( _this.getFacadeKey() );
			mediator.setViewComponent( viewComponent );
			_mediatorMap[ mediator.getName() ] = mediator;
			mediator.onRegister();

			return mediator;
		};
		this.retrieveMediator = function( name )
		{
			return _mediatorMap[ name ];
		};

		/* SET AND GET */
		this.getFacadeKey = function()
		{
			return _facadeKey;
		};

		_construct( key );
	}

	View.prototype = new EventDispatcher();
	View.prototype.constructor = View;

	/* STATIC VARS */
	View.prototype.instanceMap = [];

	/* STATIC SET AND GET */
	View.prototype.getInstance = function( key )
	{
		if( !key ) return console.log( "View::getInstance - no key" );

		if( View.prototype.instanceMap[ key ] ) 
		{
			return View.prototype.instanceMap[ key ];
		}
		else
		{
			return new View( key );
		}

		return null;
	};

	return View;
});