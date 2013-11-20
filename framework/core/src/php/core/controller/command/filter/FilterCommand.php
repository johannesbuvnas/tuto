<?php
namespace tutons;

class FilterCommand extends Command
{
	/* PUBLIC VARS */
	public $priority = 10;
	public $acceptedArguments = 1;


	public function register()
	{
		add_filter( $this->getName(), array( $this, "preExecution" ), $this->priority, $this->acceptedArguments );
	}
}