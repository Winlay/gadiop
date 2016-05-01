<?php
 header('Access-Control-Allow-Origin: *');  
include './db_connexion.php';
include './db_getList.php';

 deleteParcelle($_GET['ID_PCLE_CLT']);
 
?>
 