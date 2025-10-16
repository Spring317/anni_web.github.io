// Global variables
let currentGallery = null;
const startDate = new Date('2025-02-17T00:00:00');

// Static image data - manually add your image filenames here
const galleries = {
    'meet-gallery': [
        // Add your "How We Meet" image filenames here
        // { name: 'photo1.jpg', url: 'images/meet/photo1.jpg' }
    ],
    'first-gallery': [
        // Add your "First" moment image filenames here
        // { name: 'photo1.jpg', url: 'images/first/photo1.jpg' }
         { name: 'IMG_0548.JPG', url: 'images/first/IMG_0548.JPG' },
        { name: 'IMG_0550.JPG', url: 'images/first/IMG_0550.JPG' },
        { name: 'IMG_0551.JPG', url: 'images/first/IMG_0551.JPG' },
        { name: 'IMG_0665.JPG', url: 'images/first/IMG_0665.JPG' },
        { name: 'IMG_3088.PNG', url: 'images/first/IMG_3088.PNG' },
        { name: 'IMG_3089.PNG', url: 'images/first/IMG_3089.PNG' },
        { name: 'IMG_3090.PNG', url: 'images/first/IMG_3090.PNG' },
        { name: 'IMG_3091.PNG', url: 'images/first/IMG_3091.PNG' },
        { name: 'IMG_3092.PNG', url: 'images/first/IMG_3092.PNG' },
        { name: 'IMG_3093.PNG', url: 'images/first/IMG_3093.PNG' },
        { name: 'IMG_3094.PNG', url: 'images/first/IMG_3094.PNG' },
        { name: 'IMG_3095.PNG', url: 'images/first/IMG_3095.PNG' },
        { name: 'IMG_3096.PNG', url: 'images/first/IMG_3096.PNG' },
        { name: 'IMG_3097.PNG', url: 'images/first/IMG_3097.PNG' },
        { name: 'IMG_3098.PNG', url: 'images/first/IMG_3098.PNG' },
        { name: 'IMG_3099.PNG', url: 'images/first/IMG_3099.PNG' },
        { name: 'IMG_3100.PNG', url: 'images/first/IMG_3100.PNG' },
        { name: 'IMG_3101.PNG', url: 'images/first/IMG_3101.PNG' },
        { name: 'IMG_3102.PNG', url: 'images/first/IMG_3102.PNG' },
        { name: 'IMG_3103.PNG', url: 'images/first/IMG_3103.PNG' },
        { name: 'IMG_3104.PNG', url: 'images/first/IMG_3104.PNG' },
        { name: 'IMG_3105.PNG', url: 'images/first/IMG_3105.PNG' },
        { name: 'IMG_3106.PNG', url: 'images/first/IMG_3106.PNG' },
        { name: 'IMG_3107.PNG', url: 'images/first/IMG_3107.PNG' },
        { name: 'IMG_3108.PNG', url: 'images/first/IMG_3108.PNG' },
        { name: 'IMG_3109.PNG', url: 'images/first/IMG_3109.PNG' },
        { name: 'IMG_3110.PNG', url: 'images/first/IMG_3110.PNG' },
        { name: 'IMG_3111.PNG', url: 'images/first/IMG_3111.PNG' },
        { name: 'IMG_3112.PNG', url: 'images/first/IMG_3112.PNG' },
        { name: 'IMG_3113.PNG', url: 'images/first/IMG_3113.PNG' },
        { name: 'IMG_3114.PNG', url: 'images/first/IMG_3114.PNG' },
        { name: 'IMG_3115.PNG', url: 'images/first/IMG_3115.PNG' },
    ],
    'distance-gallery': [
        // Your distance relationship images - example format:
       { name: 'IMG_2926.PNG', url: 'images/distance/IMG_2926.PNG' },
        { name: 'IMG_2927.PNG', url: 'images/distance/IMG_2927.PNG' },
        { name: 'IMG_2928.PNG', url: 'images/distance/IMG_2928.PNG' },
        { name: 'IMG_2929.PNG', url: 'images/distance/IMG_2929.PNG' },
        { name: 'IMG_2930.PNG', url: 'images/distance/IMG_2930.PNG' },
        { name: 'IMG_2931.PNG', url: 'images/distance/IMG_2931.PNG' },
        { name: 'IMG_2932.PNG', url: 'images/distance/IMG_2932.PNG' },
        { name: 'IMG_2933.PNG', url: 'images/distance/IMG_2933.PNG' },
        { name: 'IMG_2934.PNG', url: 'images/distance/IMG_2934.PNG' },
        { name: 'IMG_2935.PNG', url: 'images/distance/IMG_2935.PNG' },
        { name: 'IMG_2936.PNG', url: 'images/distance/IMG_2936.PNG' },
        { name: 'IMG_2937.PNG', url: 'images/distance/IMG_2937.PNG' },
        { name: 'IMG_2938.PNG', url: 'images/distance/IMG_2938.PNG' },
        { name: 'IMG_2939.PNG', url: 'images/distance/IMG_2939.PNG' },
        { name: 'IMG_2940.PNG', url: 'images/distance/IMG_2940.PNG' },
        { name: 'IMG_2941.PNG', url: 'images/distance/IMG_2941.PNG' },
        { name: 'IMG_2942.PNG', url: 'images/distance/IMG_2942.PNG' },
        { name: 'IMG_2943.PNG', url: 'images/distance/IMG_2943.PNG' },
        { name: 'IMG_2944.PNG', url: 'images/distance/IMG_2944.PNG' },
        { name: 'IMG_2945.PNG', url: 'images/distance/IMG_2945.PNG' },
        { name: 'IMG_2946.PNG', url: 'images/distance/IMG_2946.PNG' },
        { name: 'IMG_2947.PNG', url: 'images/distance/IMG_2947.PNG' },
        { name: 'IMG_2948.PNG', url: 'images/distance/IMG_2948.PNG' },
        { name: 'IMG_2949.PNG', url: 'images/distance/IMG_2949.PNG' },
        { name: 'IMG_2950.PNG', url: 'images/distance/IMG_2950.PNG' },
        { name: 'IMG_2951.PNG', url: 'images/distance/IMG_2951.PNG' },
        { name: 'IMG_2952.PNG', url: 'images/distance/IMG_2952.PNG' },
        { name: 'IMG_2953.PNG', url: 'images/distance/IMG_2953.PNG' },
        { name: 'IMG_2954.PNG', url: 'images/distance/IMG_2954.PNG' },
        { name: 'IMG_2955.PNG', url: 'images/distance/IMG_2955.PNG' },
        { name: 'IMG_2956.PNG', url: 'images/distance/IMG_2956.PNG' },
        { name: 'IMG_2957.PNG', url: 'images/distance/IMG_2957.PNG' },
        { name: 'IMG_2958.PNG', url: 'images/distance/IMG_2958.PNG' },
        { name: 'IMG_2959.PNG', url: 'images/distance/IMG_2959.PNG' },
        { name: 'IMG_2960.PNG', url: 'images/distance/IMG_2960.PNG' },
        { name: 'IMG_2961.PNG', url: 'images/distance/IMG_2961.PNG' },
        { name: 'IMG_2962.PNG', url: 'images/distance/IMG_2962.PNG' },
        { name: 'IMG_2963.PNG', url: 'images/distance/IMG_2963.PNG' },
        { name: 'IMG_2964.PNG', url: 'images/distance/IMG_2964.PNG' },
        { name: 'IMG_2965.PNG', url: 'images/distance/IMG_2965.PNG' },
        { name: 'IMG_2966.PNG', url: 'images/distance/IMG_2966.PNG' },
        { name: 'IMG_2967.PNG', url: 'images/distance/IMG_2967.PNG' },
        { name: 'IMG_2968.PNG', url: 'images/distance/IMG_2968.PNG' },
        { name: 'IMG_2969.PNG', url: 'images/distance/IMG_2969.PNG' },
        { name: 'IMG_2970.PNG', url: 'images/distance/IMG_2970.PNG' },
        { name: 'IMG_2971.PNG', url: 'images/distance/IMG_2971.PNG' },
        { name: 'IMG_2972.PNG', url: 'images/distance/IMG_2972.PNG' },
        { name: 'IMG_2973.PNG', url: 'images/distance/IMG_2973.PNG' },
        { name: 'IMG_2974.PNG', url: 'images/distance/IMG_2974.PNG' },
        { name: 'IMG_2975.PNG', url: 'images/distance/IMG_2975.PNG' },
        { name: 'IMG_2976.PNG', url: 'images/distance/IMG_2976.PNG' },
        { name: 'IMG_2977.PNG', url: 'images/distance/IMG_2977.PNG' },
        { name: 'IMG_2978.PNG', url: 'images/distance/IMG_2978.PNG' },
        { name: 'IMG_2979.PNG', url: 'images/distance/IMG_2979.PNG' },
        { name: 'IMG_2980.PNG', url: 'images/distance/IMG_2980.PNG' },
        { name: 'IMG_2981.PNG', url: 'images/distance/IMG_2981.PNG' },
        { name: 'IMG_2982.PNG', url: 'images/distance/IMG_2982.PNG' },
        { name: 'IMG_2983.PNG', url: 'images/distance/IMG_2983.PNG' },
        { name: 'IMG_2984.PNG', url: 'images/distance/IMG_2984.PNG' },
        { name: 'IMG_2985.PNG', url: 'images/distance/IMG_2985.PNG' },
        { name: 'IMG_2986.PNG', url: 'images/distance/IMG_2986.PNG' },
        { name: 'IMG_2987.PNG', url: 'images/distance/IMG_2987.PNG' },
        { name: 'IMG_2988.PNG', url: 'images/distance/IMG_2988.PNG' },
        { name: 'IMG_2989.PNG', url: 'images/distance/IMG_2989.PNG' },
        { name: 'IMG_2990.PNG', url: 'images/distance/IMG_2990.PNG' },
        { name: 'IMG_2991.PNG', url: 'images/distance/IMG_2991.PNG' },
        { name: 'IMG_2992.PNG', url: 'images/distance/IMG_2992.PNG' },
        { name: 'IMG_2993.PNG', url: 'images/distance/IMG_2993.PNG' },
        { name: 'IMG_2994.PNG', url: 'images/distance/IMG_2994.PNG' },
        { name: 'IMG_2995.PNG', url: 'images/distance/IMG_2995.PNG' },
        { name: 'IMG_2996.PNG', url: 'images/distance/IMG_2996.PNG' },
        { name: 'IMG_2997.PNG', url: 'images/distance/IMG_2997.PNG' },
        { name: 'IMG_2998.PNG', url: 'images/distance/IMG_2998.PNG' },
        { name: 'IMG_2999.PNG', url: 'images/distance/IMG_2999.PNG' },
        { name: 'IMG_3001.PNG', url: 'images/distance/IMG_3001.PNG' },
        { name: 'IMG_3002.PNG', url: 'images/distance/IMG_3002.PNG' },
        { name: 'IMG_3003.PNG', url: 'images/distance/IMG_3003.PNG' },
        { name: 'IMG_3004.PNG', url: 'images/distance/IMG_3004.PNG' },
        { name: 'IMG_3005.PNG', url: 'images/distance/IMG_3005.PNG' },
        { name: 'IMG_3006.PNG', url: 'images/distance/IMG_3006.PNG' },
        { name: 'IMG_3007.PNG', url: 'images/distance/IMG_3007.PNG' },
        { name: 'IMG_3008.PNG', url: 'images/distance/IMG_3008.PNG' },
        { name: 'IMG_3009.PNG', url: 'images/distance/IMG_3009.PNG' },
        { name: 'IMG_3010.PNG', url: 'images/distance/IMG_3010.PNG' },
        // Add all your PNG files here...
        // You can generate this list automatically (see instructions below)
    ],
    'together-gallery': [
        // Add your "Together Again" image filenames here
        // { name: 'photo1.jpg', url: 'images/together/photo1.jpg' }
        { name: 'IMG_3011.PNG', url: 'images/together/IMG_3011.PNG' },
        { name: 'IMG_3012.PNG', url: 'images/together/IMG_3012.PNG' },
        { name: 'IMG_3013.PNG', url: 'images/together/IMG_3013.PNG' },
        { name: 'IMG_3014.PNG', url: 'images/together/IMG_3014.PNG' },
        { name: 'IMG_3015.PNG', url: 'images/together/IMG_3015.PNG' },
        { name: 'IMG_3016.PNG', url: 'images/together/IMG_3016.PNG' },
        { name: 'IMG_3017.PNG', url: 'images/together/IMG_3017.PNG' },
        { name: 'IMG_3018.PNG', url: 'images/together/IMG_3018.PNG' },
        { name: 'IMG_3019.PNG', url: 'images/together/IMG_3019.PNG' },
        { name: 'IMG_3020.PNG', url: 'images/together/IMG_3020.PNG' },
        { name: 'IMG_3021.PNG', url: 'images/together/IMG_3021.PNG' },
        { name: 'IMG_3022.PNG', url: 'images/together/IMG_3022.PNG' },
        { name: 'IMG_3023.PNG', url: 'images/together/IMG_3023.PNG' },
        { name: 'IMG_3024.PNG', url: 'images/together/IMG_3024.PNG' },
        { name: 'IMG_3025.PNG', url: 'images/together/IMG_3025.PNG' },

    ]
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
    loadStaticImages();
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
    
    window.addEventListener('scroll', handleScroll);
}

