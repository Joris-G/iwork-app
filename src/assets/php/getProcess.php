<?php
require 'Connexion.php';
header('content-Type: application/json');
$con = new Connexion();


//Process
$sql = "SELECT * FROM t_process WHERE ARTICLE_SAP = :articleSap AND INDICE_PROCESS = :indiceProcess";
$query = $con->createQuery($sql, ['articleSap' => $_GET['articleSap'], 'indiceProcess' => 0]);
$process = $query->fetch();

//Prod Process
// On charge le prodProcess
$sql = "SELECT * FROM t_prod_process WHERE ORDRE_FABRICATION = :workorder";
$query = $con->createQuery($sql, ['workorder' => $_GET['OF']]);
$prodProcess = $query->fetch();
$process['prodProcess'] = $prodProcess;


//Article
$sql = "SELECT * FROM t_article WHERE ARTICLE_SAP = :articleSap";
$query = $con->createQuery($sql, ['articleSap' => $_GET['articleSap']]);
$article = $query->fetch();
$result['ARTICLE'] = $article;

//Operations
$sql = "SELECT * FROM t_process_operation WHERE ID_PROCESS = :idProcess";
$query = $con->createQuery($sql, ['idProcess' => $process['ID_PROCESS']]);
$operationList = $query->fetchAll();

$process['LISTE_OPERATIONS'] = $operationList;




foreach ($operationList as $keyOperation => $operation) {
    // ProdOperation
    //On charge les opérations liées au prodProcess
    $sql = "SELECT * FROM t_prod_operation WHERE ID_PROD_PROCESS = :idProdProcess AND ID_OPERATION = :idOperation";
    $query = $con->createQuery($sql, ['idProdProcess' => $prodProcess['ID_PROD_PROCESS'], 'idOperation' => $operation['ID_OPERATION']]);
    $prodOperation = $query->fetch();
    //On ajoute
    $process['LISTE_OPERATIONS'][$keyOperation]['prodOperation'] = $prodOperation;

    //Group
    $sql = "SELECT * FROM t_process_subope_groups WHERE ID_OPERATION = :idOPeration";
    $query = $con->createQuery($sql, ['idOPeration' => $operation['ID_OPERATION']]);
    $listGroupOpe = $query->fetchAll();

    $process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'] = $listGroupOpe;

    foreach ($process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'] as $keyOperationGroup => $operationGroup) {

        //SubOperation
        $sql = "SELECT * FROM t_process_suboperations WHERE ID_GROUP = :groupId";
        $query = $con->createQuery($sql, ['groupId' => $operationGroup['ID_GROUP']]);
        $detailedOperationsList = $query->fetchAll();

        $process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'][$keyOperationGroup]['OPERATIONS_DETAILLEES'] = $detailedOperationsList;

        if ($detailedOperationsList) {
            foreach ($detailedOperationsList as $keyDetailedOperation => $detailedOperation) {

                //ProdSuboperation
                $sql = "SELECT * FROM t_prod_suboperations WHERE ID_PROD_OPERATION = :idProdOperation AND ID_PROCESS_SUBOPE = :detailedOperationId ";
                $query = $con->createQuery($sql, ['idProdOperation' => $prodOperation['ID_PROD_OPERATION'], 'detailedOperationId' => $detailedOperation['ID_OPERATION_DETAILLEE']]);
                $prodSubOperation = $query->fetch();
                //On ajoute
                $process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'][$keyOperationGroup]['OPERATIONS_DETAILLEES'][$keyDetailedOperation]['prodSubOperation'] = $prodSubOperation;


                //Steps
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
                        $prodTracaTypeTable;
                        if ($tracasList) {

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
                            $sql = "SELECT * FROM $tracaTypeTable WHERE ID_TRACA = :idTraca";
                            $query = $con->createQuery($sql, ['idTraca' => $tracasList['ID_TRACA']]);
                            $traca = $query->fetchAll();
                            $tracasList['TRACA_DETAILS'] = $traca;

                            $sql = "SELECT * FROM t_prod_traca WHERE ID_TRACA = :idTraca";
                            $query = $con->createQuery($sql, ['idTraca' => $tracasList['ID_TRACA']]);
                            $prodTraca = $query->fetch();
                            //On ajoute
                            $tracasList['prodTraca'] = $prodTraca;

                            //Prod TracaDetails
                            foreach ($traca as $keyTracaDet => $tracaDeta) {
                                // var_dump($tracaDeta, $prodTracaTypeTable);
                                $sql = "SELECT * FROM  $prodTracaTypeTable WHERE ID_PROD_TRACA = :idProdTraca AND $idTracaParam = :idTracaControle";
                                $query = $con->createQuery($sql, ['idProdTraca' => $prodTraca['ID_PROD_TRACA'], 'idTracaControle' => $tracaDeta[$idTracaParam]]);
                                $prodTracaDetail = $query->fetch();
                                //On ajoute

                                $tracasList['TRACA_DETAILS'][$keyTracaDet]['prodTracaDetail'] = $prodTracaDetail;




                                //On charge les utilisateurs
                                $sql = "SELECT * FROM t_prod_traca_user WHERE ID_PROD_TRACA = :idProdTraca";
                                $query = $con->createQuery($sql, ['idProdTraca' => $tracaDeta['ID_TRACA']]);
                                $prodTracaUser = $query->fetchAll();
                                //On ajoute
                                if ($prodTracaUser) {
                                    $tracasList['TRACA_DETAILS'][$keyTracaDet]['prodTraca']['users'] = $prodTracaUser;
                                }
                            }
                            $step['TRACA'] = $tracasList;
                        }
                        $process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'][$keyOperationGroup]['OPERATIONS_DETAILLEES'][$keyDetailedOperation]['STEPS'][$keyStep] = $step;

                        //ProdStep
                        $sql = "SELECT * FROM t_prod_suboperation_steps WHERE ID_PROD_SUBOP = :idProdSubOperation AND ID_STEP = :idProcessStep";
                        $query = $con->createQuery($sql, ['idProdSubOperation' => $prodSubOperation['ID_PROD_SUBOP'], 'idProcessStep' => $step['ID_STEP']]);
                        $prodSubOperationStep = $query->fetch();
                        //On ajoute
                        $process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'][$keyOperationGroup]['OPERATIONS_DETAILLEES'][$keyDetailedOperation]['STEPS'][$keyStep]['prodStep'] = $prodSubOperationStep;
                    }
                }
            }
        }
    }
}

$result['process'] = $process;
echo json_encode($result);
