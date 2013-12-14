define(
[
	"tutons"
],
function
(
	tutons
)
{
	function GetMetaBoxAjaxProxy()
	{
		this.onRegister = function()
		{
			console.log("GetMetaBoxAjaxProxy::helo");
		};
	}

	GetMetaBoxAjaxProxy.prototype.consctructor = GetMetaBoxAjaxProxy;
	GetMetaBoxAjaxProxy.prototype = new tutons.core.model.proxy.Proxy( "GetMetaBoxAjaxProxy" );

	return GetMetaBoxAjaxProxy;
});