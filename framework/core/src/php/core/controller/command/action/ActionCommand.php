<?php
namespace tutons;

class ActionCommand extends Command
{
	/* COMMAND NAMES BY TUTO */
	const TUTO_FRAMEWORK_INITIALIZED = "tuto_init";
	const FACADE_READY = "tuto_facade_ready";
	
	/* PUBLIC VARS */
	public $priority = 10;
	public $acceptedArguments = 1;


	public function register()
	{
		add_action( $this->getName(), array( $this, "preExecution" ), $this->priority, $this->acceptedArguments );
	}
}