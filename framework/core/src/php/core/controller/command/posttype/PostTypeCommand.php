<?php
namespace tutons;

class PostTypeCommand extends Command implements IPostTypeCommand
{
	/* VARS */
	private $_postTypeVO;

	public function __construct( PostTypeVO $postTypeVO )
	{	
		$this->setPostTypeVO( $postTypeVO );
	}

	final public function register()
	{
		if( !$this->getFacade()->model->hasProxy( PostTypeProxy::NAME ) ) $this->getFacade()->model->registerProxy( new PostTypeProxy() );
		$this->getFacade()->model->getProxy( PostTypeProxy::NAME )->add( $this->getPostTypeVO(), $this->getPostTypeVO()->getName() );

		add_action( self::HOOK_REGISTER, array( $this, "registerPostType" ), self::PRIORITY );
	}

	public function registerPostType()
	{
		register_post_type( $this->getPostTypeVO()->getName(), $this->getPostTypeVO()->getArguments() );
	}

	/* SET AND GET */
	public function setPostTypeVO( PostTypeVO $postTypeVO )
	{
		$this->_postTypeVO = $postTypeVO;
	}
	public function getPostTypeVO()
	{
		return $this->_postTypeVO;
	}
}

interface IPostTypeCommand
{
	const HOOK_REGISTER = "init";
	const PRIORITY = 2;

	/* ACTIONS */
	public function registerPostType();

	/* SET AND GET */
	public function setPostTypeVO( PostTypeVO $postTypeVO );
	public function getPostTypeVO();
}