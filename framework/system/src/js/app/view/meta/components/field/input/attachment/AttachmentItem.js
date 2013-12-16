define([
	"tutons"
],
function( tutons )
{
	function AttachmentItem( id, title, thumbnailURL, iconURL )
	{
		/* VARS */
		var _this = this;
		var _id = id;
		var _title = title;
		var _thumbnailURL = thumbnailURL;
		var _iconURL = iconURL;

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
			_element = $( "<div class='AttachmentItem'></div>" );

			_this.input = new tutons.components.form.input.Input();
			_this.input.setValue( _id );
			_element.append( _this.input.getElement() );

			if(_thumbnailURL) _element.append( "<img src='" + _thumbnailURL + "' />" );
			else if(_iconURL) _element.append( "<img src='" + _iconURL + "' class='Icon' />" );

			if(_title) _element.append( "<div class='AttachmentTitle'>" + _title + "</div>" );

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

	return function( id, title, thumbnailURL, iconURL )
	{
		AttachmentItem.prototype = new tutons.core.controller.event.EventDispatcher();
		AttachmentItem.prototype.constructor = AttachmentItem;

		return new AttachmentItem( id, title, thumbnailURL, iconURL );
	}
});