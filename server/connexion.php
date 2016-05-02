<?php
 header('Access-Control-Allow-Origin: *');  
include './db_connexion.php';
include './db_getList.php';

$search=array();
//$search['categorie']=$_GET['categorie'];
//$search['text'] = $_GET['search'];
$search['LOGIN'] = $_GET['login'];
$search['MOTPASSE'] = $_GET['password'];
$users= getList('TB_USER', $search);
print_r(json_encode($users));
?>
  