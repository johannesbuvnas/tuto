<?php
namespace tutons;

class FileUtil
{	
	/**
	*	Fixes slashes in a file reference.
	*/
	public static function filterFileReference( $fileReference )
	{		
		$fileReference = str_replace("\\", "/", $fileReference);
		
		$fileReference = str_replace("//", "/", $fileReference);
		
		if(substr( $fileReference, strlen( $fileReference ) - 1, 1 ) == "/") $fileReference = substr( $fileReference, 0, strlen( $fileReference ) - 1 );
		
		return $fileReference;
	}

	/**
	*	Extract only the filename from a URL / file path.
	*	@return string Filename.
	*/
	public static function extractFilename( $fileReference )
	{
		preg_match('/[^\?]+/', $fileReference, $matches);
		
		return basename( $matches[0] );
	}

	/**
	*	Import into scope.
	*/
	public static function import( $library, $ignoredPaths = array(), $usortMethod =  NULL )
	{
		$imports = FileUtil::getImportScope( $library, $ignoredPaths );

		if( $usortMethod )
		{
			usort( $imports, $usortMethod );
		}
		else
		{
			usort( $imports, array( "\\tutons\ArrayUtil", "usortByFolderStructure" ) );
		}

		foreach($imports as $import)
		{
			require_once( $import );
		}
	}

	/**
	*	Collects all PHP-files within a directory and subdirectories.
	*	@return array.
	*/
	public static function getImportScope( $directory, $ignoredPaths = array(), $autofixPaths = true )
	{		
		require_once( 'ArrayUtil.php' );

		if( $autofixPaths )
		{
			$directory = FileUtil::filterFileReference( $directory );
			
			$i = 0;
		
			foreach($ignoredPaths as $path)
			{
				$ignoredPaths[$i] = FileUtil::filterFileReference( $directory."/".$path );
				$i++;
			}
		}
		
		$scripts = ArrayUtil::removeForbiddenElements( glob( $directory."/*.php" ), $ignoredPaths );
		
		$directories = ArrayUtil::removeForbiddenElements( glob( $directory."/*", GLOB_ONLYDIR ), $ignoredPaths );
		
		foreach($directories as $directory)
		{
			$scripts = array_merge( $scripts, self::getImportScope( $directory, $ignoredPaths, false ) );
		}
		
		return $scripts;
	}
}