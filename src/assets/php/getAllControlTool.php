<?php
require 'Connexion.php';
$con = new Connexion();
$sql = "SELECT * FROM t_ecme_type";
$query = $con->createQuery($sql, );
$materialList = $query->fetchAll();

echo(json_encode($materialList));