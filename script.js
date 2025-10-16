// Global variables
let currentGallery = null;
const startDate = new Date('2025-02-17T00:00:00');

// Image storage - now loaded from server
const galleries = {
    'meet-gallery': [],
    'first-gallery': [],
    'distance-gallery': [],
    'together-gallery': []
};

// DOM Elements
const modal = document.getElementById('imageModal');
const imageInput = document.getElementById('imageInput');
const addImageBtn = document.getElementById('addImageBtn');
const uploadBtn = document.getElementById('uploadBtn');
const cancelBtn = document.getElementById('cancelBtn');
const closeBtn = document.querySelector('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    startTimer();
    initImageUpload();
    loadImagesFromServer();
    showSection('home');
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            updateActiveNav(this);
        });
    });
    
    // Smooth scroll behavior for better UX
    window.addEventListener('scroll', handleScroll);
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function updateActiveNav(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function handleScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Timer functionality
function startTimer() {
    updateTimer(); // Initial update
    setInterval(updateTimer, 1000); // Update every second
}

function updateTimer() {
    const now = new Date();
    const timeDiff = now - startDate;
    
    if (timeDiff < 0) {
        // If the start date is in the future, show zeros
        document.getElementById('months').textContent = '0';
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    // Calculate time differences
    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    
    // Calculate months (approximate)
    const months = Math.floor(totalDays / 30.44); // Average days per month
    const days = totalDays % Math.floor(30.44);
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    
    // Update the display with animation
    updateTimerDisplay('months', months);
    updateTimerDisplay('days', days);
    updateTimerDisplay('hours', hours);
    updateTimerDisplay('minutes', minutes);
    updateTimerDisplay('seconds', seconds);
}

function updateTimerDisplay(elementId, value) {
    const element = document.getElementById(elementId);
    const newValue = value.toString().padStart(2, '0');
    
    if (element.textContent !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#ff6b9d';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = '#fff';
        }, 150);
    }
}

// Image upload functionality
function initImageUpload() {
    // Modal event listeners
    addImageBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    uploadBtn.addEventListener('click', handleImageUpload);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Image placeholder click handlers
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const gallery = this.closest('.image-grid');
            currentGallery = gallery.id;
            openModal();
        });
    });
    
    // File input change handler
    imageInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            uploadBtn.textContent = `Upload ${this.files.length} Image${this.files.length > 1 ? 's' : ''}`;
        } else {
            uploadBtn.textContent = 'Upload Images';
        }
    });
}

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset form
    imageInput.value = '';
    uploadBtn.textContent = 'Upload Images';
    
    // If no gallery is selected, default to meet gallery
    if (!currentGallery) {
        currentGallery = 'meet-gallery';
    }
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentGallery = null;
}

function handleImageUpload() {
    const files = imageInput.files;
    
    if (files.length === 0) {
        alert('Please select at least one image.');
        return;
    }
    
    if (!currentGallery) {
        alert('Please select a gallery first.');
        return;
    }
    
    // Create FormData for upload
    const formData = new FormData();
    formData.append('gallery', currentGallery);
    
    for (let i = 0; i < files.length; i++) {
        formData.append('images[]', files[i]);
    }
    
    // Show upload progress
    uploadBtn.textContent = 'Uploading...';
    uploadBtn.disabled = true;
    
    // Upload to server
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reload images from server
            loadGalleryFromServer(currentGallery);
            showUploadSuccess(data.files.length);
        } else {
            alert('Upload failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Upload error:', error);
        alert('Upload failed. Please try again.');
    })
    .finally(() => {
        uploadBtn.textContent = 'Upload Images';
        uploadBtn.disabled = false;
        closeModal();
    });
}

function updateGalleryDisplay(galleryId) {
    const gallery = document.getElementById(galleryId);
    const images = galleries[galleryId];
    
    console.log(`Updating gallery ${galleryId} with ${images.length} images`);
    
    if (!gallery) {
        console.error(`Gallery element not found: ${galleryId}`);
        return;
    }
    
    // Clear existing content
    gallery.innerHTML = '';
    
    // Add images
    images.forEach((imageData, index) => {
        console.log(`Adding image ${index}:`, imageData);
        const imageItem = createImageElement(imageData, galleryId, index);
        gallery.appendChild(imageItem);
    });
    
    // Add placeholder if no images
    if (images.length === 0) {
        const placeholder = createPlaceholder(galleryId);
        gallery.appendChild(placeholder);
    } else {
        // Add "add more" button
        const addMoreBtn = createAddMoreButton(galleryId);
        gallery.appendChild(addMoreBtn);
    }
    
    // Trigger animation
    animateGalleryUpdate(gallery);
}

function createImageElement(imageData, galleryId, index) {
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    imageItem.style.opacity = '0';
    imageItem.style.transform = 'scale(0.8)';
    
    imageItem.innerHTML = `
        <img src="${imageData.url || imageData.src}" alt="${imageData.name}" loading="lazy">
        <div class="image-overlay">
            <button class="delete-btn" onclick="deleteImage('${galleryId}', '${imageData.name}', ${index})">
                <i class="fas fa-trash"></i>
            </button>
            <button class="fullscreen-btn" onclick="viewFullscreen('${imageData.url || imageData.src}')">
                <i class="fas fa-expand"></i>
            </button>
        </div>
    `;
    
    // Add hover effects
    imageItem.addEventListener('mouseenter', function() {
        this.querySelector('.image-overlay').style.opacity = '1';
    });
    
    imageItem.addEventListener('mouseleave', function() {
        this.querySelector('.image-overlay').style.opacity = '0';
    });
    
    return imageItem;
}

