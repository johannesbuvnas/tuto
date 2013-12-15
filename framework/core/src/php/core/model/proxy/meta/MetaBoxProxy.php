<?php
namespace tutons;

class MetaBoxProxy extends Proxy
{
	const NAME = __CLASS__;
	const WP_HOOK_REGISTER = "add_meta_boxes";
	const WP_HOOK_SAVE = "save_post";

	public function onRegister()
	{
		/* ACTIONS */
		$this->getFacade()->controller->registerCommand( new RenderMetaBoxProxyCommand() );

		/* AJAX */
		$this->getFacade()->controller->registerCommand( new RenderMetaBoxAjaxCommand() );
		$this->getFacade()->controller->registerCommand( new RenderWPEditorAjaxCommand() );
		
		/* FILTERS */
		$this->getFacade()->controller->registerCommand( new GetMetaValueFilterCommand() );

		add_action( self::WP_HOOK_SAVE, array( $this, "onSavePost") );
	}

	public function add( MetaBox $item, $key = NULL )
	{
		add_action( self::WP_HOOK_REGISTER, array( $this, "registerMetaBox" ) );

		if( $this->getFacade()->model->hasProxy( PostTypeProxy::NAME ) )
		{
			foreach( $this->getFacade()->model->getProxy( PostTypeProxy::NAME )->getMap() as $postTypeVO )
			{
				if($item->hasPostType( $postTypeVO->getName() )) $postTypeVO->addMetaBox( $item );
			}
		}

		parent::add( $item, $item->getName() );
	}

	/* ACTIONS */
	public function registerMetaBox( $postType )
	{
		foreach($this->getMap() as $metaBox)
		{
			if($metaBox->hasPostType( $postType ))
			{
				add_meta_box( 
					$metaBox->getName(),
					$metaBox->getTitle(),
					array( $this, "onRenderMetaBox" ),
					$postType,
					$metaBox->getContext(),
					$metaBox->getPriority(),
					array
					(
						"name" => $metaBox->getName()
					)
				);
			}
		}
	}

	public function renderMetaBox( $name, $postID )
	{
		do_action( Actions::RENDER_META_BOX, $name, $postID );
	}

	private function postSave( $metaBox, $postID )
	{
		$metaBox->delete( $postID );
		update_post_meta( $postID, $metaBox->getName(), $_POST[ $metaBox->getName() ] ) || add_post_meta( $postID, $metaBox->getName(), $_POST[ $metaBox->getName() ], true );
		
		$map = $metaBox->getMetaBoxMap( $postID );

		foreach( $map as $metaBoxMap )
		{
			foreach( $metaBoxMap as $metaVO )
			{
				if( array_key_exists( $metaVO->getName(), $_POST ) ) $metaVO->setValue( $_POST[ $metaVO->getName() ] );
			}
		}

		return TRUE;
	}

	/* EVENT HANDLERS */
	public function onRenderMetaBox( $post, $args )
	{
		if( !$this->getFacade()->controller->hasCommand( Actions::RENDER_WP_EDITOR ) ) $this->getFacade()->controller->registerCommand( new RenderWPEditorCommand() );
		$this->renderMetaBox( $args['args']['name'], $post->ID );
	}

	public function onSavePost( $postID )
	{
		$postType = get_post_type( $postID );

		foreach($this->getMap() as $metaBox)
		{
			if($metaBox->hasPostType( $postType ))
			{
				if( WordPressUtil::verifyNonce( $metaBox->getName() . "_nonce", $metaBox->getName() ) )
				{
					$this->postSave( $metaBox, $postID );
				}
			}
		}
	}
}

interface IMetaBoxProxy
{
	const HOOK_REGISTER = "add_meta_boxes";
	const HOOK_RENDER = "";

	function registerMetaBox();
	function renderMetaBox();
}