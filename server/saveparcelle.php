<?php

header('Access-Control-Allow-Origin: *');
include './db_connexion.php';
include './db_getList.php';

$donnees = array(
 'ID_CULTURE' => $_GET['ID_CULTURE'],
 'ID_GEA' => $_GET['ID_GEA'],
 'ID_CA' => $_GET['ID_CA'],
 'ID_UAE' => $_GET['ID_UAE'],
 'SUPERFICIE_PCLE' => $_GET['SUPERFICIE_PCLE'],
 'COULEUR' => $_GET['COULEUR'],
 'LIBELLE' => $_GET['LIBELLE'],
 'POLYGONE' => $_GET['polygone']
);

$res = ajouterParcelle($donnees);

?>
 