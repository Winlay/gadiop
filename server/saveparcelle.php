<?php
 header('Access-Control-Allow-Origin: *');  
include './db_connexion.php';
include './db_getList.php';

$donnees=array(
    'libelle'=>$_GET['libelle'],
    'categorie_id'=>$_GET['categorie'],
    'description'=>$_GET['description'],
    'polygone'=>$_GET['polygone'],
);

 $res=ajouter('parcelles', $donnees);

// print_r($res);
 
?>
 