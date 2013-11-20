<?php
namespace tutons;

class AdminInitCommand extends ActionCommand
{
	const NAME = "admin_init";

	function execute()
	{
		// var_dump( $this->getFacade()->model->getProxy( PostTypeProxy::NAME )->get( "custom_post_type" )->getMeta( "custom_meta" )->getField( "custom_field" )->setValue( "phuck u", 8 ) );

		if( isset( $_GET['post'] ) )
		{
			// $post = get_post( $_GET['post'] );
			//$exif = exif_read_data( wp_get_attachment_url( $_GET['post'] ), 0, true );
			// var_dump($exif['EXIF']['DateTimeOriginal']);
			//var_dump($exif);
			$file = get_attached_file( $_GET['post'] );
			$info = filectime( $file );
			var_dump($info);
			var_dump( date( "Y-m-d H:i", $info ) );
		}
	}
}