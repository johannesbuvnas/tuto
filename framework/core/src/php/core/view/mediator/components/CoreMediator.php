<?php
namespace tutons;

class CoreMediator extends Mediator
{
	public function getTemplate()
	{
		return FileUtil::filterFileReference( TutoFramework::getRoot() . "/core/templates/" . $this->_template );
	}
}