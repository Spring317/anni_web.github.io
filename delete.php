<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $gallery = $input['gallery'] ?? '';
    $fileName = $input['fileName'] ?? '';
    
    // Map gallery IDs to folder names
    $folderMap = [
        'meet-gallery' => 'meet',
        'first-gallery' => 'first',
        'distance-gallery' => 'distance',
        'together-gallery' => 'together'
    ];
    
    if (!isset($folderMap[$gallery])) {
        echo json_encode(['success' => false, 'message' => 'Invalid gallery']);
        exit;
    }
    
    if (empty($fileName)) {
        echo json_encode(['success' => false, 'message' => 'Invalid filename']);
        exit;
    }
    
    $filePath = 'images/' . $folderMap[$gallery] . '/' . $fileName;
    
    if (file_exists($filePath)) {
        if (unlink($filePath)) {
            echo json_encode(['success' => true, 'message' => 'File deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete file']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'File not found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>