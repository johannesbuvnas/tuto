<?php
namespace tutons;

class MetaFieldVO extends ValueObject implements IMetaBoxFieldVO
{
	/* VARS */
	private $_metaBoxName;

	private $_isSingle;

	public function __construct( $name, $isSingle = TRUE )
	{
		$this->setName( $name );
		$this->_isSingle = $isSingle;
	}

	/* ACTIONS */
	public function delete( $postID )
	{
		return delete_post_meta( $postID, $this->getKey() );
	}

	/* SET AND GET */
	public function setValue( $value, $postID )
	{
		if(is_array($value))
		{
			foreach($value as $rawValue)
			{
				$this->setValue( $rawValue, $postID );
			}

			return TRUE;
		}

		if( is_null( $value ) ) return delete_post_meta( $postID, $this->getKey() );

		if( $this->isSingle() ) return update_post_meta( $postID, $this->getKey(), $value ) || add_post_meta( $postID, $this->getKey(), $value, $this->isSingle() );
		else return add_post_meta( $postID, $this->getKey(), $value, $this->isSingle() );

		return TRUE;
	}

	public function getValue( $postID )
	{
		return get_post_meta( $postID, $this->getKey(), $this->isSingle() );
	}

	public function setMetaBoxName( $metaBoxName )
	{
		$this->_metaBoxName = $metaBoxName;
	}
	public function getMetaBoxName()
	{
		return $this->_metaBoxName;
	}
	final public function getKey()
	{
		return $this->getMetaBoxName() . "_" . $this->getName();
	}

	public function isSingle()
	{
		return $this->_isSingle;
	}
}

interface IMetaBoxFieldVO
{
	/* ACTIONS */
	public function delete( $postID );

	/* SET AND GET */
	public function isSingle();
	public function setValue( $value, $postID );
	public function getValue( $postID );
	public function setMetaBoxName( $metaBoxName );
	public function getMetaBoxName();
	public function getKey();
}