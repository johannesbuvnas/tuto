<?php
namespace tutons;

class MetaBoxMediator extends CoreMediator
{
	const NAME = "MetaBoxMediator";

	function __construct()
	{
		$this->setName( self::NAME );
		$this->setTemplate( "meta/meta-box.php" );
	}
}