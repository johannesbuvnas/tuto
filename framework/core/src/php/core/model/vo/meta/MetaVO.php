<?php
namespace tutons;

class MetaVO extends ValueObject implements IMetaVO
{
	/* CONSTANTS */
	const CONTEXT_NORMAL = "normal";
	const CONTEXT_ADVANCED = "advanced";
	const CONTEXT_SIDE = "side";

	const PRIORITY_HIGH = "high";
	const PRIORITY_CORE = "core";
	const PRIORITY_DEFAULT = "default";
	const PRIORITY_LOW = "low";

	/* VARS */
	private $_title;
	private $_mediator;
	private $_supportedPostTypes;
	private $_context;
	private $_priority;
	private $_fieldsMap = array();


	function __construct( $name, $title, $supportedPostTypes, Mediator $mediator = NULL, $context = MetaVO::CONTEXT_NORMAL, $priority = MetaVO::PRIORITY_DEFAULT )
	{
		$this->setName( $name );
		$this->setTitle( $title );
		$this->setSupportedPostTypes( $supportedPostTypes );
		$this->setMediator( is_null( $mediator ) ? new MetaBoxMediator() : $mediator );
		$this->setContext( $context );
		$this->setPriority( $priority );
	}

	/* METHODS */
	public function addField( MetaFieldVO $metaField )
	{
		$metaField->setMetaBoxName( $this->getName() );
		$this->_fieldsMap[ $metaField->getName() ] = $metaField;
	}

	public function hasField( $name )
	{
		return isset( $this->_fieldsMap[ $name ] );
	}

	public function hasPostType( $postTypeName )
	{
		return in_array( $postTypeName, $this->_supportedPostTypes );
	}

	/* SET AND GET */
	public function setFieldValue( $fieldName, $value, $postID )
	{
		if( $this->hasField( $fieldName ) ) return $this->getField( $fieldName )->setValue( $value, $postID );
		return FALSE;
	}

	public function getFieldValue( $fieldName, $postID )
	{
		if( $this->hasField( $fieldName ) ) return $this->getField( $fieldName )->getValue( $postID );
		else return NULL;
	}

	public function getField( $name )
	{
		return $this->_fieldsMap[ $name ];
	}

	public function getFields()
	{
		return $this->_fieldsMap;
	}

	public function setName( $name )
	{
		parent::setName( $name );

		if(count( $this->getFields() ))
		{
			foreach($this->getFields() as $metaBoxFieldVO)
			{
				$metaBoxFieldVO->setMetaBoxName( $this->getName() );
			}
		}
	}

	public function setTitle( $title )
	{
		$this->_title = $title;
	}
	public function getTitle()
	{
		return $this->_title;
	}

	public function setMediator( Mediator $mediator = NULL )
	{
		$this->_mediator = $mediator;
	}
	public function getMediator()
	{
		return $this->_mediator;
	}

	public function setSupportedPostTypes( $supportedPostTypes )
	{
		$this->_supportedPostTypes = $supportedPostTypes;
	}
	public function getSupportedPostTypes()
	{
		return $this->_supportedPostTypes;
	}

	public function setContext( $context )
	{
		$this->_context = $context;
	}
	public function getContext()
	{
		return $this->_context;
	}

	public function setPriority( $priority )
	{
		$this->_priority = $priority;
	}
	public function getPriority()
	{
		return $this->_priority;
	}
}

interface IMetaVO
{
	/* METHODS */
	public function hasPostType( $postTypeName );
	public function addField( MetaFieldVO $field );
	public function hasField( $name );

	/* SET AND GET */
	public function setFieldValue( $fieldName, $value, $postID );
	public function getFieldValue( $fieldName, $postID );
	public function getField( $name );
	public function getFields();
	public function setTitle( $title );
	public function getTitle();
	public function setMediator( Mediator $mediator = NULL );
	public function getMediator();
	public function setSupportedPostTypes( $postTypes );
	public function getSupportedPostTypes();
	public function setContext( $context );
	public function getContext();
	public function setPriority( $priority );
	public function getPriority();
}