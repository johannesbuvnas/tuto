define([
	"jquery"
],
function( $ )
{
	return new function()
	{
	// begin tutons

		/* PRIVATE REFERENCES */
		var _ns = this;
		var _classExtensions = [];

		/* PRIVATE METHODS */
		var extend = function( childName, parentName )
		{
			_classExtensions.push( {
				"childName" : childName,
				"parentName" : parentName
			} );
		};

		var init = function()
		{
			for(var i = 0; i < _classExtensions.length; i++)
			{
				var extension = _classExtensions[i];
				var childClass = eval( extension.childName );
				var childPrototype = childClass.prototype;
				var parentClass = eval( extension.parentName );

				childClass.prototype = new parentClass();
				childClass.prototype.constructor = childClass;

				for (var key in childPrototype)
				{
				   if( !childClass.prototype[ key ] ) childClass.prototype[ key ] = childPrototype[ key ];
				}
			}
		};

		this.core = new function()
		{
			/* PUBLIC CLASSES */
			this.CoreClass = function()
			{
				/* PRIVATE REFERENCES */
				var _this = this;
				var _facadeKey;

				/* ACTIONS */
				this.initializeFacadeKey = function( facadeKey )
				{
					_facadeKey = facadeKey;

					return _facadeKey;
				};

				/* SET AND GET */
				this.getFacadeKey = function()
				{
					return _facadeKey;
				};

				this.getFacade = function()
				{
					return _ns.core.Facade.prototype.getInstance( _facadeKey );
				};

				/* EVENTS */
				this.onRegister = function()
				{
				};
			};

			this.Facade = function( key )
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

					_ns.core.Facade.prototype.instanceMap[ key ] = _this;

					console.log( "Facade::construct" );

					initializeModel();
					initializeController();
					initializeView();
				};
				var initializeModel = function()
				{
					_this.model = _ns.core.model.Model.prototype.getInstance( _this.getKey() );
				};
				var initializeController = function()
				{
					_this.controller = _ns.core.controller.Controller.prototype.getInstance( _this.getKey() );
				};
				var initializeView = function()
				{
					_this.view = _ns.core.view.View.prototype.getInstance( _this.getKey() );
				};

				/* ACTIONS */
				this.dispatch = function( name, body )
				{
					_this.view.dispatchEvent( new _ns.core.controller.event.Event( name, body ) );
				};

				
				/* SET AND GET */
				this.getKey = function()
				{
					return _key;
				};

				construct( key );
			};
			/* STATIC REFERENCES */
			this.Facade.prototype.instanceMap = [];
			this.Facade.prototype.getInstance = function( key )
			{
				if( !key ) return console.log( "Facade::getInstance - no key" );

				if( _ns.core.Facade.prototype.instanceMap[ key ] ) 
				{
					return _ns.core.Facade.prototype.instanceMap[ key ];
				}
				else
				{
					return console.log( "Facade::getInstance - no found" );
				}

				return null;
			};

			this.model = new function()
			{
			// begin tutons.model

				this.proxy = new function()
				{
				// begin tutons.model.proxy

					extend( "_ns.core.model.proxy.Proxy", "_ns.core.CoreClass" );
					this.Proxy = function( name )
					{

						/* VARS */
						var _this = this;
						var _name;
						var _map = [];

						var construct = function( name )
						{
							if( !name ) return console.log("Proxy::construct - no name");
							_name = name;
						};

						/* METHODS */
						this.add = function( item, key )
						{
							if(key) _map[ key ] = item;
							else _map.push( item );
						};

						this.has = function( key )
						{
							return _map[ key ] != null;
						};

						this.get = function( key )
						{
							return _map[ key ];
						};

						/* SET AND GET */
						this.getMap = function()
						{
							return _map;
						};
						this.getName = function()
						{
							return _name;
						};

						construct( name );
					};

				// end tutons.model.proxy
				};

				this.Model = function( key )
				{
					/* VARS */
					var _this = this;
					var _facadeKey;
					var _proxyMap = [];

					var construct = function( key )
					{
						_facadeKey = key;

						_ns.core.model.Model.prototype.instanceMap[ _facadeKey ] = _this;

						console.log("Model::construct");
					};

					/* METHODS */
					this.registerProxy = function( proxy )
					{
						if( !(proxy instanceof _ns.core.model.proxy.Proxy) ) return console.log( "Model::registerProxy - proxy isnt instance of Proxy" );

						proxy.initializeFacadeKey( _this.getFacadeKey() );
						_proxyMap[ proxy.getName() ] = proxy;
						proxy.onRegister();

						return proxy;
					};

					this.retrieveProxy = function( proxyName )
					{
						return _proxyMap[ proxyName ];
					};

					/* SET AND GET */
					this.getFacadeKey = function()
					{
						return _facadeKey;
					};

					construct( key );
				};

				/* STATIC REFERENCES */
				this.Model.prototype.instanceMap = [];
				this.Model.prototype.getInstance = function( key )
				{
					if( !key ) return console.log( "Model::getInstance - no key" );

					if( _ns.core.model.Model.prototype.instanceMap[ key ] ) 
					{
						return _ns.core.model.Model.prototype.instanceMap[ key ];
					}
					else
					{
						return new _ns.core.model.Model( key );
					}

					return null;
				};

			// end tutons.model
			};

			this.view = new function()
			{
			// begin tutons.view

				this.mediator = new function()
				{
				//begin tutons.view.mediator

					extend( "_ns.core.view.mediator.Mediator", "_ns.core.CoreClass" );
					this.Mediator = function( name, viewComponent )
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
							console.log( "Mediator::onRegister( " + _this.getName() + " )" );
						};

						construct( name, viewComponent );
					};

				//end tutons.view.mediator
				};

				extend( "_ns.core.view.View", "_ns.core.controller.event.EventDispatcher" );
				this.View = function( key )
				{
					/* VARS */
					var _this = this;
					var _facadeKey;
					var _mediatorMap = [];

					var construct = function( key )
					{
						_facadeKey = key;

						_ns.core.view.View.prototype.instanceMap[ _facadeKey ] = _this;

						console.log("View::construct");
					};

					/* ACTIONS */

					/* METHODS */
					this.registerMediator = function( viewComponent, mediator )
					{
						if( !(mediator instanceof _ns.core.view.mediator.Mediator) ) return console.log( "View::registerMediator - mediator doesn't extend Mediator" );

						mediator.initializeFacadeKey( _this.getFacadeKey() );
						mediator.setViewComponent( viewComponent );
						_mediatorMap[ mediator.getName() ] = mediator;
						mediator.onRegister();

						return mediator;
					};
					this.retrieveMediator = function( name )
					{
						return _mediatorMap[ name ];
					};

					/* SET AND GET */
					this.getFacadeKey = function()
					{
						return _facadeKey;
					};

					construct( key );
				};
				/* STATIC REFERENCES */
				this.View.prototype.instanceMap = [];
				this.View.prototype.getInstance = function( key )
				{
					if( !key ) return console.log( "View::getInstance - no key" );

					if( _ns.core.view.View.prototype.instanceMap[ key ] ) 
					{
						return _ns.core.view.View.prototype.instanceMap[ key ];
					}
					else
					{
						return new _ns.core.view.View( key );
					}

					return null;
				};

			// end tutons.view
			};

			this.controller = new function()
			{
			// begin tutons.controller

				this.command = new function()
				{
				// begin tutons.controller.command
					
					extend( "_ns.core.controller.command.Command", "_ns.core.CoreClass" );
					this.Command = function()
					{
						/* ACTIONS */
						this.execute = function( event )
						{
							
						};
					};

				// end tutons.controller.command
				};

				this.Controller = function( key )
				{
					/* VARS */
					var _this = this;
					var _facadeKey;
					var _commandMap = [];
					var _view;

					var construct = function( key )
					{
						_facadeKey = key;
						_view = _ns.core.view.View.prototype.getInstance( _facadeKey );

						_ns.core.controller.Controller.prototype.instanceMap[ _facadeKey ] = _this;

						console.log( "Controller::construct" );
					};

					/* ACTIONS */
					this.executeCommand = function( event )
					{
						if( !(event instanceof _ns.core.controller.event.Event) ) return console.log( "Controller::executeCommand - event isnt instance of Event" );

						if( _commandMap[ event.getName() ] ) 
						{
							var command = new _commandMap[ event.getName() ]();
							if( !(command instanceof _ns.core.controller.command.Command) ) return console.log( "Controller::executeCommand - command isnt instance of Command" );
							command.initializeFacadeKey( _this.getFacadeKey() );
							command.execute( event );
						}
					};

					/* METHODS */
					this.registerCommand = function( name, commandClassReference )
					{
						_commandMap[ name ] = commandClassReference;
						_view.addEventListener( name, _this.executeCommand );
					};

					/* SET AND GET */
					this.getFacadeKey = function()
					{
						return _facadeKey;
					};

					construct( key );
				};
				/* STATIC REFERENCES */
				this.Controller.prototype.instanceMap = [];
				this.Controller.prototype.getInstance = function( key )
				{
					if( !key ) return console.log( "Controller::getInstance - no key" );

					if( _ns.core.controller.Controller.prototype.instanceMap[ key ] ) 
					{
						return _ns.core.controller.Controller.prototype.instanceMap[ key ];
					}
					else
					{
						return new _ns.core.controller.Controller( key );
					}

					return null;
				};

				this.event = new function()
				{
				// begin tutons.controller.event

					this.Event = function( name, body )
					{
						/* VARS */
						var _name = name;
						var _body = body;

						/* SET AND GET */
						this.setName = function( name )
						{
							_name = name;
						};
						this.getName = function()
						{
							return _name;
						};

						this.setBody = function( body )
						{
							_body = body;
						};
						this.getBody = function()
						{
							return _body;
						};
					};

					this.EventDispatcher = function()
					{
						/* VARS */
						var _this = this;
						var _listenerMap = [];

						/* ACTIONS */
						this.dispatchEvent = function( event )
						{
							if( !(event instanceof _ns.core.controller.event.Event) ) return console.log( "EventDispatcher::dispatch - event isnt an instance of tutons.core.controller.event.Event" );

							if( _listenerMap[ event.getName() ] )
							{
								for(var k in _listenerMap[ event.getName() ])
								{
									var eventListenerCallback = _listenerMap[ event.getName() ][ k ];
									eventListenerCallback( event );
								}
							}
						};

						/* METHODS */
						this.addEventListener = function( eventName, callback )
						{
							if( !_listenerMap[ eventName ] ) _listenerMap[ eventName ] = [];

							_listenerMap[ eventName ].push( callback );

							return true;
						};

						this.removeEventListener = function( eventName, callback )
						{
							if( _listenerMap[ eventName ] )
							{
								for(var k in _listenerMap[ eventName ])
								{
									var eventListenerCallback = _listenerMap[ eventName.getName() ][ k ];
									if( eventListenerCallback == callback ) 
									{
										_listenerMap[ eventName.getName() ][ k ] = null;
										delete _listenerMap[ eventName.getName() ][ k ];
									}
								}
							}

							return true;
						};
					};

				// end tutons.controller.event
				};

			// end tutons.controller
			};
		};

		this.components = new function()
		{
		// tutons.components

			this.controller = new function()
			{
				this.event = new function()
				{
					this.EventTypes =
					{
						CHANGE : "change"
					};
				};
			};

			this.model = new function()
			{
				// tutons.model
				this.proxy = new function()
				{
				// begin tutons.components.model.proxy

					this.VOProxy = function( name )
					{

						/* VARS */
						var _this = this;
						var _name;
						var _map = [];

						var construct = function( name )
						{
							_name = name;
						};

						/* METHODS */
						this.addVO = function( name, value )
						{
							var vo = new _ns.components.model.vo.ValueObject( name, value );
							add( vo, vo.getValue() );
						};

						var add = function( item, key )
						{
							if(key) _map[ key ] = item;
							else _map.push( item );
						};

						this.has = function( key )
						{
							return _map[ key ] != null;
						};

						this.get = function( key )
						{
							return _map[ key ];
						};

						this.remove = function( key )
						{
							_map[ key ] = null;
							delete _map[ key ];
						};

						/* SET AND GET */
						this.getElement = function()
						{
							var element = $( "<div class='VOProxy'></div>" );
							if( _this.getName() ) 
							{
								element.append( "<div class='Name'><span>" + _this.getName() + "</span></div>" );
							}

							var map = $( "<div class='Map'></div>" );

							for(var k in _map)
							{
								var vo = _map[ k ];
								map.append( vo.getElement() );
							}

							element.append( map );

							return element;
						};

						this.getMap = function()
						{
							return _map;
						};

						this.setName = function( name )
						{
							_name = name;
						};
						this.getName = function()
						{
							return _name;
						};

						construct( name );
					};

				// end tutons.components.model.proxy
				};
				this.vo = new function()
				{
				// tutons.components.model.vo

						this.ValueObject = function( name, value )
						{
							var _this = this;
							var _value;
							var _name;

							var construct = function( name, value )
							{
								_name = name;
								_value = value ? value : name;
							};

							/* SET AND GET */
							this.setValue = function( value )
							{
								_value = value;
							};
							this.getValue = function()
							{
								return _value;
							};

							this.setName = function( name )
							{
								_name = name;
							};
							this.getName = function()
							{
								return _name;
							};

							this.getElement = function()
							{
								var element = $( '<div class="ValueObject"></div>' );
								element.append( "<span class='Name'>" + _this.getName() + "</div>" );
								element.attr( "dataValue", _this.getValue() );
								element.attr( "dataName", _this.getName() );

								return element;
							};

							construct( name, value )
						};

				// end tutons.components.model.vo
				};

				this.Model = function()
				{
					/* VARS */
					var _this = this;
					var _facadeKey;
					var _proxyMap = [];

					var construct = function()
					{
					};

					/* METHODS */
					this.addProxy = function( proxy )
					{
						if( !(proxy instanceof _ns.components.model.proxy.VOProxy) ) return console.log( "Model::addProxy - proxy isnt instance of VOProxy" );

						if(proxy.getName()) _proxyMap[ proxy.getName() ] = proxy;
						else _proxyMap.push( proxy );

						return proxy;
					};

					this.getProxy = function( proxyName )
					{
						return proxyName ? _proxyMap[ proxyName ] : _proxyMap[0];
					};

					this.getElement = function()
					{
						var element = $( "<div class='Model'></div>" );

						for(var i in _proxyMap)
						{
							var proxy = _proxyMap[ i ];
							element.append( proxy.getElement() );
						}

						return element;
					};

					/* SET AND GET */

					construct();
				};

			// tutons.model
			};

			this.buttons = new function()
			{
			// tutons.components.buttons

				extend( "_ns.components.buttons.Button", "_ns.core.controller.event.EventDispatcher" );
				this.Button = function( label )
				{
					var _this = this;
					this.element = $( '<div class="Button"></div>' );
					this.symbol = $( "<div class='Symbol'></div>" );
					this.element.append( _this.symbol );
					this.label = $( "<span class='Label'></span>" );
					this.element.append( _this.label );

					/* SET AND GET */
					this.setLabel = function( label )
					{
						_this.label.html( label );
					};

					this.getElement = function()
					{
						return _this.element;
					};

					_this.setLabel( label );
				};

			// end tutons.components.buttons
			};

			this.form = new function()
			{
			// tutons.components.form

				this.input = new function()
				{
				// tutons.components.form.input

					extend( "_ns.components.form.input.Input", "_ns.core.controller.event.EventDispatcher" );
					this.Input = function( element )
					{
						var _this = this;
						var _input;
						var _element;
						var _name;
						var _value;

						var construct = function( element )
						{
							_element = $( element );
						};

						/* ACTIONS */
						this.reset = function()
						{
							if(_this.getElement() instanceof $)
							{
								_this.getElement().html( "" );
								_input = $( '<input type="hidden" name="' + _this.getName() + '" value="' + _this.getValue() + '" />' );
								_this.getElement().append( _input );
							}
						};

						/* SET AND GET */
						this.setElement = function( element )
						{
							_element = element;
						};
						this.getElement = function()
						{
							return _element;
						};

						this.setValue = function( value )
						{
							_value = value;
						};
						this.getValue = function()
						{
							return _value;
						};

						this.setName = function( name )
						{
							_name = name;
						};
						this.getName = function()
						{
							return _name;
						};

						this.getInput = function()
						{
							return _input;
						};

						construct( element );
					};

					extend( "_ns.components.form.input.Selector", "_ns.components.form.input.Input" );
					this.Selector = function( element )
					{
						var _this = this;
						var _super = this.constructor.prototype;
						this.model;

						var construct = function( element )
						{
							_this.setElement( $( element ) );

							_this.model = new _ns.components.model.Model();

							_this.reset();
						};

						/* ACTIONS */
						this.reset = function()
						{
							_super.reset();

							var modelElement = _this.model.getElement();
							_this.getElement().append( modelElement );

							_this.getElement().addClass( "Selector" );
						};

						/* SET AND GET */
						this.setValue = function( value )
						{
							_super.setValue( value );

							_this.getInput().attr( "value", value );

							_this.getElement().attr( "dataValue", "value" );
						};

						this.setName = function( name )
						{
							_super.setName( name );

							_this.getElement().attr( "dataName", name );

							_this.getInput().attr( "name", name );
						};

						/* EVENT HANDLERS */

						construct( element );

					};

					extend( "_ns.components.form.input.SwitchSelector", "_ns.components.form.input.Selector" );
					this.SwitchSelector = function( element )
					{
						var _this = this;
						var _super = this.constructor.prototype;

						var construct = function( element )
						{
							_this.setElement( $( element ) );

							_this.reset();
						};

						/* ACTIONS */
						this.reset = function()
						{
							_super.reset();

							_this.getElement().find( ".Model" ).addClass( "clearfix" );

							_this.getElement().find( ".ValueObject" ).each(function()
								{
									$(this).addClass( "Button" );
									$(this).append( "<div class='Symbol'></div>" );
									$(this).off( "click" );
									$(this).on( "click", onSelect );
								});

							_this.getElement().removeClass( "Selector" );
							_this.getElement().addClass( "SwitchSelector" );

							_this.setValue(null);
						};

						this.select = function( value )
						{
							_this.setValue( value );
						};

						/* SET AND GET */
						this.setValue = function( value )
						{
							_super.setValue( value );

							_this.getElement().attr( "dataValue", value );

							_this.getElement().find( "div.ValueObject" ).each(function()
								{
									$(this).removeClass( "Deselected" );
									$(this).removeClass( "Selected" );

									if( $(this).attr("dataValue") == value) $(this).addClass( "Selected" );
									else $(this).addClass( "Deselected" );
								});
						};

						/* EVENT HANDLERS */
						var onSelect = function( e )
						{
							e.preventDefault();
							
							var newValue = $( e.currentTarget ).attr( "dataValue" );

							if( _this.getValue() != newValue )
							{
								_this.select( newValue  );

								_this.dispatchEvent( new _ns.core.controller.event.Event( _ns.components.controller.event.EventTypes.CHANGE, _this.getValue() ) );
							}
						};

						construct( element );
					};

					extend( "_ns.components.form.input.SingleSelector", "_ns.components.form.input.Selector" );
					this.SingleSelector = function( element )
					{
						var _this = this;
						var _super = this.constructor.prototype;
						this.autoUpdateLabel = true;
						this.button;
						var _expanded = false;

						var construct = function( element )
						{
							_this.setElement( $( element ) );

							$( document ).mouseup( onClickOutside );

							_this.reset();
						};

						/* ACTIONS */
						this.reset = function()
						{
							_super.reset();

							_this.button = new _ns.components.buttons.Button();
							_this.button.getElement().on( "click", _this.toggle );
							_this.getElement().append( _this.button.getElement() );

							_this.getElement().find( ".ValueObject" ).each(function()
								{
									$(this).addClass( "Button" );
									$(this).append( "<div class='Symbol'></div>" );
									$(this).off( "click" );
									$(this).on( "click", onSelect );
								});

							_this.getElement().find( ".Model" ).append( "<div class='Symbol'></div>" );

							_this.getElement().addClass( "SingleSelector" );

							_this.collapse();
						};

						this.select = function( name, value )
						{
							_this.setLabel( name );
							_this.setValue( value );
						};

						this.toggle = function()
						{
							if(_expanded) _this.collapse();
							else _this.expand();
						};

						this.expand = function()
						{
							_this.getElement().removeClass( "Collapsed" );
							_this.getElement().addClass( "Expanded" );

							_expanded = true;
						};

						this.collapse = function()
						{
							_this.getElement().addClass( "Collapsed" );
							_this.getElement().removeClass( "Expanded" );

							_expanded = false;
						};

						/* SET AND GET */
						this.setValue = function( value )
						{
							_super.setValue( value );

							_this.getElement().attr( "dataValue", value );

							_this.getElement().find( "div.ValueObject" ).each(function()
								{
									$(this).removeClass( "Deselected" );
									$(this).removeClass( "Selected" );

									if( $(this).attr("dataValue") == value) $(this).addClass( "Selected" );
									else $(this).addClass( "Deselected" );
								});
						};

						this.setLabel = function( label )
						{
							if(_this.autoUpdateLabel) _this.button.setLabel( label );
						};

						this.setElement = function( element )
						{
							_super.setElement( element );

							_this.getElement().mouseup( onClickInside );
						};

						/* EVENT HANDLERS */
						var onClickInside = function( e )
						{
							e.stopPropagation();
						};

						var onClickOutside = function( e )
						{
							_this.collapse();
						};

						var onSelect = function( e )
						{
							e.preventDefault();

							var newValue = $( e.currentTarget ).attr( "dataValue" );

							if( _this.getValue() != newValue )
							{
								var newName = $( e.currentTarget ).attr( "dataName" );

								_this.select( newName, newValue  );

								_this.dispatchEvent( new _ns.core.controller.event.Event( _ns.components.controller.event.EventTypes.CHANGE, _this.getValue() ) );
							}

							_this.collapse();
						};

						construct( element );
					};

					extend( "_ns.components.form.input.MultiSelector", "_ns.components.form.input.SingleSelector" );
					this.MultiSelector = function( element )
					{
						var _this = this;
						var _super = this.constructor.prototype;
						this.selectedValues;
						this.autoUpdateLabel = false;

						var construct = function( element )
						{
							_this.setElement( $( element ) );

							_this.reset();
						};

						/* ACTIONS */
						this.reset = function()
						{
							_super.reset();

							_this.selectedValues = new _ns.components.model.proxy.VOProxy();

							_this.getElement().find( ".ValueObject" ).each(function()
								{
									$(this).off( "click" );
									$(this).on( "click", onSelect );
								});

							_this.getElement().addClass( "MultiSelector" );
						};

						this.select = function( name, value )
						{
							_this.addValue( name, value );

							var v = "";
							var i = 0;
							for(var k in _this.selectedValues.getMap())
							{
								if(i > 0) v += ",";
								v += _this.selectedValues.get( k ).getValue();
								i++;
							}

							_this.getInput().attr("value", v);
							_this.getElement().attr( "dataValue", v );
						};

						this.addValue = function( name, value )
						{
							if( _this.selectedValues.has( value ) )
							{
								_this.selectedValues.remove( value );
							}
							else
							{
								_this.selectedValues.addVO( name, value );
							}

							_this.getElement().find( "div.ValueObject" ).each(function()
								{
									$(this).removeClass( "Deselected" );
									$(this).removeClass( "Selected" );

									if( _this.selectedValues.has( $(this).attr("dataValue") ) ) $(this).addClass( "Selected" );
									else $(this).addClass( "Deselected" );
								});
						};

						/* SET AND GET */
						this.setLabel = function( label )
						{
							_this.button.setLabel( label );
						};

						/* EVENT HANDLERS */

						var onSelect = function( e )
						{
							e.preventDefault();

							_this.select( $( e.currentTarget ).attr( "dataName" ) , $( e.currentTarget ).attr( "dataValue" )  );

							_this.dispatchEvent( new _ns.core.controller.event.Event( _ns.components.controller.event.EventTypes.CHANGE, _this.getValue() ) );
						};

						construct( element );
					};

					extend( "_ns.components.form.input.TagMultiSelector", "_ns.components.form.input.MultiSelector" );
					this.TagMultiSelector = function( element )
					{
						var _this = this;
						var _super = this.constructor.prototype;
						var _selectedValuesElement;
						var _filterButton;
						var _filter;

						var construct = function( element )
						{
							_this.setElement( $( element ) );

							_this.reset();
						};

						/* ACTIONS */
						var adjustUI = function()
						{
							_selectedValuesElement.html( "" );
							_selectedValuesElement.append( _this.selectedValues.getElement() );
							_selectedValuesElement.find( ".ValueObject" ).each(function()
								{
									$(this).addClass("Button");
									$(this).append("<div class='Symbol'></div>");
									$(this).on( "click", onSelect );
								});

							_this.resetFilter();
						};

						this.resetFilter = function()
						{
							_filter.val("");

							_this.collapse();

							_this.filter(null);
						};

						this.reset = function()
						{
							_super.reset();

							_filter = $( "<input type='text' autocomplete='off' />" );
							_filter.addClass( "TextBox" );
							_filter.on( "input", onFilter );
							_filter.on( "focus", _this.expand );

							_filterButton = new _ns.components.buttons.Button();
							_filterButton.label.html( "" );
							_filterButton.label.append( _filter );

							_selectedValuesElement = $( "<div class='selectedValues'></div>" );

							_this.button.element.addClass("clearfix");
							_this.button.element.prepend( _selectedValuesElement );
							_this.button.label.html( "" );
							_this.button.label.append( _filterButton.element );
							_this.button.getElement().off( "click" );
							_this.button.getElement().on( "click", onClick );

							_this.getElement().find( ".ValueObject" ).each(function()
								{
									$(this).off( "click" );
									$(this).on( "click", onSelect );
								});

							_this.getElement().addClass( "TagMultiSelector" );
						};

						this.select = function( name, value )
						{
							_super.select( name, value );

							adjustUI();
						};

						this.filter = function( string )
						{
							var modelElement = _this.getElement().find(".Model");
							var totalHits = 0;

							if(string) string = string.toLowerCase();
							
							modelElement.find( ".VOProxy" ).each( function()
								{
									var voProxy = $(this);
									voProxy.removeClass( "hidden" );
									var filterFoundInProxy = false;
									voProxy.find( ".ValueObject" ).each( function()
										{
											var vo = $(this);
											vo.removeClass( "hidden" );
											vo.find( ".Name" ).html( vo.attr("dataName") );
											var name = vo.attr("dataName").toLowerCase();
											var value = vo.attr("dataValue");
											if( name.indexOf( string ) > -1 || value.indexOf( string )  > -1 )
											{
												filterFoundInProxy = true;
												totalHits++;

												var index = name.indexOf( string );
												if ( index >= 0 )
												{
													var innerHTML = vo.attr("dataName");
													var innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+string.length) + "</span>" + innerHTML.substring(index + string.length);
													vo.find( ".Name" ).html( innerHTML );
												}
											}
											else if( string && string.length > 0 )
											{
												vo.addClass( "hidden" );
											}
										} );
									if( !filterFoundInProxy && string && string.length > 0 ) voProxy.addClass( "hidden" );
								} );

							if( totalHits > 0 ) _this.expand();
						};

						_this.expand = function()
						{
							_this.getElement().find(".Model").css( "top", (_this.getElement().height() - 1) + "px" );

							_super.expand();
						};

						/* SET AND GET */
						_this.setLabel = function( label ){};

						/* EVENT HANDLERS */
						var onClick = function( e )
						{
							_filter.focus();
						};

						var onSelect = function( e )
						{
							e.preventDefault();

							_this.select( $( e.currentTarget ).attr( "dataName" ) , $( e.currentTarget ).attr( "dataValue" )  );

							_filter.focus();

							_this.dispatchEvent( new _ns.core.controller.event.Event( _ns.components.controller.event.EventTypes.CHANGE, _this.getValue() ) );
						};

						var onFilter = function( e )
						{
							_this.filter( _filter.val() );
						};

						construct( element );
					};

				// end tutons.components.form.input
				};
			// end tutons.components.form
			};
		// end tutons.components
		};

		init();
	// end tutons
	};
});