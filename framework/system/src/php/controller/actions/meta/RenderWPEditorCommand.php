<?php
namespace tutons;

class RenderWPEditorCommand extends ActionCommand
{
	function __construct()
	{
		parent::__construct( ActionCommand::RENDER_WP_EDITOR );
	}

	function execute()
	{
		wp_editor( '', 'tutons-editor' );
	}
}