define([
	"tutons"
],
function( tutons )
{
	function ImageItem( imageURL )
	{
		/* VARS */
		var _this = this;
		var _imageURL = imageURL;

		/* DISPLAY OBJECTS */
		var _element;
		this.input;
		var _removeButton;

		var construct = function()
		{
			draw();
		};

		var draw = function()
		{
			_element = $( "<div class='ImageItem'></div>" );

			_this.input = new tutons.components.form.input.Input();
			_element.append( _this.input.getElement() );

			_element.append( "<img src='" + _imageURL + "' />" );

			_removeButton = new tutons.components.buttons.Button();
			_removeButton.getElement().addClass( "RemoveButton" );
			_removeButton.getElement().addClass( "HiddenElement" );
			_removeButton.getElement().on( "click", onRemove );
			_element.append( _removeButton.getElement() );

			_element.on( "mouseover", onMouseOver );
			_element.on( "mouseout", onMouseOut );
		};

		/* SET AND GET */
		this.getElement = function()
		{
			return _element;
		};

		/* EVENT HANDLERS */
		var onMouseOver = function()
		{
			_removeButton.getElement().removeClass( "HiddenElement" );
		};

		var onMouseOut = function()
		{
			_removeButton.getElement().addClass( "HiddenElement" );
		};

		var onRemove = function()
		{
			_element.remove();

			_this.dispatchEvent( new tutons.core.controller.event.Event( "remove" ) );
		};

		construct();
	}

	return function( imageURL )
	{
		ImageItem.prototype = new tutons.core.controller.event.EventDispatcher();
		ImageItem.prototype.constructor = ImageItem;

		return new ImageItem( imageURL );
	}
});