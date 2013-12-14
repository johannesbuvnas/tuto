define([
	"core/CoreClass",
	"core/model/Model",
	"core/controller/Controller",
	"core/controller/event/Event",
	"core/view/View",
],
function( CoreClass, Model, Controller, Event, View )
{
	function Facade( key )
	{
		/* PRIVATE REFERENCES */
		var _this = this;
		var _key;

		/* PUBLIC VARS */
		this.model;
		this.view;
		this.controller;


		/* CONSTUCTOR */
		var construct = function( key )
		{
			if( !key ) return console.log( "Facade::error(" + "need key" + ")" );

			_key = key;

			Facade.prototype.instanceMap[ key ] = _this;

			console.log( "Facade::construct" );

			initializeModel();
			initializeController();
			initializeView();
		};
		var initializeModel = function()
		{
			_this.model = Model.prototype.getInstance( _this.getKey() );
		};
		var initializeController = function()
		{
			_this.controller = Controller.prototype.getInstance( _this.getKey() );
		};
		var initializeView = function()
		{
			_this.view = View.prototype.getInstance( _this.getKey() );
		};

		/* ACTIONS */
		this.dispatch = function( name, body )
		{
			_this.view.dispatch( new Event( name, body ) );
		};

		
		/* SET AND GET */
		this.getKey = function()
		{
			return _key;
		};


		construct( key );
	}

	/* STATIC VARS */
	Facade.prototype.instanceMap = [];

	/* STATIC SET AND GET */
	Facade.prototype.getInstance = function( key )
	{
		if( !key ) return console.log( "Facade::getInstance - no key" );

		if( Facade.prototype.instanceMap[ key ] ) 
		{
			return Facade.prototype.instanceMap[ key ];
		}
		else
		{
			return console.log( "Facade::getInstance - no found" );
		}

		return null;
	};

	CoreClass.prototype.facadeClass = Facade;

	return Facade;
});