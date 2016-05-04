<?php
 header('Access-Control-Allow-Origin: *');  
include './db_connexion.php';
include './db_getList.php';

$search['parcelle_id'] = $_GET['parcelle'];
$search['user_id'] = $_GET['user'];
$search['map'] = $_GET['map'];
$zones= listeAlerte($search);
print_r(json_encode($zones));

?>
 