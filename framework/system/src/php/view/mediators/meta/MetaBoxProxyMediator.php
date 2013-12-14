<?php
namespace tutons;

class MetaBoxProxyMediator extends SystemMediator
{
	const NAME = "MetaBoxProxyMediator";

	private $_metaBox;
	private $_metaBoxMediator;

	function __construct( $metaBox )
	{
		$this->setMetaBox( $metaBox );
		$this->setName( self::NAME . "_" . $this->getMetaBox()->getName() );
		$this->setTemplate( "meta/meta-box-proxy.php" );
	}

	function onRegister()
	{
		$this->_metaBoxMediator = $this->getFacade()->view->hasMediator( MetaBoxMediator::NAME ) ? $this->getFacade()->view->getMediator( MetaBoxMediator::NAME ) : $this->getFacade()->view->registerMediator( new MetaBoxMediator() );
	}

	public function render()
	{
		$this->_metaBoxMediator->setMetaBox( $this->getMetaBox() );
		$this->parse( "metaBoxMediator", $this->_metaBoxMediator );

		parent::render();
	}

	/* SET AND GET */
	public function setMetaBox( MetaBox $metaBox )
	{
		$this->_metaBox = $metaBox;

		$this->parse( "metaBox", $this->_metaBox );
	}
	public function getMetaBox()
	{
		return $this->_metaBox;
	}
}