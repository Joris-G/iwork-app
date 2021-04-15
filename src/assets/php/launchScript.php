<?php
require 'Connexion.php';
$con = new Connexion();

switch ($_GET['typeOperation']) {
    case 'ope':
        $sql = "INSERT INTO t_prod_operation (ID_PROD_PROCESS, ID_OPERATION, DATE_DEBUT) 
VALUES (:idProdProcess, :idOperation, NOW())";
        $query = $con->createQuery($sql, [
            'idProdProcess' => $_GET['idProdProcess'],
            'idOperation' => $_GET['idOperation']
        ]);
        break;
    case 'subOpe':
        $sql = "INSERT INTO t_prod_suboperations (ID_PROD_OPERATION, ID_PROCESS_SUBOPE, DATE_DEBUT) 
VALUES (:idProdoperation, :idProdSubOpe, NOW())";
        $query = $con->createQuery($sql, [
            'idProdoperation' => $_GET['idProdoperation'],
            'idProdSubOpe' => $_GET['idProdSubOpe']
        ]);
        break;
    default:
        # code...
        break;
}
