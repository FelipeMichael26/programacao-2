<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {   
    $connection = require("dbfactory.php");
    $putData = json_decode(file_get_contents('php://input', true));
    $id = $putData->id;
    $descricaoNova = $putData->descricao;

    // Usando prepared statement para evitar SQL Injection
    $stmt = $connection->prepare("UPDATE todo SET description = ? WHERE idtodo = ?");
    $stmt->bind_param("si", $descricaoNova, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $id, 'descricao' => $descricaoNova]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }
    $stmt->close();
    $connection->close();
} else {
    echo json_encode(['error' => 'Invalid input']);
}
?>