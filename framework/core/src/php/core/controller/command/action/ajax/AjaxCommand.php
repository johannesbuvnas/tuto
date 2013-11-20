<?php
namespace tutons;

class AjaxCommand extends ActionCommand
{

	/* VARS */
	private $_nonceName;

	
	function __construct( $name, $nonceName = TutoFramework::NONCE_ID )
	{
		parent::__construct( $name );

		$this->setNonceName( $nonceName );
	}

	/* ACTIONS */
	public function register()
	{
		parent::register( "wp_ajax_" . $this->getName() );
		parent::register( "wp_ajax_nopriv_" . $this->getName() );
	}

	/* METHODS */
	public function preExecution()
	{
		if ( !wp_verify_nonce( $_REQUEST['nonce'], $this->getNonceName() ) )
		{
			exit( "No naughty business please." );
		}

		parent::preExecution();
	}

	/* SET AND GET */
	public function setNonceName( $nonceName )
	{
		$this->_nonceName = $nonceName;
	}
	public function getNonceName()
	{
		return $this->_nonceName;
	}
}