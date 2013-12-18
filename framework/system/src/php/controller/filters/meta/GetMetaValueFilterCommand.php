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
			case MetaType::TEXTAREA_WYSIWYG:

				return $this->constructRichTextAreaMap( $metaValue );

			break;
		}

		return $metaValue;
	}

	private function constructRichTextAreaMap( $metaValue )
	{
		if(!is_array($metaValue) || count($metaValue) == 0) return $metaValue;

		$newMap = array();
		foreach( $metaValue as $key => $value )
		{
			$newMap[$key] = apply_filters( "the_content", $value );
		}

		return $newMap;
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