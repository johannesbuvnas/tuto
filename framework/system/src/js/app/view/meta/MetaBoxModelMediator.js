define(
[
	"tutons"
],
function
( 
	tutons
)
{
	function MetaBoxModelMediator()
	{
		/* VARS */
		var _this = this;

		/* EVENTS */
		this.onRegister = function()
		{
		};
	}

	MetaBoxModelMediator.prototype.constructor = MetaBoxModelMediator;
	MetaBoxModelMediator.prototype = new tutons.core.view.mediator.Mediator( "MetaBoxModelMediator" );

	return MetaBoxModelMediator;
});