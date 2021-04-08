<?php
require 'Connexion.php';
$con = new Connexion();
$sql = "INSERT INTO t_prod_suboperations (ID_PROD_PROCESS, ID_PROCESS_SUBOPE, DATE_DEBUT) 
VALUES (:idProdProcess, :idProdSubOpe, NOW())";
$query = $con->createQuery($sql, [
    'idProdProcess' => $_GET['idProdProcess'],
    'idProdSubOpe' => $_GET['idProdSubOpe']
]);
