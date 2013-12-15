<?php
namespace tutons;

class AdminFooterCommand extends ActionCommand
{
	function __construct()
	{
		parent::__construct( "admin_footer" );
	}

	function execute()
	{
		do_action( Actions::RENDER_WP_EDITOR );
	}
}