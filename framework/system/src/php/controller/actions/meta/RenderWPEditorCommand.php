<?php
namespace tutons;

class RenderWPEditorCommand extends ActionCommand
{
	function __construct()
	{
		parent::__construct( Actions::RENDER_WP_EDITOR );
	}

	function execute()
	{
		wp_editor( '', 'tutons-editor' );
	}
}