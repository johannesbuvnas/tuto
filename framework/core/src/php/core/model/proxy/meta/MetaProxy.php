<?php
namespace tutons;

class MetaProxy extends Proxy
{
	const NAME = __CLASS__;

	public function add( MetaVO $item, $key = NULL )
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