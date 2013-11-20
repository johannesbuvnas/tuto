define([
	TUTO_FRAMEWORK_URL + "/core/src/js/events/EventListener.js",
	TUTO_FRAMEWORK_URL + "/core/src/js/events/FrameworkEvent.js"
],
function(EventListener, FrameworkEvent)
{
	function EventDispatcher()
	{
		/* VARS */
		var _eventListeners = [];

		var _this = this;
		
		/* METHODS */
		this.addListener = function(type, callback)
		{
			var e = new EventListener(type, callback);

			_eventListeners.push( e );
		}
		
		this.dispatch = function(event)
		{
			for(var i = 0; i < _eventListeners.length; i++)
			{
				var _eventListener = _eventListeners[i];

				if(_eventListener.type == event.type) _eventListener.callback( event );
			}
		}

		this.factory = function(type, data)
		{
			return new FrameworkEvent(type, data)
		}
	}
	
	return EventDispatcher;
});