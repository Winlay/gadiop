<?php

header("Access-Control-Allow-Origin: *");
include './db_connexion.php';
include './db_getList.php';

$params = array("libelle" => $_GET['libelle'], "description" => $_GET['description'], "latitude" => $_GET['latitude'], "longitude" => $_GET['longitude'], "user_id" => $_GET['user'], "parcelle_id" => $_GET['parcelle'], "fichier" => trim($_GET['fichier']));
ajouter("alertes", $params);



?>
