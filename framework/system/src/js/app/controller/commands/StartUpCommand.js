define(
[
	"tutons",
	"app/view/MainViewComponent",
	"app/view/MainMediator"
],
function
( 
	tutons,
	MainViewComponent,
	MainMediator
)
{
	function StartUpCommand()
	{
		/* VARS */
		var _this = this;

		/* METHODS */
		var prepModels = function()
		{
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