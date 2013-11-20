<?php
namespace tutons;

class ValueObject implements IValueObject
{
	/* VARS */
	private $_name;


	function __construct( $name )
	{
		$this->setName( $name );
	}

	/* SET AND GET */
	public function setValue()
	{

	}
	public function getValue()
	{
		
	}
	function setName( $name )
	{
		$this->_name = $name;
	}
	function getName()
	{
		return $this->_name;
	}
}

interface IValueObject
{
	function setName( $name );
	function getName();
}