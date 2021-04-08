<?php
require 'Connexion.php';
header('content-Type: application/json');
$con = new Connexion();

$sql = "SELECT * FROM t_prod_process WHERE ORDRE_FABRICATION = :workorder";
$query = $con->createQuery($sql, ['workorder' => $_GET['OF']]);
$prodProcess = $query->fetch();

$sql = "SELECT * FROM t_article WHERE ARTICLE_SAP = :articleSap";
$query = $con->createQuery($sql, ['articleSap' => $_GET['articleSap']]);
$article = $query->fetch();
$prodProcess['ARTICLE'] = $article;

$sql = "SELECT * FROM t_process WHERE ARTICLE_SAP = :articleSap AND INDICE_PROCESS = :indiceProcess";
$query = $con->createQuery($sql, ['articleSap' => $_GET['articleSap'], 'indiceProcess' => 0]);
$process = $query->fetch();

$sql = "SELECT * FROM t_process_operation WHERE ID_PROCESS = :idProcess";
$query = $con->createQuery($sql, ['idProcess' => $process['ID_PROCESS']]);
$operationList = $query->fetchAll();

$process['LISTE_OPERATIONS'] = $operationList;

foreach ($process['LISTE_OPERATIONS'] as $keyOperation => $operation) {

    $sql = "SELECT * FROM t_process_subope_groups WHERE ID_OPERATION = :idOPeration";
    $query = $con->createQuery($sql, ['idOPeration' => $operation['ID_OPERATION']]);
    $listGroupOpe = $query->fetchAll();

    $process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'] = $listGroupOpe;

    foreach ($process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'] as $keyOperationGroup => $operationGroup) {

        $sql = "SELECT * FROM t_process_suboperations WHERE ID_GROUP = :groupId";
        $query = $con->createQuery($sql, ['groupId' => $operationGroup['ID_GROUP']]);
        $detailedOperationsList = $query->fetchAll();

        $process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'][$keyOperationGroup]['OPERATIONS_DETAILLEES'] = $detailedOperationsList;
        if ($detailedOperationsList) {
            foreach ($detailedOperationsList as $keyDetailedOperation => $detailedOperation) {
                $sql = "SELECT * FROM t_process_suboperation_steps WHERE ID_SUB_OPERATION = :detailedOperationId";
                $query = $con->createQuery($sql, ['detailedOperationId' => $detailedOperation['ID_OPERATION_DETAILLEE']]);
                $steps = $query->fetchAll();

                if ($steps) {
                    foreach ($steps as $keyStep => $step) {

                        $sql = "SELECT * FROM t_process_instructions WHERE ID_STEP = :idProcessStep";
                        $query = $con->createQuery($sql, ['idProcessStep' => $step['ID_STEP']]);
                        $instruction = $query->fetch();
                        $step['INSTRUCTION'] = $instruction;


                        $sql = "SELECT * FROM t_traca WHERE ID_STEP = :detailedOperationId";
                        $query = $con->createQuery($sql, ['detailedOperationId' => $step['ID_STEP']]);
                        $tracasList = $query->fetch();
                        $tracaTypeTable;

                        if ($tracasList) {
                            # code...

                            switch ($tracasList['TYPE_TRACA']) {
                                case '1':
                                    $tracaTypeTable = 't_traca_controle';
                                    $prodTracaTypeTable = 't_prod_traca_controle';
                                    $idTracaParam = 'ID_TRACA_CONTROLE';
                                    break;
                                case '2':
                                    $tracaTypeTable = 't_traca_matiere';
                                    $prodTracaTypeTable = 't_prod_traca_matiere';
                                    $idTracaParam = 'ID_TRACA_MATIERE';
                                    break;
                                case '3':
                                    $tracaTypeTable = 't_traca_of';
                                    $prodTracaTypeTable = 't_prod_traca_of';
                                    $idTracaParam = 'ID_TRACA_OF';
                                    break;
                                case '4':
                                    $tracaTypeTable = 't_traca_mesure';
                                    $prodTracaTypeTable = 't_prod_traca_mesure';
                                    $idTracaParam = 'ID_TRACA_MESURE';
                                    break;
                                default:
                                    # code...
                                    break;
                            }
                            $sql = "SELECT * FROM " . $tracaTypeTable . " WHERE ID_TRACA = :idTraca";
                            $query = $con->createQuery($sql, ['idTraca' => $tracasList['ID_TRACA']]);
                            $traca = $query->fetchAll();

                            $tracasList['TRACA_DETAILS'] = $traca;

                            foreach ($traca as $keyTracaDetail => $tracaDetail) {
                                $sql = "SELECT * FROM t_prod_traca WHERE ID_TRACA = :idTraca";
                                $query = $con->createQuery($sql, ['idTraca' => $tracasList['ID_TRACA']]);
                                $prodTraca = $query->fetch();

                                $sql = "SELECT * FROM " . $prodTracaTypeTable . " WHERE " . $idTracaParam . " = :idTracaType AND ID_PROD_TRACA = :idProdTraca";
                                $query = $con->createQuery($sql, ['idTracaType' => $tracaDetail[$idTracaParam],'idProdTraca'=>$prodTraca['ID_PROD_TRACA']]);
                                $prodTracaDetail = $query->fetch();

                                if ($prodTraca) {
                                    $tracasList['PROD_TRACA_DETAILS'] = $prodTraca;
                                    $tracasList['TRACA_DETAILS'][$keyTracaDetail]['PROD_TRACA'] = $prodTracaDetail;
                                }
                            }

                            $step['TRACA'] = $tracasList;

                    
                        }
                        $process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'][$keyOperationGroup]['OPERATIONS_DETAILLEES'][$keyDetailedOperation]['STEPS'][$keyStep] = $step;
                    }
                }

                $sql = "SELECT * FROM t_prod_suboperations WHERE ID_PROCESS_SUBOPE = :detailedOperationId AND ID_PROD_PROCESS= :idProdProcess";
                $query = $con->createQuery($sql, ['detailedOperationId' => $detailedOperation['ID_OPERATION_DETAILLEE'], 'idProdProcess' => $prodProcess['ID_PROD_PROCESS']]);
                $prodSubOperation = $query->fetch();

                $process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'][$keyOperationGroup]['OPERATIONS_DETAILLEES'][$keyDetailedOperation]['PROD'] = $prodSubOperation;
            }
        }
    }
}
$prodProcess['process'] = $process;

echo json_encode($prodProcess);
