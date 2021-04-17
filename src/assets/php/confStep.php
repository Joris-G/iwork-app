<?php
require 'Connexion.php';
$con = new Connexion();

$sql = "UPDATE t_prod_suboperation_steps SET DATE_FIN = NOW() WHERE ID_PROD_STEP = :idProdStep";
$query = $con->createQuery($sql, [
    'idProdStep' => $_GET['idProdStep'],
]);
$sql = "SELECT * FROM t_prod_suboperation_steps WHERE ID_PROD_STEP = :idProdStep";
$query = $con->createQuery($sql, [
    'idProdStep' => $_GET['idProdStep'],
]);
$return = $query->fetch();
echo json_encode($return);
