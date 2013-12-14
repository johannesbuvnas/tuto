define(
[
	"tutons",
	"app/view/MainViewComponent",
	"app/view/MainMediator",
	"app/model/ajax/GetMetaBoxAjaxProxy"
],
function
( 
	tutons,
	MainViewComponent,
	MainMediator,
	GetMetaBoxAjaxProxy
)
{
	function StartUpCommand()
	{
		/* VARS */
		var _this = this;

		/* METHODS */
		var prepModels = function()
		{
			_this.getFacade().model.registerProxy( new GetMetaBoxAjaxProxy() );
		};

		var prepCommands = function()
		{

		};

		var prepViews = function()
		{
			_this.getFacade().view.registerMediator( new MainViewComponent(), new MainMediator() );
		};

		this.execute = function( event )
		{
			console.log("StartUpCommand:: Hello World!");
			prepModels();
			prepCommands();
			prepViews();
		};
	}

	StartUpCommand.prototype = new tutons.core.controller.command.Command();
	StartUpCommand.prototype.constructor = StartUpCommand;

	return StartUpCommand;
});