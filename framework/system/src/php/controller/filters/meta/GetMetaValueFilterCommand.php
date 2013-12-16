<?php
namespace tutons;

class GetMetaValueFilterCommand extends FilterCommand
{

	function __construct()
	{
		parent::__construct( FilterCommand::META_VALUE );
		$this->acceptedArguments = 2;	
	}

	function execute( $metaValue, $metaType )
	{
		switch( $metaType )
		{
			case MetaType::ATTACHMENT:

				return $this->constructAttachmentMap( $metaValue );

			break;
		}

		return $metaValue;
	}

	private function constructAttachmentMap( $attachmentIDMap )
	{
		$map = array();

		if(is_array($attachmentIDMap))
		{
			foreach( $attachmentIDMap as $attachmentID )
			{
				$thumb = wp_get_attachment_image_src( $attachmentID, "thumbnail", false );
				$icon = wp_get_attachment_image_src( $attachmentID, "thumbnail", true );

				$title = basename ( get_attached_file( $attachmentID ) );

				$item = array
				(
					"id" => $attachmentID,
					"title" => $title,
					"thumbnailURL" => $thumb ? $thumb[0] : NULL,
					"iconURL" => $icon ? $icon[0] : NULL,
					"permalink" => get_attachment_link( $attachmentID ),
					"url" => wp_get_attachment_url( $attachmentID ),
					"fileType" => wp_check_filetype( $title )
				);

				$map[] = $item;
			}
		}

		return $map;
	}

}