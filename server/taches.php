<?php
 header('Access-Control-Allow-Origin: *');  
include './db_connexion.php';
include './db_getList.php';

//$search['parcelle_id'] = $_GET['partcelle'];
$search['user_id'] = $_GET['user'];
$zones= getList('taches',$search);
print_r(json_encode($zones));

?>
 