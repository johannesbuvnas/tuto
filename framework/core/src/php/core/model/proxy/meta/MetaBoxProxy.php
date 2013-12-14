<?php
namespace tutons;

class MetaBoxProxy extends Proxy
{
	const NAME = __CLASS__;

	public function onRegister()
	{
		$this->getFacade()->controller->registerCommand( new RenderMetaBoxAjaxCommand() );
		$this->getFacade()->controller->registerCommand( new RenderWPEditorAjaxCommand() );
		$this->getFacade()->controller->registerCommand( new GetMetaValueFilterCommand() );
	}

	public function add( MetaBox $item, $key = NULL )
	{
		if( $this->getFacade()->model->hasProxy( PostTypeProxy::NAME ) )
		{
			foreach( $this->getFacade()->model->getProxy( PostTypeProxy::NAME )->getMap() as $postTypeVO )
			{
				if($item->hasPostType( $postTypeVO->getName() )) $postTypeVO->addMeta( $item );
			}
		}

		if( is_null( $key ) ) $this->_map[] = $item;
		else $this->_map[ $key ] = $item;
	}
}