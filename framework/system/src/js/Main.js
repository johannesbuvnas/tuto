define([
	"tutons",
	"app/AppConstants",
	"app/controller/commands/StartUpCommand"
],
function( tutons, AppConstants, StartUpCommand )
{
	$(window).load(function()
	{
		var facade = new tutons.core.Facade( AppConstants.KEY );
		
		facade.controller.registerCommand( AppConstants.STARTUP, StartUpCommand );
		
		facade.dispatch( AppConstants.STARTUP, {} );
	});
});