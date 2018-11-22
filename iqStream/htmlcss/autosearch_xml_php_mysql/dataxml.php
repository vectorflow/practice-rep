<?php
if (version_compare(phpversion(), "5.3.0", ">=")  == 1)
  error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
else
  error_reporting(E_ALL & ~E_NOTICE);
//
  $aValues = $aIndexes = array();
  $sFileData = file_get_contents('course.xml'); // reading file content
  $oXmlParser = xml_parser_create('UTF-8');
  xml_parse_into_struct($oXmlParser, $sFileData, $aValues, $aIndexes);
  xml_parser_free( $oXmlParser );
  $aTagIndexes = $aIndexes['ITEM'];
  if (count($aTagIndexes) <= 0) exit;
  foreach($aTagIndexes as $iTagIndex) {
      $sValue = $aValues[$iTagIndex]['value'];
      if (strpos($sValue, $sParam) !== false) {
          echo $sValue . "\n";
      }
  }
