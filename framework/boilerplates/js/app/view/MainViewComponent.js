define([
	"tutons"
],
function( 
	tutons,
	WorkAreaViewComponent
)
{
	function MainViewComponent()
	{
		/* PRIVATE REFERENCES */
		var _this = this;

		/* PUBLIC REFERENCES */

		var construct = function()
		{
		};

		construct();
	}

	MainViewComponent.prototype = new tutons.core.controller.event.EventDispatcher();
	MainViewComponent.prototype.constructor = MainViewComponent;

	return MainViewComponent;
});