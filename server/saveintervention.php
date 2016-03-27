<?php
 header('Access-Control-Allow-Origin: *');  
include './db_connexion.php';
include './db_getList.php';

$donnees=array(
    'etat'=>$_GET['etat'],
    'intervention'=>$_GET['intervention'],
);

 $res=update("taches", $_GET['tache_id'], $donnees) ;

// print_r($res);
 
?>
 