function createPlaceholder(galleryId) {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    
    let placeholderText = 'Add your precious moments here';
    switch(galleryId) {
        case 'meet-gallery':
            placeholderText = 'Add photos of how you met';
            break;
        case 'first-gallery':
            placeholderText = 'Add your first moments';
            break;
        case 'distance-gallery':
            placeholderText = 'Add long distance memories';
            break;
        case 'together-gallery':
            placeholderText = 'Add photos of being together';
            break;
    }
    
    placeholder.innerHTML = `
        <i class="fas fa-heart"></i>
        <p>${placeholderText}</p>
    `;
    
    placeholder.addEventListener('click', function() {
        currentGallery = galleryId;
        openModal();
    });
    
    return placeholder;
}

function createAddMoreButton(galleryId) {
    const addBtn = document.createElement('div');
    addBtn.className = 'image-placeholder add-more-btn';
    addBtn.innerHTML = `
        <i class="fas fa-plus"></i>
        <p>Add More Photos</p>
    `;
    
    addBtn.addEventListener('click', function() {
        currentGallery = galleryId;
        openModal();
    });
    
    return addBtn;
}

function animateGalleryUpdate(gallery) {
    const items = gallery.querySelectorAll('.image-item');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 100);
    });
}

function deleteImage(galleryId, fileName, index) {
    if (confirm('Are you sure you want to delete this image?')) {
        // Delete from server
        fetch(`/api/images/${galleryId}/${fileName}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Remove from local array and update display
                galleries[galleryId].splice(index, 1);
                updateGalleryDisplay(galleryId);
                showDeleteSuccess();
            } else {
                alert('Failed to delete image: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Delete error:', error);
            // Fallback: remove from local array only
            galleries[galleryId].splice(index, 1);
            updateGalleryDisplay(galleryId);
            showDeleteSuccess();
        });
    }
}

function viewFullscreen(imageSrc) {
    const fullscreenModal = document.createElement('div');
    fullscreenModal.className = 'fullscreen-modal';
    fullscreenModal.innerHTML = `
        <div class="fullscreen-content">
            <span class="fullscreen-close">&times;</span>
            <img src="${imageSrc}" alt="Fullscreen Image">
        </div>
    `;
    
    document.body.appendChild(fullscreenModal);
    document.body.style.overflow = 'hidden';
    
    // Close handlers
    const closeBtn = fullscreenModal.querySelector('.fullscreen-close');
    closeBtn.addEventListener('click', closeFullscreen);
    fullscreenModal.addEventListener('click', function(e) {
        if (e.target === fullscreenModal) {
            closeFullscreen();
        }
    });
    
    function closeFullscreen() {
        document.body.removeChild(fullscreenModal);
        document.body.style.overflow = 'auto';
    }
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeFullscreen();
        }
    });
}

// Server storage functions
function loadImagesFromServer() {
    Object.keys(galleries).forEach(galleryId => {
        loadGalleryFromServer(galleryId);
    });
}

function loadGalleryFromServer(galleryId) {
    console.log('Loading gallery:', galleryId);
    fetch(`/api/images/${galleryId}`)
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Gallery data:', data);
            if (data.success) {
                galleries[galleryId] = data.files;
                console.log(`Loaded ${data.files.length} images for ${galleryId}`);
                updateGalleryDisplay(galleryId);
            } else {
                console.error('Failed to load gallery:', data.message);
            }
        })
        .catch(error => {
            console.error('Error loading gallery:', error);
        });
}

// Backup localStorage functions (for offline capability)
function saveToStorage() {
    try {
        localStorage.setItem('loveStoryGalleries', JSON.stringify(galleries));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function loadStoredImages() {
    try {
        const stored = localStorage.getItem('loveStoryGalleries');
        if (stored) {
            const storedGalleries = JSON.parse(stored);
            Object.assign(galleries, storedGalleries);
            
            // Update all gallery displays
            Object.keys(galleries).forEach(galleryId => {
                updateGalleryDisplay(galleryId);
            });
        }
    } catch (e) {
        console.error('Error loading from localStorage:', e);
    }
}

// Notification functions
function showUploadSuccess(count) {
    showNotification(`Successfully uploaded ${count} image${count > 1 ? 's' : ''}!`, 'success');
}

function showDeleteSuccess() {
    showNotification('Image deleted successfully!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '25px',
        background: type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 'linear-gradient(135deg, #2196F3, #1976D2)',
        color: 'white',
        fontWeight: '500',
        zIndex: '3000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modal
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
    
    // Number keys to switch sections (1-3)
    if (e.key >= '1' && e.key <= '3') {
        const sections = ['home', 'how-we-meet', 'our-journey'];
        const sectionIndex = parseInt(e.key) - 1;
        if (sections[sectionIndex]) {
            showSection(sections[sectionIndex]);
            updateActiveNav(document.querySelector(`[href="#${sections[sectionIndex]}"]`));
        }
    }
});

// Add CSS for image overlay and fullscreen modal
const additionalStyles = `
.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.image-overlay button {
    padding: 0.5rem;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.image-overlay button:hover {
    background: #fff;
    transform: scale(1.1);
}

.delete-btn:hover {
    color: #e91e63 !important;
}

.fullscreen-btn:hover {
    color: #2196F3 !important;
}

.fullscreen-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4000;
    animation: fadeIn 0.3s ease;
}

.fullscreen-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.fullscreen-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.fullscreen-close {
    position: absolute;
    top: -50px;
    right: 0;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.3s ease;
}

.fullscreen-close:hover {
    color: #e91e63;
}

.add-more-btn {
    border: 2px dashed rgba(233, 30, 99, 0.5) !important;
    background: rgba(255, 255, 255, 0.7) !important;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);