function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
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
    updateTimer();
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = new Date();
    const timeDiff = now - startDate;
    
    if (timeDiff < 0) {
        document.getElementById('months').textContent = '0';
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    const totalSeconds = Math.floor(timeDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    
    const months = Math.floor(totalDays / 30.44);
    const days = totalDays % Math.floor(30.44);
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    
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

// Static image loading (no server required)
function loadStaticImages() {
    Object.keys(galleries).forEach(galleryId => {
        updateGalleryDisplay(galleryId);
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
    
    gallery.innerHTML = '';
    
    images.forEach((imageData, index) => {
        console.log(`Adding image ${index}:`, imageData);
        const imageItem = createImageElement(imageData, galleryId, index);
        gallery.appendChild(imageItem);
    });
    
    if (images.length === 0) {
        const placeholder = createPlaceholder(galleryId);
        gallery.appendChild(placeholder);
    } else {
        const addMoreBtn = createAddMoreButton(galleryId);
        gallery.appendChild(addMoreBtn);
    }
    
    animateGalleryUpdate(gallery);
}

function createImageElement(imageData, galleryId, index) {
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    imageItem.style.opacity = '0';
    imageItem.style.transform = 'scale(0.8)';
    
    imageItem.innerHTML = `
        <img src="${imageData.url}" alt="${imageData.name}" loading="lazy">
        <div class="image-overlay">
            <button class="fullscreen-btn" onclick="viewFullscreen('${imageData.url}')">
                <i class="fas fa-expand"></i>
            </button>
        </div>
    `;
    
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
            placeholderText = 'Add photos of how you met to the galleries object in script-static.js';
            break;
        case 'first-gallery':
            placeholderText = 'Add your first moments to the galleries object in script-static.js';
            break;
        case 'distance-gallery':
            placeholderText = 'Add long distance memories to the galleries object in script-static.js';
            break;
        case 'together-gallery':
            placeholderText = 'Add photos of being together to the galleries object in script-static.js';
            break;
    }
    
    placeholder.innerHTML = `
        <i class="fas fa-heart"></i>
        <p>${placeholderText}</p>
    `;
    
    placeholder.addEventListener('click', function() {
        alert('To add images in the static version, edit the galleries object in script-static.js and add image files to the repository.');
    });
    
    return placeholder;
}

function createAddMoreButton(galleryId) {
    const addBtn = document.createElement('div');
    addBtn.className = 'image-placeholder add-more-btn';
    addBtn.innerHTML = `
        <i class="fas fa-plus"></i>
        <p>Add More Photos</p>
        <small>Edit script-static.js to add more images</small>
    `;
    
    addBtn.addEventListener('click', function() {
        alert('To add more images, edit the galleries object in script-static.js and add image files to the repository.');
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
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeFullscreen();
        }
    });
}

// Simplified upload functionality (GitHub Pages compatible)
function initImageUpload() {
    // Hide the upload button for static version
    if (addImageBtn) {
        addImageBtn.style.display = 'none';
    }
}

// Notification functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
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
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
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

.add-more-btn small {
    display: block;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    opacity: 0.7;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);