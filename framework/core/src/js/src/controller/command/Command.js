define([
	"core/CoreClass"
],
function( CoreClass )
{
	function Command()
	{
		/* ACTIONS */
		this.execute = function( event )
		{
			
		};
	}

	Command.prototype = new CoreClass();
	Command.prototype.constructor = Command;

	return Command;
});