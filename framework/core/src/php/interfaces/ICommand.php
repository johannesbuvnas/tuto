<?php
namespace tutons;

interface ICommand
{
	public function setName( $name );
	public function getName();
	public function register();
	public function execute();
	public function setExecutionLimits( int $limitsCount );
	public function getExecutionLimits();
	public function getExecutionCount();
	public function hasReachedExecutionLimit();
	public function preExecution();
}