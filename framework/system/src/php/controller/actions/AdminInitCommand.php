<?php
namespace tutons;

class AdminInitCommand extends ActionCommand
{
	function __construct()
	{
		parent::__construct( "admin_init" );
	}

	function execute()
	{
		wp_register_script( 'require-js', $this->getFacade()->getURL( "libs/js/require.js" ) );
		wp_register_script( 'tuto-main-js', $this->getFacade()->getURL( "src/js/Main.config.js" ), array( 'require-js' ), '', true);
		
		$this->getFacade()->controller->registerCommand( new AdminHeadCommand() );
		$this->getFacade()->controller->registerCommand( new AdminEnqueueScriptsCommand() );
		$this->getFacade()->controller->registerCommand( new AdminFooterCommand() );
		
		// // var_dump( $this->getFacade()->model->getProxy( PostTypeProxy::NAME )->get( "custom_post_type" )->getMeta( "custom_meta" )->getField( "custom_field" )->setValue( "phuck u", 8 ) );

		// if( isset( $_GET['post'] ) )
		// {
		// 	// $post = get_post( $_GET['post'] );
		// 	//$exif = exif_read_data( wp_get_attachment_url( $_GET['post'] ), 0, true );
		// 	// var_dump($exif['EXIF']['DateTimeOriginal']);
		// 	//var_dump($exif);
		// 	$file = get_attached_file( $_GET['post'] );
		// 	$info = filectime( $file );
		// 	var_dump($info);
		// 	var_dump( date( "Y-m-d H:i", $info ) );
		// }
	}
}