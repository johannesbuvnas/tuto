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

		var _metaBoxAjax;

		/* EVENTS */
		this.onRegister = function()
		{
			_metaBoxAjax = _this.getFacade().model.retrieveProxy( "GetMetaBoxAjaxProxy" );
		};
	}

	MetaBoxModelMediator.prototype.constructor = MetaBoxModelMediator;
	MetaBoxModelMediator.prototype = new tutons.core.view.mediator.Mediator( "MetaBoxModelMediator" );

	return MetaBoxModelMediator;
});