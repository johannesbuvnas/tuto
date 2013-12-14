<?php
namespace tutons;

class SystemMediator extends Mediator
{
	public function getTemplate()
	{
		return Facade::getInstance( Facade::KEY_SYSTEM_FACADE )->getTemplateFileReference( $this->_template );
	}
}