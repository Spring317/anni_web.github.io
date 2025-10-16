<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $gallery = $_POST['gallery'] ?? '';
    $uploadDir = 'images/';
    
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
    
    $targetDir = $uploadDir . $folderMap[$gallery] . '/';
    $uploadedFiles = [];
    
    if (!empty($_FILES['images']['name'][0])) {
        for ($i = 0; $i < count($_FILES['images']['name']); $i++) {
            $fileName = $_FILES['images']['name'][$i];
            $tmpName = $_FILES['images']['tmp_name'][$i];
            $fileSize = $_FILES['images']['size'][$i];
            $fileError = $_FILES['images']['error'][$i];
            
            // Validate file
            if ($fileError === 0 && $fileSize > 0) {
                $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                $allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
                
                if (in_array($fileExt, $allowedExts)) {
                    // Generate unique filename
                    $newFileName = uniqid('img_', true) . '.' . $fileExt;
                    $targetPath = $targetDir . $newFileName;
                    
                    if (move_uploaded_file($tmpName, $targetPath)) {
                        $uploadedFiles[] = [
                            'name' => $newFileName,
                            'originalName' => $fileName,
                            'path' => $targetPath,
                            'url' => $targetPath
                        ];
                    }
                }
            }
        }
    }
    
    echo json_encode([
        'success' => true,
        'files' => $uploadedFiles,
        'message' => count($uploadedFiles) . ' file(s) uploaded successfully'
    ]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $gallery = $_GET['gallery'] ?? '';
    
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
    
    $targetDir = 'images/' . $folderMap[$gallery] . '/';
    $files = [];
    
    if (is_dir($targetDir)) {
        $imageFiles = glob($targetDir . '*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);
        foreach ($imageFiles as $file) {
            $files[] = [
                'name' => basename($file),
                'url' => $file,
                'uploadDate' => date('c', filemtime($file))
            ];
        }
    }
    
    echo json_encode([
        'success' => true,
        'files' => $files
    ]);
}
?>