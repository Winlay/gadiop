<?php
 header('Access-Control-Allow-Origin: *');  
include './db_connexion.php';
include './db_getList.php';

$search['categorie']=$_GET['categorie'];
$search['text'] = $_GET['search'];
$search['parcelle_id'] = $_GET['parcelle'];
$search['user_id'] = $_GET['user'];
$zones= searchZone($search);
print_r(json_encode($zones));

?>
 