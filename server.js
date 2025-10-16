const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 8080;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files (this should come before other routes)
app.use('/images', express.static('images'));
app.use(express.static('.'));

// Create upload directories if they don't exist
const uploadDirs = ['images/meet', 'images/first', 'images/distance', 'images/together'];
uploadDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const galleryMap = {
            'meet-gallery': 'images/meet',
            'first-gallery': 'images/first',
            'distance-gallery': 'images/distance',
            'together-gallery': 'images/together'
        };
        
        const gallery = req.body.gallery;
        const uploadPath = galleryMap[gallery];
        
        if (uploadPath) {
            cb(null, uploadPath);
        } else {
            cb(new Error('Invalid gallery'));
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Upload endpoint
app.post('/upload', upload.array('images'), (req, res) => {
    try {
        const files = req.files.map(file => ({
            name: file.filename,
            originalName: file.originalname,
            url: file.path,
            uploadDate: new Date().toISOString()
        }));
        
        res.json({
            success: true,
            files: files,
            message: `${files.length} file(s) uploaded successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get images endpoint
app.get('/api/images/:gallery', (req, res) => {
    const galleryMap = {
        'meet-gallery': 'images/meet',
        'first-gallery': 'images/first',
        'distance-gallery': 'images/distance',
        'together-gallery': 'images/together'
    };
    
    const gallery = req.params.gallery;
    const imagePath = galleryMap[gallery];
    
    if (!imagePath) {
        return res.status(400).json({
            success: false,
            message: 'Invalid gallery'
        });
    }
    
    try {
        if (!fs.existsSync(imagePath)) {
            return res.json({ success: true, files: [] });
        }
        
        const files = fs.readdirSync(imagePath)
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => {
                const filePath = path.join(imagePath, file);
                const stats = fs.statSync(filePath);
                return {
                    name: file,
                    url: filePath,
                    uploadDate: stats.birthtime.toISOString()
                };
            });
        
        res.json({
            success: true,
            files: files
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete endpoint
app.delete('/api/images/:gallery/:filename', (req, res) => {
    const galleryMap = {
        'meet-gallery': 'images/meet',
        'first-gallery': 'images/first',
        'distance-gallery': 'images/distance',
        'together-gallery': 'images/together'
    };
    
    const gallery = req.params.gallery;
    const filename = req.params.filename;
    const imagePath = galleryMap[gallery];
    
    if (!imagePath) {
        return res.status(400).json({
            success: false,
            message: 'Invalid gallery'
        });
    }
    
    const filePath = path.join(imagePath, filename);
    
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({
                success: true,
                message: 'File deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Love Story server running at http://localhost:${port}`);
    console.log('Image folders created:');
    uploadDirs.forEach(dir => console.log(`  - ${dir}`));
});