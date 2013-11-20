<?php
namespace tutons;
////////////////////////////////////////////////////////////////////////////////////////////////////////////
class SystemFacade extends Facade
{
	/* CONSTANTS */
	const VERSION = "1";

	public static $PRODUCTION_MODE = false;

	/* PUBLIC VARS */

	function __construct()
	{	
		parent::__construct( Facade::KEY_SYSTEM_FACADE );
	}

	public function onRegister()
	{
		$this->controller->registerCommand( new AdminInitCommand() );
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////