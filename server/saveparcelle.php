<?php
 header('Access-Control-Allow-Origin: *');  
include './db_connexion.php';
include './db_getList.php';

$donnees=array(
    'libelle'=>$_GET['libelle'],
    'categorie_id'=>$_GET['categorie'],
    'description'=>$_GET['description'],
    'polygone'=>$_GET['polygone'],
    'user_id'=>$_GET['user'],
);

 $res=ajouter('parcelles', $donnees);
 $res2=ajouter('affectation_parcelle', array("user_id"=>$_GET['user'],"parcelle_id"=>$res,"created"=>  date("Y-m-d h:i")));

// print_r($res);
 
?>
 