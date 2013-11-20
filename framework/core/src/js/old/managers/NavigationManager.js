define(["backbone"],
function(Backbone)
{
	/* CLASSES */
	function NavigationManager(TutoFramework)
	{
		/* PRIVATE VARS */
		var _router;

		var _Framework = TutoFramework;

		var _this = this;

		/* CLASS REFERENCES */
		var Router = Backbone.Router.extend({
			routes:{
				'*actions':'default'
			},
			initialize: function()
			{
			}
		});

		/* CONSTRUCTOR */
		var initialize = function()
		{
			_router = new Router();
			_router.on("route:default", onNavigate);

			Backbone.history.start();
		}

		/* PUBLIC REFERENCES */
		this.currentPath = "";

		this.navigate = function(path, trigger, replace)
		{
			if(trigger == null) trigger = true;

			if(replace == null) replace = false;

			_router.navigate(path, {trigger: trigger, replace: replace});

			if(!trigger) this.currentPath = path;
		}

		this.refresh = function()
		{
			var event = _Framework.eventDispatcher.factory( _Framework.eventTypes.EVENT_NAVIGATION_CHANGE, this.currentPath);

			_Framework.eventDispatcher.dispatch( event );
		}

		/* EVENT HANDLERS */
		var onNavigate = function(e)
		{
			_this.currentPath = e;

			var event = TutoFramework.eventDispatcher.factory( TutoFramework.eventTypes.EVENT_NAVIGATION_CHANGE, e );

			TutoFramework.eventDispatcher.dispatch( event );
		}

		initialize();
	}

	return NavigationManager;
});