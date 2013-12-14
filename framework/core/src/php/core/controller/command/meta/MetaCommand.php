<?php
namespace tutons;

class MetaCommand extends Command implements IMetaBoxCommand
{

	/* VARS */
	private $_metaBox;

	private $_mediator;

	function __construct( $metaBox, $mediator = NULL )
	{
		$this->setMetaBox( $metaBox );
		$this->setMediator( $mediator ? $mediator : new MetaBoxProxyMediator( $metaBox ) );
	}


	/* ACTIONS */
	final public function register()
	{
		if( !$this->getFacade()->model->hasProxy( MetaBoxProxy::NAME ) ) $this->getFacade()->model->registerProxy( new MetaBoxProxy() );

		if( !$this->getFacade()->view->hasMediator( $this->getMediator()->getName() ) ) $this->getFacade()->view->registerMediator( $this->getMediator() );

		$this->getFacade()->model->getProxy( MetaBoxProxy::NAME )->add( $this->getMetaBox(), $this->getMetaBox()->getName() );

		add_action( self::HOOK_REGISTER, array( $this, "registerMetaBox" ) );
		$this->saveOn( self::HOOK_SAVE );
	}

	public function registerMetaBox()
	{
		foreach($this->getMetaBox()->getSupportedPostTypes() as $postType)
		{
			add_meta_box( 
				$this->getMetaBox()->getName(),
				$this->getMetaBox()->getTitle(),
				array( $this, "render" ),
				$postType,
				$this->getMetaBox()->getContext(),
				$this->getMetaBox()->getPriority(),
				null
			);
		}
	}

	public function render()
	{
		if(!$this->getFacade()->view->hasMediator( $this->getMediator()->getName() )) $this->getFacade()->view->registerMediator( $this->getMediator() );

		$mediator = $this->getFacade()->view->getMediator(  $this->getMediator()->getName() );
		$mediator->parse( "nonce", $this->getNonce() );
		$mediator->parse( "postID", array_key_exists( "post", $_GET ) ? $_GET['post'] : 0 );
		$mediator->render();
	}

	public function save( $postID )
	{
		$this->cleanup( $postID );
		update_post_meta( $postID, $this->getMetaBox()->getName(), $_POST[ $this->getMetaBox()->getName() ] ) || add_post_meta( $postID, $this->getMetaBox()->getName(), $_POST[ $this->getMetaBox()->getName() ], true );
		
		$map = $this->getMetaBox()->getMetaBoxMap( $postID );

		foreach( $map as $metaBoxMap )
		{
			foreach( $metaBoxMap as $metaVO )
			{
				if( array_key_exists( $metaVO->getName(), $_POST ) ) $metaVO->setValue( $_POST[ $metaVO->getName() ] );
			}
		}

		return TRUE;
	}

	public function saveOn( $hookNames )
	{
		if( is_array( $hookNames ) ) foreach($hookNames as $hookName) add_action( $hookName, array( $this, "onSave" ) );
		else if( is_string( $hookNames ) ) add_action( $hookNames, array( $this, "onSave" ) );

		return $this;
	}

	public function cleanup( $postID )
	{
		$map = $this->getMetaBox()->getMetaBoxMap( $postID );
		foreach( $map as $metaBoxMap )
		{
			foreach( $metaBoxMap as $metaVO )
			{
				$metaVO->setValue( NULL );
			}
		}

		return delete_post_meta( $postID, $this->getMetaBox()->getName() );
	}

	/* METHODS */


	/* SET AND GET */
	public function setMediator( Mediator $mediator )
	{
		$this->_mediator = $mediator;
	}
	public function getMediator()
	{
		return $this->_mediator;
	}

	public function setSaveHook( $hookName )
	{
		$this->_hookSave = $hookName;
	}
	public function getSaveHook()
	{
		return $this->_hookSave;
	}

	public function getName()
	{
		return $this->getMetaBox()->getName();
	}

	public function getNonce()
	{
		return $this->getName() . "_nonce";
	}

	public function setMetaBox( MetaBox $metaBox )
	{
		$this->_metaBox = $metaBox;
	}
	public function getMetaBox()
	{
		return $this->_metaBox;
	}

	/* EVENT LISTENERS */
	final public function onSave( $postID )
	{
		$postType = get_post_type( $postID );

		if( in_array( $postType, $this->getMetaBox()->getSupportedPostTypes() ) )
		{
			if( WordPressUtil::verifyNonce( $this->getNonce(), $this->getName() ) )
			{
				$this->save( $postID );
			}
		}
	}
}

interface IMetaBoxCommand
{
	const HOOK_REGISTER = "add_meta_boxes";
	const HOOK_SAVE = "save_post";

	/* ACTIONS */
	public function save( $postID );
	public function registerMetaBox();
	public function render();
	public function saveOn( $hookName );
	public function cleanup( $postID );

	/* METHODS */

	/* SET AND GET */
	public function getNonce();
	public function setMetaBox( MetaBox $metaBox );
	public function getMetaBox();
	public function setMediator( Mediator $mediator );
	public function getMediator();
}