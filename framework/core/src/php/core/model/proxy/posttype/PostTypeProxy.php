<?php
namespace tutons;

class PostTypeProxy extends Proxy
{
	const NAME = __CLASS__;

	public function add( PostTypeVO $item, $key = NULL )
	{
		if( $this->getFacade()->model->hasProxy( MetaProxy::NAME ) )
		{
			foreach( $this->getFacade()->model->getProxy( MetaProxy::NAME )->getMap() as $metaVO )
			{
				if($metaVO->hasPostType( $item->getName() )) $item->addMeta( $metaVO );
			}
		}

		if( is_null( $key ) ) $this->_map[] = $item;
		else $this->_map[ $key ] = $item;
	}
}