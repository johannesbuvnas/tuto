define([
	"core/CoreClass",
	"core/controller/event/Event"
],
function( CoreClass, Event )
{
	function Mediator( name, viewComponent )
	{
		/* VARS */
		var _this = this;
		var _name;
		var _viewComponent;

		var construct = function( name )
		{
			_this.setName( name );
		};

		/* ACTIONS */
		this.dispatch = function( name, body )
		{
			_this.getFacade().view.dispatch( new Event( name, body ) );
		};

		/* SET AND GET */
		this.setViewComponent = function( viewComponent )
		{
			_viewComponent = viewComponent;
		};
		this.getViewComponent = function()
		{
			return _viewComponent;
		};

		this.setName = function( name )
		{
			_name = name;
		};
		this.getName = function()
		{
			return _name;
		};

		/* EVENTS */
		this.onRegister = function()
		{
			console.log( "Mediator::onRegister( " + _this.getName() + ")" );
		};

		construct( name, viewComponent );
	}

	Mediator.prototype = new CoreClass();
	// Mediator.prototype.constructor = Mediator;

	return Mediator;
})