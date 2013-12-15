define([
	"tutons",
	"jquery",
	"app/AppConstants",
	"app/controller/command/StartUpCommand"
],
function( tutons, jquery, AppConstants, StartUpCommand )
{
	var facade = tutons.core.Facade.getInstance( AppConstants.KEY );

	facade.controller.registerCommand( AppConstants.STARTUP, StartUpCommand );

	facade.dispatch( AppConstants.STARTUP, {} );
});