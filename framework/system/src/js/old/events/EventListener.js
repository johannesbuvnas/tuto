define([],
function()
{
	function EventListener(_type, _callback)
	{
		if(!_type) _type = "";
		if(!_callback) _callback = function(){};

		this.type = _type;
		this.callback = _callback;
	}

	return EventListener;
});