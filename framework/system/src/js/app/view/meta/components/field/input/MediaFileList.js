define(
[
	"tutons",
	"jquery",
	"app/view/meta/components/field/input/media/ImageItem"
],
function( tutons, jquery, ImageItem )
{
	function MediaFileList( attributes )
	{
		var _this = this;
		var _attributes = attributes;
		var _name = "";

		/* DISPLAY OBJECTS */
		var _element;
		var _inputProxy;
		var _addButton;
		var _wpMedia;

		var construct = function()
		{
			draw();
			adjustButton();
		};

		var draw = function()
		{
			_element = $( "<div class='MediaFileList cf'></div>" );

			_inputProxy = $( "<div class='HiddenElement'></div>" );
			_element.append( _element );

			_addButton = new tutons.components.buttons.Button();
			_addButton.getElement().addClass( "AddButton" );
			_addButton.getElement().on( "click", onAddClick );
			_element.append( _addButton.getElement() );

			_this.setElement( _element );

			_wpMedia = wp.media({
			    title: _attributes.title ? _attributes.title : "Select Image",
			    multiple: true,
			    library: { type: 'image' },
			    button : { text : 'Add' },
			    frame: 'select'
			});

			_wpMedia.on( 'select', onSelectImages );
		};

		var adjustButton = function()
		{
			if( _attributes.hasOwnProperty( "maxCardinality" ) )
			{
				if(_element.find( ".ImageItem" ).length >= _attributes.maxCardinality) _addButton.getElement().addClass( "HiddenElement" );
				else _addButton.getElement().removeClass( "HiddenElement" );
			}
			else
			{
				_addButton.getElement().removeClass( "HiddenElement" );
			}
		};

		/* METHODS */
		var addImage = function( id, thumbnailURL )
		{
			if( _attributes.hasOwnProperty( "maxCardinality" ) )
			{
				if(_element.find( ".ImageItem" ).length >= _attributes.maxCardinality) return false;
			}

			var image = new ImageItem( thumbnailURL );
			image.input.setValue( id );
			image.input.setName( _name + "[]" );
			image.addEventListener( "remove", adjustButton );

			_addButton.getElement().before( image.getElement() );

			adjustButton();

			return true;
		};

		/* SET AND GET */
		this.setValue = function( value )
		{
			if( !value )
			{
				_element.find( ".ImageItem" ).each(function()
					{
						$(this).remove();
					});
			}
			else
			{
				for(var key in value)
				{
					var image = value[key];

					addImage( image.id, image.imageURL );
				}
			}

			adjustButton();
		};

		this.setName = function( name )
		{
			_name = name;

			_element.find( "input" ).each(function()
				{
					$(this).attr( "name", _name + "[]" );
				});
		};
		this.getName = function()
		{
			return _name;
		};

		/* EVENT HANDLERS */
		var onAddClick = function(e)
		{
			_wpMedia.open();
		};

		var onSelectImages = function()
		{
			var selection = _wpMedia.state().get('selection');

			selection.each(function(attachment)
			{
			    if(!addImage( attachment.id, attachment.attributes.sizes.thumbnail.url )) return;
			});
		};

		construct();
	}

	return function( attributes )
	{
		MediaFileList.prototype = new tutons.components.form.input.Input();
		MediaFileList.prototype.constructor = MediaFileList;

		return new MediaFileList( attributes );
	}
});