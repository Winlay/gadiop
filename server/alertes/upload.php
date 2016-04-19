<?php


$name = $_FILES["file"]["name"];
$ext = end((explode(".", $name)));

$new_image_name = date('m-d-Y-His');
move_uploaded_file($_FILES["file"]["tmp_name"], "fichiers/".$new_image_name.".".$ext);


?>