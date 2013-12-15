<?php
namespace tutons;

class ImageSize extends ValueObject
{
	private $_width;
	private $_height;
	private $_crop;

	function __construct($name, $width = 0, $height = 0, $crop = false)
	{
		$this->setName( $name );
		$this->setWidth( $width );
		$this->setHeight( $height );
		$this->setCrop( $crop );
	}

	/* SET AND GET */
	public function setWidth( $width )
	{
		$this->_width = $width;
	}
	public function getWidth()
	{
		return $this->_width;
	}

	public function setHeight( $height )
	{
		$this->_height = $height;
	}
	public function getHeight()
	{
		return $this->_height;
	}

	public function setCrop( $crop )
	{
		$this->_crop = $crop;
	}
	public function getCrop()
	{
		return $this->_crop;
	}
}