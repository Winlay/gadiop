<?php

$name = $_FILES["file"]["name"];
$ext = end((explode(".", $name)));

$dat = date('m-d-Y-His');
$new_image_name = (isset($_POST['fichier'])) ? $_POST['fichier'] : $dat . $ext;
move_uploaded_file($_FILES["file"]["tmp_name"], "fichiers/" . $new_image_name);
?>