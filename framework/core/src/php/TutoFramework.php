<?php
namespace tutons;
// https://github.com/PureMVC/puremvc-as3-multicore-framework/tree/master/src/org/puremvc/as3/multicore/patterns

// DEPENDENCIES
////////////////////////////////////////////////////////////////////////////////////////////////////////////
require_once realpath( dirname( __FILE__ ) ) . '/utils/ArrayUtil.php';
require_once realpath( dirname( __FILE__ ) ) . '/utils/FileUtil.php';
////////////////////////////////////////////////////////////////////////////////////////////////////////////

final class TutoFramework
{
	/* CONSTANTS */
	const VERSION = "3.0";
	const NONCE_ID = "tuto-framework_nonce";

	/* STATIC VARS */
	private static $developmentMode = true;

	private static $initiated = false;

	private static $_root = "";

	private static $_rootURL = "";

	private static $facadeMap = array();

	private static $_priority = -1;

	/* PUBLIC OBJECTS */
	static $service;


	/* ACTIONS */
	/**
	*	Initializie.
	*/
	public static function initialize()
	{	
		if( self::$developmentMode )
		{
			error_reporting( E_ALL );
			ini_set( "display_errors", 1 );
		}

		if( self::$initiated ) 
		{
			return false;
		}

		$backtrace = debug_backtrace();
		$caller = $backtrace[0]['file'];
		self::$_root = realpath( dirname( $caller ) );

		$wpURL = get_bloginfo( 'wpurl' );
		$wpRoot = substr( $wpURL, strpos( $wpURL, $_SERVER['SERVER_NAME'] ) + strlen( $_SERVER['SERVER_NAME'] ) );
		self::$_rootURL = get_bloginfo( 'wpurl' ) . FileUtil::filterFileReference( substr( self::$_root,  strpos( self::$_root, $wpRoot ) + strlen( $wpRoot ) ) );

		FileUtil::import( self::$_root."/core/src/php" );

		self::$service = new FrameworkService();
		
		self::$initiated = true;

		require_once( self::$_root.'/system/bootstrap.php' );

		do_action( ActionCommand::TUTO_FRAMEWORK_INITIALIZED );

		return true;
	}

	/**
	*	Import application into scope.
	*	@param string $facadeClassReference A reference to the class name which extends the Facade.
	*	@return boolean
	*/
	public static function importApplication( $facadeClassReference )
	{
		if(!self::$initiated)
		{
			die("ERROR! Cannot import application. Tuto Framework hasn't been initialized.");
		}

		if( self::hasImportedApplication( $facadeClassReference ) ) return false;

		$backtrace = debug_backtrace();
		$caller = $backtrace[0]['file'];
		$appRoot = realpath( dirname( $caller ) );

		FileUtil::import( $appRoot . "/src/php" );

		$facade = new $facadeClassReference();
		self::$facadeMap[ $facade->getKey() ] = new ApplicationVO( $facadeClassReference, $facade->getKey(), $appRoot );
		$facade->onRegister();
		do_action( ActionCommand::FACADE_READY, self::$facadeMap[ $facade->getKey() ] );

		return $facade;
	}

	/* SET AND GET */
	public static function getRoot()
	{
		return self::$_root;
	}

	public static function getURL(  $relativePath = NULL )
	{
		return is_null( $relativePath ) ? self::$_rootURL : self::$_rootURL . FileUtil::filterFileReference( "/" . $relativePath );
	}
	
	/**
	*	@return ApplicationVO
	*/
	public static function getApplicationVO( $facadeKey )
	{
		return self::$facadeMap[ $facadeKey ];
	}

	/**
	*	Returns initialize priority ID.
	*	@return int
	*/
	public static function getApplicationPriorityID()
	{
		return self::$_priority++;
	}

	/* PRIVATE METHODS */
	/**
	*	Checks if application has been imported.
	*	@return Boolean
	*/
	private static function hasImportedApplication( $facadeClassReference )
	{
		return class_exists( $facadeClassReference );

		// foreach(self::$facadeMap as $applicationVO)
		// {
		// 	if($applicationVO->getFacadeClassReference() == $facadeClassReference) return TRUE;
		// }

		// return FALSE;
	}
}