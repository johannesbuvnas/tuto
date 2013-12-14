define([],
function()
{
	/* VARS */

	/* CLASS */
	function FrameworkEvent(_type, _data)
	{
		this.type = _type;

		this.data = _data;
	}

	return FrameworkEvent;
});