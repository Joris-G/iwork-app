<?php
require 'Connexion.php';
$con = new Connexion();
$sql = "INSERT INTO t_prod_traca (ID_PROD_STEP, ID_TRACA, DATE_TRACA, `SANCTION`) 
VALUES (:idProdStep, :idTraca, NOW(), :sanction)";
$query = $con->createQuery($sql, [
    'idProdStep' => $_GET['idProdStep'],
    'idTraca' => $_GET['idTraca'],
    'sanction' => $_GET['sanction']
]);
$sql = "SELECT ID_PROD_TRACA FROM t_prod_traca WHERE ID_PROD_STEP = :idProdStep AND ID_TRACA = :idTraca";
$query = $con->createQuery($sql, [
    'idProdStep' => $_GET['idProdStep'],
    'idTraca' => $_GET['idTraca'],
]);
$idProdTraca = $query->fetchColumn();
switch ($_GET['tracaType']) {
    case 'controle':
        if ($_GET['idEcme'] != 'null') {
            $sql = "INSERT INTO t_prod_traca_controle (ID_PROD_TRACA,ID_TRACA_CONTROLE,ID_ECME,SANCTION,COMMENTAIRE,DATE_EXECUTION) 
        VALUES (:idProdTraca, :idProdTracaControle, :idEcme, :sanction,:comment,NOW())";
            $query = $con->createQuery($sql, [
                'idProdTraca' => $idProdTraca,
                'idProdTracaControle' => $_GET['idTracaControle'],
                'idEcme' => $_GET['idEcme'],
                'sanction' => $_GET['sanction'],
                'comment' => $_GET['comment']
            ]);
        } else {
            $sql = "INSERT INTO t_prod_traca_controle (ID_PROD_TRACA,ID_TRACA_CONTROLE,SANCTION,COMMENTAIRE,DATE_EXECUTION) 
        VALUES (:idProdTraca, :idProdTracaControle,:sanction,:comment,NOW())";
            $query = $con->createQuery($sql, [
                'idProdTraca' => $idProdTraca,
                'idProdTracaControle' => $_GET['idTracaControle'],
                'sanction' => $_GET['sanction'],
                'comment' => $_GET['comment']
            ]);
        }
        break;
    case 'matiere':
        $sql = "INSERT INTO t_prod_traca_matiere (ID_PROD_TRACA,ID_TRACA_MATIERE,ID_MATIERE,SANCTION,COMMENTAIRE,DATE_EXECUTION) 
        VALUES (:idProdTraca, :idProdTracaMatiere, :idMat, :sanction,:comment,NOW())";
        $query = $con->createQuery($sql, [
            'idProdTraca' => $idProdTraca,
            'idProdTracaMatiere' => $_GET['idTracaMatiere'],
            'idMat' => $_GET['idMat'],
            'sanction' => $_GET['sanction'],
            'comment' => $_GET['comment'],
        ]);
        break;
    case 'of':
        $ofList = explode(',', $_GET['recordedOf']);
        var_dump($ofList);
        foreach ($ofList as $key => $of) {
            $sql = "INSERT INTO t_prod_traca_of (ID_PROD_TRACA,ID_TRACA_OF,OF,SANCTION,COMMENTAIRE,DATE_EXECUTION) 
        VALUES (:idProdTraca, :idProdTracaOf, :of, :sanction,:comment,NOW())";
            $query = $con->createQuery($sql, [
                'idProdTraca' => $idProdTraca,
                'idProdTracaOf' => $_GET['idTracaOf'],
                'of' => $of,
                'sanction' => $_GET['sanction'],
                'comment' => $_GET['comment'],
            ]);
        }
        break;
    default:
        # code...
        break;
}
