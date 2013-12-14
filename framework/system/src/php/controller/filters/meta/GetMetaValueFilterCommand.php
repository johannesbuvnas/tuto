<?php
namespace tutons;

class GetMetaValueFilterCommand extends FilterCommand
{

	function __construct()
	{
		parent::__construct( FilterCommands::META_VALUE );
		$this->acceptedArguments = 2;	
	}

	function execute( $metaValue, $metaType )
	{
		switch( $metaType )
		{
			case MetaType::IMAGE_LIST:

				return $this->constructImageListMap( $metaValue );

			break;
		}

		return $metaValue;
	}

	private function constructImageListMap( $attachmentIDMap )
	{
		$map = array();

		if(is_array($attachmentIDMap))
		{
			foreach( $attachmentIDMap as $attachmentID )
			{
				$src = wp_get_attachment_image_src( $attachmentID, "thumbnail" );

				$map[] = array(
					"id" => $attachmentID,
					"imageURL" => $src[0]
				);
			}
		}

		return $map;
	}

}