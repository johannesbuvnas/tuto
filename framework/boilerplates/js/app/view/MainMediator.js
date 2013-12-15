define([
	"tutons",
	"app/view/MainViewComponent"
],
function( 
	tutons,
	MainViewComponent
)
{
	function MainMediator()
	{
		/* VARS */
		var _this = this;

		/* EVENTS */
		this.onRegister = function()
		{
		};
	}

	MainMediator.prototype.constructor = MainMediator;
	MainMediator.prototype.NAME = MainMediator.prototype.constructor.name;
	MainMediator.prototype = new tutons.core.view.mediator.Mediator( MainMediator.prototype.NAME );

	return MainMediator;
});