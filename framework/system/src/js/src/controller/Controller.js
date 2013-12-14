define([
	"core/view/View",
	"core/controller/event/Event",
	"core/controller/command/Command"
],
function( View, Event, Command )
{
	function Controller( key )
	{
		/* VARS */
		var _this = this;
		var _facadeKey;
		var _commandMap = [];
		var _view;

		var _construct = function( key )
		{
			_facadeKey = key;
			_view = View.prototype.getInstance( _facadeKey );

			Controller.prototype.instanceMap[ _facadeKey ] = _this;

			console.log( "Controller::_construct" );
		};

		/* ACTIONS */
		this.executeCommand = function( event )
		{
			if( !(event instanceof Event) ) return console.log( "Controller::executeCommand - event isnt instance of Event" );

			if( _commandMap[ event.getName() ] ) 
			{
				var command = new _commandMap[ event.getName() ]();
				if( !(command instanceof Command) ) return console.log( "Controller::executeCommand - command isnt instance of Command" );
				command.initializeFacadeKey( _this.getFacadeKey() );
				command.execute( event );
			}
		};

		/* METHODS */
		this.registerCommand = function( name, commandClassReference )
		{
			_commandMap[ name ] = commandClassReference;
			_view.addListener( name, _this.executeCommand );
		};

		/* SET AND GET */
		this.getFacadeKey = function()
		{
			return _facadeKey;
		};

		_construct( key );
	}

	/* STATIC VARS */
	Controller.prototype.instanceMap = [];

	/* STATIC SET AND GET */
	Controller.prototype.getInstance = function( key )
	{
		if( !key ) return console.log( "Controller::getInstance - no key" );

		if( Controller.prototype.instanceMap[ key ] ) 
		{
			return Controller.prototype.instanceMap[ key ];
		}
		else
		{
			return new Controller( key );
		}

		return null;
	};

	return Controller;
});