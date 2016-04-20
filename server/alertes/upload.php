<?php

$name = $_FILES["file"]["name"];
$ext = end((explode(".", $name)));

$dat = date('m-d-Y-His');
$new_image_name = (!empty($name)) ? $name : $dat . $ext;
move_uploaded_file($_FILES["file"]["tmp_name"], "fichiers/" . $new_image_name);

?>