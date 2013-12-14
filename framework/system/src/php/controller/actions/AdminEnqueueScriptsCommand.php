<?php
namespace tutons;

class AdminEnqueueScriptsCommand extends ActionCommand
{
	function __construct()
	{
		parent::__construct( "admin_enqueue_scripts" );
	}

	function execute()
	{
		wp_enqueue_media();

		wp_enqueue_style( 'tuto-components', $this->getFacade()->getURL( "/assets/css/tuto.components.css" ), NULL, SystemFacade::VERSION );
		wp_enqueue_style( 'tuto-admin', $this->getFacade()->getURL( "/assets/css/tuto.admin.css" ), NULL, SystemFacade::VERSION );
	}
}