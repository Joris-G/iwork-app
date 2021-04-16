<?php
require 'Connexion.php';
$con = new Connexion();

switch ($_GET['typeOperation']) {
    case 'ope':
        $sql = "INSERT INTO t_prod_operation (ID_PROD_PROCESS, ID_OPERATION, DATE_DEBUT) VALUES (:idProdProcess, :idOperation, NOW())";
        $query = $con->createQuery($sql, [
            'idProdProcess' => $_GET['idProdProcess'],
            'idOperation' => $_GET['idOperation']
        ]);
        $sql = "SELECT * FROM t_prod_operation WHERE ID_PROD_PROCESS = :idProdProcess AND ID_OPERATION=:idOperation";
        $query = $con->createQuery($sql, [
            'idProdProcess' => $_GET['idProdProcess'],
            'idOperation' => $_GET['idOperation']
        ]);

        break;
    case 'subOpe':
        $sql = "INSERT INTO t_prod_suboperations (ID_PROD_OPERATION, ID_PROCESS_SUBOPE, DATE_DEBUT) VALUES (:idProdOperation, :idSubOpe, NOW())";
        $query = $con->createQuery($sql, [
            'idProdOperation' => $_GET['idProdOperation'],
            'idSubOpe' => $_GET['idSubOpe']
        ]);
        $sql = "SELECT * FROM t_prod_suboperations  WHERE ID_PROD_OPERATION = :idProdOperation AND ID_PROCESS_SUBOPE = :idSubOpe";
        $query = $con->createQuery($sql, [
            'idProdOperation' => $_GET['idProdOperation'],
            'idSubOpe' => $_GET['idSubOpe']
        ]);
        break;

    case 'step':
        $sql = "INSERT INTO t_prod_suboperation_steps (ID_PROD_SUBOP, ID_STEP, DATE_DEBUT) VALUES (:idProdSubOperation, :idStep, NOW())";
        $query = $con->createQuery($sql, [
            'idProdSubOperation' => $_GET['idProdSubOperation'],
            'idStep' => $_GET['idStep']
        ]);
        $sql = "SELECT * FROM t_prod_suboperation_steps WHERE ID_PROD_SUBOP = :idProdSubOperation AND ID_STEP = :idStep";
        $query = $con->createQuery($sql, [
            'idProdSubOperation' => $_GET['idProdSubOperation'],
            'idStep' => $_GET['idStep']
        ]);
        break;
    default:
        # code...
        break;
}
$response = $query->fetch();
echo json_encode($response);
