define([
	"core/controller/event/Event"
],
function( Event )
{
	function EventDispatcher()
	{
		/* VARS */
		var _this = this;
		var _listenerMap = [];

		/* ACTIONS */
		this.dispatch = function( event )
		{
			if( !(event instanceof Event) ) return console.log( "EventDispatcher::dispatch - event isnt an instance of Event" );

			if( _listenerMap[ event.getName() ] ) _listenerMap[ event.getName() ]( event );
		};

		/* METHODS */
		this.addListener = function( eventName, callback )
		{
			_listenerMap[ eventName ] = callback;

			return true;
		};
	}

	return EventDispatcher;
});