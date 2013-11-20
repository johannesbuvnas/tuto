<?php
namespace tutons;

class Controller
{
	/* PROTECTED VARS */
	protected $_facadeKey;

	protected $_commandMap = array();

	/* STATIC VARS */
	protected static $_instanceMap = array();


	public function __construct($key)
	{
		if( array_key_exists($key, $this::$_instanceMap) ) die( "ERROR! A Controller with that particular namespace already exists." );

		$this::$_instanceMap[ $key ] = $this;

		$this->_facadeKey = $key;
	}
	
	/* PUBLIC STATIC METHODS */
	public static function getInstance( $key )
	{
		if( !array_key_exists( $key, self::$_instanceMap ) ) self::$_instanceMap[$key] = new Controller( $key );
		
		return self::$_instanceMap[ $key ];
	}

	/* PUBLIC METHODS */
	public function registerCommand( Command $command )
	{
		$command->initializeFacadeKey( $this->_facadeKey );
		$command->register();
		$command->onRegister();

		return $command;
	}
}