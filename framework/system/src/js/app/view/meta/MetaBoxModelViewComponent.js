define(
[
	"tutons",
	"jquery",
	"app/view/meta/components/MetaBoxProxy"
],
function
(
	tutons,
	jquery,
	MetaBoxProxy
)
{
	function MetaBoxModelViewComponent()
	{
		var construct = function()
		{
			$( "div.MetaBoxModel" ).each(function()
				{
					new MetaBoxProxy( $( this ) );
				});
		}

		construct();
	}

	MetaBoxModelViewComponent.prototype = new tutons.core.controller.event.EventDispatcher();
	MetaBoxModelViewComponent.prototype.constructor = MetaBoxModelViewComponent;
	return MetaBoxModelViewComponent;
})