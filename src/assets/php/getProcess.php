<?php
require 'Connexion.php';
header('content-Type: application/json');
$con = new Connexion();

$sql = "SELECT * FROM t_process WHERE ARTICLE_SAP = :articleSap AND INDICE_PROCESS = :indiceProcess";
$query = $con->createQuery($sql, ['articleSap' => $_GET['articleSap'], 'indiceProcess' => 0]);
$process = $query->fetch();

$sql = "SELECT * FROM t_article WHERE ARTICLE_SAP = :articleSap";
$query = $con->createQuery($sql, ['articleSap' => $_GET['articleSap']]);
$article = $query->fetch();
$result['ARTICLE'] = $article;

$sql = "SELECT * FROM t_process_operation WHERE ID_PROCESS = :idProcess";
$query = $con->createQuery($sql, ['idProcess' => $process['ID_PROCESS']]);
$operationList = $query->fetchAll();

$process['LISTE_OPERATIONS'] = $operationList;

foreach ($operationList as $keyOperation => $operation) {

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
                                    $idTracaParam = 'ID_TRACA_CONTROLE';
                                    break;
                                case '2':
                                    $tracaTypeTable = 't_traca_matiere';
                                    $idTracaParam = 'ID_TRACA_MATIERE';
                                    break;
                                case '3':
                                    $tracaTypeTable = 't_traca_of';
                                    $idTracaParam = 'ID_TRACA_OF';
                                    break;
                                case '4':
                                    $tracaTypeTable = 't_traca_mesure';
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
                            $step['TRACA'] = $tracasList;
                        }
                        $process['LISTE_OPERATIONS'][$keyOperation]['OPERATION_GROUP'][$keyOperationGroup]['OPERATIONS_DETAILLEES'][$keyDetailedOperation]['STEPS'][$keyStep] = $step;
                    }
                }
            }
        }
    }
}

$result['process'] = $process;

// On charge le prodProcess
$sql = "SELECT * FROM t_prod_process WHERE ORDRE_FABRICATION = :workorder";
$query = $con->createQuery($sql, ['workorder' => $_GET['OF']]);
$prodProcess = $query->fetch();


//On charge les opérations liées au prodProcess
$sql = "SELECT * FROM t_prod_operation WHERE ID_PROD_PROCESS = :idProdProcess";
$query = $con->createQuery($sql, ['idProdProcess' => $prodProcess['ID_PROD_PROCESS']]);
$operations = $query->fetchAll();
//On ajoute
$prodProcess['operations'] = $operations;
// var_dump($operations);
if ($operations) {

    //Pour chaque opérations on charge les suboperations
    foreach ($operations as $key_operation => $operation) {
        $sql = "SELECT * FROM t_prod_suboperations WHERE ID_PROD_OPERATION = :idProdOperation";
        $query = $con->createQuery($sql, ['idProdOperation' => $operation['ID_PROD_OPERATION']]);
        $subOperations = $query->fetchAll();
        //On ajoute
        $prodProcess['operations'][$key_operation]['subOperations'] = $subOperations;

        // Pour chaque sous opération on charge les steps
        foreach ($subOperations as $key_subOpe => $subOperation) {
            $sql = "SELECT * FROM t_prod_suboperation_steps WHERE ID_PROD_SUBOP = :idProdSubOperation";
            $query = $con->createQuery($sql, ['idProdSubOperation' => $subOperation['ID_PROD_SUBOP']]);
            $subOperationSteps = $query->fetchAll();
            //On ajoute
            $prodProcess['operations'][$key_operation]['subOperations'][$key_subOpe]['steps'] = $subOperationSteps;

            // Pour chaque step on charge les tracas
            foreach ($subOperationSteps as $key_step => $subOperationStep) {
                $sql = "SELECT * FROM t_prod_traca WHERE ID_PROD_STEP = :idProdStep";
                $query = $con->createQuery($sql, ['idProdStep' => $subOperationStep['ID_PROD_STEP']]);
                $prodTraca = $query->fetch();
                //On ajoute
                $prodProcess['operations'][$key_operation]['subOperations'][$key_subOpe]['steps'][$key_step]['traca'] = $prodTraca;

                //On charge les détails
                $tableTypeList = ['t_prod_traca_mesure', 't_prod_traca_of', 't_prod_traca_matiere', 't_prod_traca_controle'];
                //Pour chaque type de traca on test si résultats. Si résultats on les chargent
                foreach ($tableTypeList as $key => $tableType) {
                    $sql = "SELECT * FROM $tableType WHERE ID_PROD_TRACA = :idProdTraca";
                    $query = $con->createQuery($sql, ['idProdTraca' => $subOperationStep['ID_PROD_TRACA']]);
                    $prodTracaDetail = $query->fetchAll();
                    if ($prodTracaDetail) {
                        //On ajoute
                        $prodProcess['operations'][$key_operation]['subOperations'][$key_subOpe]['steps'][$key_step]['traca']['tracaDetails'] = $prodTracaDetail;
                        break;
                    }
                }
                //On charge les utilisateurs
                $sql = "SELECT * FROM 't_prod_traca_user' WHERE ID_PROD_TRACA = :idProdTraca";
                $query = $con->createQuery($sql, ['idProdTraca' => $subOperationStep['ID_PROD_TRACA']]);
                $prodTracaUser = $query->fetchAll();
                //On ajoute
                $prodProcess['operations'][$key_operation]['subOperations'][$key_subOpe]['steps'][$key_step]['traca']['users'] = $prodTracaUser;
            }
        }
    }
}
$result['prodProcess'] = $prodProcess;
echo json_encode($result);
