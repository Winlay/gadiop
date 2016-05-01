<?php
 header('Access-Control-Allow-Origin: *');  
include './db_connexion.php';
include './db_getList.php';

$donnees = array(
'ID_PCLE_CLT' => $_GET['ID_PCLE_CLT'],
 'ID_CULTURE' => $_GET['ID_CULTURE'],
 'TYPE_FONCIER' => $_GET['ID_TYPE_FONCIER'],
 'TYPE_IRRIGATION' => $_GET['ID_TYPE_IRRIGATION'],
 'TYPE_AMENAGEMENT' => $_GET['ID_TYPE_AMENAGEMENT'],
 'ID_GEA' => $_GET['ID_GEA'],
 'ID_CA' => $_GET['ID_CA'],
 'ID_DETAIL_CA' => $_GET['ID_DETAIL_CA'],
 'ID_UAE' => $_GET['ID_UAE'],
 'SUPERFICIE_PCLE' => $_GET['SUPERFICIE_PCLE'],
 'COULEUR' => $_GET['COULEUR'],
 'LIBELLE' => $_GET['LIBELLE'],
 'POLYGONE' => $_GET['polygone']
);

 $res=updateParcelle($donnees);
 
?>
 