<?php
namespace tutons;

class Command extends CoreClass implements ICommand
{
	const NAME = "";

	/* VARS */
	protected $_name;
	protected $_executionLimits = -1;
	protected $_executions = 0;


	function __construct( $name = NULL )
	{
		$this->setName( $name );
	}


	/* PUBLIC METHODS */
	/**
	* Override.
	*/
	public function register()
	{

	}

	/**
	* Override.
	*/
	public function execute()
	{
	}

	public function setName( $name )
	{
		$this->_name = is_null( $name ) ? $this::NAME : $name;
	}
	public function getName()
	{
		return $this->_name;
	}

	public function setExecutionLimits( int $limitsCount )
	{
		$this->_executionLimits = $limitsCount;
	}

	public function getExecutionLimits()
	{
		return $this->_executionLimits;
	}

	public function getExecutionCount()
	{
		return $this->_executions;
	}

	public function hasReachedExecutionLimit()
	{
		return $this->_executionLimits > -1 && $this->_executions >= $this->_executionLimits;
	}

	/**
	*	Do not override.
	*/
	public function preExecution()
	{
		if( $this->hasReachedExecutionLimit() ) return;

		$this->_executions++;

		return call_user_func_array( array( $this, "execute" ), func_get_args() );
	}
}