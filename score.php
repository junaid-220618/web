<?php
session_start();

if (!isset($_SESSION['wins'])) $_SESSION['wins'] = 0;
if (!isset($_SESSION['losses'])) $_SESSION['losses'] = 0;

$action = $_POST['action'] ?? '';

if ($action === 'win') $_SESSION['wins']++;
elseif ($action === 'loss') $_SESSION['losses']++;
elseif ($action === 'reset') $_SESSION['wins'] = $_SESSION['losses'] = 0;

echo json_encode([
    'wins' => $_SESSION['wins'],
    'losses' => $_SESSION['losses']
]);
