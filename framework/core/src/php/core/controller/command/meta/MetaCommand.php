<?php
namespace tutons;

class MetaCommand extends Command implements IMetaBoxCommand
{

	/* VARS */
	private $_metaVO;

	function __construct( $metaVO )
	{
		$this->setMetaVO( $metaVO );
	}


	/* ACTIONS */
	final public function register()
	{
		if( !$this->getFacade()->model->hasProxy( MetaProxy::NAME ) ) $this->getFacade()->model->registerProxy( new MetaProxy() );

		$this->getFacade()->model->getProxy( MetaProxy::NAME )->add( $this->getMetaVO(), $this->getMetaVO()->getName() );

		add_action( self::HOOK_REGISTER, array( $this, "registerMetaBox" ) );
		$this->saveOn( self::HOOK_SAVE );
	}

	public function registerMetaBox()
	{
		foreach($this->getMetaVO()->getSupportedPostTypes() as $postType)
		{
			add_meta_box( 
				$this->getMetaVO()->getName(),
				$this->getMetaVO()->getTitle(),
				array( $this, "render" ),
				$postType,
				$this->getMetaVO()->getContext(),
				$this->getMetaVO()->getPriority(),
				null
			);
		}
	}

	public function render()
	{
		wp_nonce_field( $this->getName(), $this->getNonce() );

		if(!$this->getFacade()->view->hasMediator( $this->getMetaVO()->getMediator()->getName() )) $this->getFacade()->view->registerMediator( $this->getMetaVO()->getMediator() );

		$this->getMetaVO()->getMediator()->parse( "metaVO", $this->getMetaVO() );

		$this->getMetaVO()->getMediator()->render();
	}

	public function save( $postID )
	{
		foreach( $this->getMetaVO()->getFields() as $metaBoxFieldVO )
		{
			if(isset( $_POST[ $metaBoxFieldVO->getKey() ] ))
			{
				$metaBoxFieldVO->setValue( $_POST[ $metaBoxFieldVO->getKey() ], $postID );
			}
		}
	}

	public function saveOn( $hookNames )
	{
		if( is_array( $hookNames ) ) foreach($hookNames as $hookName) add_action( $hookName, array( $this, "onSave" ) );
		else if( is_string( $hookNames ) ) add_action( $hookNames, array( $this, "onSave" ) );

		return $this;
	}

	/* METHODS */


	/* SET AND GET */
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
		return $this->getMetaVO()->getName();
	}

	public function getNonce()
	{
		return $this->getName() . "_nonce";
	}

	public function setMetaVO( MetaVO $vo )
	{
		$this->_metaVO = $vo;
	}

	public function getMetaVO()
	{
		return $this->_metaVO;
	}

	/* EVENT LISTENERS */
	final public function onSave( $postID )
	{
		$postType = get_post_type( $postID );

		if( in_array( $postType, $this->getMetaVO()->getSupportedPostTypes() ) )
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

	/* SET AND GET */
	public function getNonce();
	public function setMetaVO( MetaVO $vo );
	public function getMetaVO();
}