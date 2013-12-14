<?php
namespace tutons;

class PostTypeVO extends ValueObject implements IPostTypeVO
{
	/* VARS */
	private $_fieldsMap = array();
	private $_metaMap = array();


	function __construct( $name )
	{
		$this->setName( $name );
	}

	/* METHODS */
	public function hasField( $fieldName )
	{
		return isset( $this->_fieldsMap[ $fieldName ] );
	}

	public function hasMetaBox( $metaName )
	{
		return array_key_exists( $metaName, $this->_metaMap );
	}

	/* SET AND GET */
	public function addField( PostTypeFieldVO $fieldVO )
	{
		$this->_fieldsMap[ $fieldVO->getName() ] = $fieldVO;
	}
	public function getField( $fieldName )
	{
		return $this->_fieldsMap[ $fieldName ];
	}

	public function addMetaBox( MetaBox $metaBox )
	{
		$this->_metaMap[ $metaVO->getName() ] = $metaVO;
	}
	public function getMeta( $metaName, $postID )
	{
		return NULL;
	}

	public function getArguments()
	{
		$labels = array(
		   'name'               => 'Custom Post Types',
		   'singular_name'      => 'Custom Post Type',
		   'add_new'            => 'Add New',
		   'add_new_item'       => 'Add New',
		   'edit_item'          => 'Edit',
		   'new_item'           => 'New',
		   'all_items'          => 'All',
		   'view_item'          => 'View',
		   'search_items'       => 'Search',
		   'not_found'          => 'No found',
		   'not_found_in_trash' => 'No found in Trash',
		   'parent_item_colon'  => '',
		   'menu_name'          => 'Custom Post Type'
		 );

		 return array(
		   'labels'             => $labels,
		   'public'             => true,
		   'publicly_queryable' => true,
		   'show_ui'            => true,
		   'show_in_menu'       => true,
		   'query_var'          => true,
		   'rewrite'            => array( 'slug' => $this->getName() ),
		   'capability_type'    => 'post',
		   'has_archive'        => true,
		   'hierarchical'       => false,
		   'menu_position'      => null,
		   'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
		 );
	}
}

interface IPostTypeVO
{
	/* METHODS */
	public function hasMetaBox( $metaName );
	
	/* SET AND GET */
	public function addField( PostTypeFieldVO $fieldVO );
	public function getField( $fieldName );
	public function addMetaBox( MetaBox $metaBox );
	public function getMeta( $metaName, $postID );
	public function getArguments();
}