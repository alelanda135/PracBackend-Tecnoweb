<?php
//config.php
$hostname = 'localhost';
$username = 'root';
$password = '';
$database = 'sakila';
$port = 3306;

$conn = new mysqli($hostname, $username, $password, $database, $port);

if ($conn->connect_error) {
    die('Error de conexión a la base de datos: ' . $conn->connect_error);
}
