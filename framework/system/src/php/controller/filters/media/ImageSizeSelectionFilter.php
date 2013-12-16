<?php
namespace tutons;

class ImageSizeSelectionFilter extends FilterCommand
{
	function __construct()
	{
		parent::__construct( 'image_size_names_choose' );
	}

	function execute( $defaultImageSizes )
	{
		foreach($this->getFacade()->model->getProxy( ImageSizeProxy::NAME )->getMap() as $imageSize)
		{
			$defaultImageSizes[ $imageSize->getName() ] = $imageSize->getTitle();
		}

		return $defaultImageSizes;
	}
}