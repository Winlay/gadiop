<?php
$db = array();
            $xml = new DOMDocument;
                $xml->load('config.xml');
                
                $elements = $xml->getElementsByTagName('define');
                
                foreach ($elements as $element)
                {
                    $db[$element->getAttribute('var')] = $element->getAttribute('value');
                }
                
         $hostname=$db['host'];
         $username=$db['username'];
         $password=$db['password'];
         $dbname=$db['dbname'];
         


$link = mysql_connect($hostname,$username,$password);
if (!$link) {
   die('Impossible de se connecter : ' . mysql_error());
}
//$db=mysql_select_db($dbname);
$db_selected = mysql_select_db($dbname,$link);
if (!$db_selected) {
   die ('Impossible de selectionner la base de donnees : ' . mysql_error());
}
mysql_query("SET NAMES UTF8");


 ?>
 