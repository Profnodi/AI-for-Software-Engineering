// Sample Course Data
const coursesData = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        description: "Learn HTML, CSS, and JavaScript from scratch. Perfect for beginners who want to start their journey in web development.",
        lessons: [
            { id: 1, title: "Introduction to HTML", completed: false },
            { id: 2, title: "HTML Structure and Elements", completed: false },
            { id: 3, title: "CSS Basics and Styling", completed: false },
            { id: 4, title: "JavaScript Fundamentals", completed: false },
            { id: 5, title: "Building Your First Website", completed: false }
        ],
        status: "not-started",
        enrolled: false
    },
    {
        id: 2,
        title: "Python Programming",
        description: "Master Python programming language with hands-on projects and real-world applications.",
        lessons: [
            { id: 1, title: "Python Setup and Variables", completed: false },
            { id: 2, title: "Control Structures", completed: false },
            { id: 3, title: "Functions and Modules", completed: false },
            { id: 4, title: "Object-Oriented Programming", completed: false },
            { id: 5, title: "File Handling and Data Processing", completed: false },
            { id: 6, title: "Working with Libraries", completed: false }
        ],
        status: "not-started",
        enrolled: false
    },
    {
        id: 3,
        title: "Data Science with Python",
        description: "Learn data analysis, visualization, and machine learning using Python and popular libraries.",
        lessons: [
            { id: 1, title: "Introduction to Data Science", completed: false },
            { id: 2, title: "NumPy and Pandas Basics", completed: false },
            { id: 3, title: "Data Visualization with Matplotlib", completed: false },
            { id: 4, title: "Statistical Analysis", completed: false },
            { id: 5, title: "Machine Learning Introduction", completed: false }
        ],
        status: "not-started",
        enrolled: false
    },
    {
        id: 4,
        title: "React.js Development",
        description: "Build modern web applications using React.js, hooks, and component-based architecture.",
        lessons: [
            { id: 1, title: "React Components and JSX", completed: false },
            { id: 2, title: "Props and State Management", completed: false },
            { id: 3, title: "React Hooks", completed: false },
            { id: 4, title: "Routing with React Router", completed: false },
            { id: 5, title: "State Management with Redux", completed: false },
            { id: 6, title: "Building a Complete App", completed: false }
        ],
        status: "not-started",
        enrolled: false
    },
    {
        id: 5,
        title: "UI/UX Design Principles",
        description: "Learn the fundamentals of user interface and user experience design for digital products.",
        lessons: [
            { id: 1, title: "Design Thinking Process", completed: false },
            { id: 2, title: "Color Theory and Typography", completed: false },
            { id: 3, title: "Layout and Grid Systems", completed: false },
            { id: 4, title: "User Research Methods", completed: false },
            { id: 5, title: "Prototyping and Testing", completed: false }
        ],
        status: "not-started",
        enrolled: false
    },
    {
        id: 6,
        title: "Mobile App Development",
        description: "Create mobile applications for iOS and Android using React Native framework.",
        lessons: [
            { id: 1, title: "React Native Setup", completed: false },
            { id: 2, title: "Components and Navigation", completed: false },
            { id: 3, title: "State Management", completed: false },
            { id: 4, title: "API Integration", completed: false },
            { id: 5, title: "Publishing to App Stores", completed: false }
        ],
        status: "not-started",
        enrolled: false
    }
];

// Application State
let currentPage = 'home';
let selectedCourse = null;
let userProgress = JSON.parse(localStorage.getItem('userProgress')) || {};

// DOM Elements
const homePage = document.getElementById('homePage');
const courseDetailPage = document.getElementById('courseDetailPage');
const myCoursesPage = document.getElementById('myCoursesPage');
const coursesGrid = document.getElementById('coursesGrid');
const myCoursesGrid = document.getElementById('myCoursesGrid');

// Navigation Elements
const homeBtn = document.getElementById('homeBtn');
const coursesBtn = document.getElementById('coursesBtn');
const backBtn = document.getElementById('backBtn');

// Course Detail Elements
const courseTitle = document.getElementById('courseTitle');
const courseDescription = document.getElementById('courseDescription');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const lessonsList = document.getElementById('lessonsList');
const completeBtn = document.getElementById('completeBtn');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    setupEventListeners();
    updateNavigation();
});

// Event Listeners
function setupEventListeners() {
    homeBtn.addEventListener('click', () => showPage('home'));
    coursesBtn.addEventListener('click', () => showPage('myCourses'));
    backBtn.addEventListener('click', () => showPage('home'));
    completeBtn.addEventListener('click', markCourseComplete);
}

// Page Navigation
function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    if (page === 'home') {
        homePage.classList.add('active');
        currentPage = 'home';
        loadCourses();
    } else if (page === 'courseDetail') {
        courseDetailPage.classList.add('active');
        currentPage = 'courseDetail';
    } else if (page === 'myCourses') {
        myCoursesPage.classList.add('active');
        currentPage = 'myCourses';
        loadMyCourses();
    }
    
    updateNavigation();
}

// Update Navigation Active States
function updateNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    if (currentPage === 'home' || currentPage === 'courseDetail') {
        homeBtn.classList.add('active');
    } else if (currentPage === 'myCourses') {
        coursesBtn.classList.add('active');
    }
}

// Load Courses on Home Page
function loadCourses() {
    coursesGrid.innerHTML = '';
    
    coursesData.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

// Load My Courses Page
function loadMyCourses() {
    myCoursesGrid.innerHTML = '';
    
    const enrolledCourses = coursesData.filter(course => course.enrolled);
    
    if (enrolledCourses.length === 0) {
        myCoursesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3>No enrolled courses yet</h3>
                <p>Go to the home page to enroll in courses!</p>
            </div>
        `;
        return;
    }
    
    enrolledCourses.forEach(course => {
        const courseCard = createCourseCard(course, true);
        myCoursesGrid.appendChild(courseCard);
    });
}

// Create Course Card
function createCourseCard(course, isMyCourses = false) {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    const progress = calculateProgress(course.id);
    const statusClass = course.status === 'completed' ? 'completed' : 
                       course.status === 'in-progress' ? 'in-progress' : 'not-started';
    
    card.innerHTML = `
        <div class="course-image">
            📚
        </div>
        <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <span class="lesson-count">${course.lessons.length} lessons</span>
                <span class="course-status status-${statusClass}">${getStatusText(course.status)}</span>
            </div>
            ${isMyCourses ? '' : `<button class="course-btn" onclick="enrollInCourse(${course.id})">
                ${course.enrolled ? 'View Course' : 'Enroll Now'}
            </button>`}
        </div>
    `;
    
    // Add click event for enrolled courses
    if (course.enrolled || isMyCourses) {
        card.addEventListener('click', () => showCourseDetail(course.id));
    }
    
    return card;
}

// Enroll in Course
function enrollInCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (course) {
        course.enrolled = true;
        course.status = 'in-progress';
        saveProgress();
        loadCourses();
        
        // Show success message
        showNotification('Successfully enrolled in course!', 'success');
    }
}

// Show Course Detail
function showCourseDetail(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    selectedCourse = course;
    
    // Update course details
    courseTitle.textContent = course.title;
    courseDescription.textContent = course.description;
    
    // Update progress
    updateProgress();
    
    // Load lessons
    loadLessons();
    
    // Show course detail page
    showPage('courseDetail');
}

// Load Lessons
function loadLessons() {
    lessonsList.innerHTML = '';
    
    selectedCourse.lessons.forEach((lesson, index) => {
        const lessonItem = document.createElement('div');
        lessonItem.className = `lesson-item ${lesson.completed ? 'completed' : ''}`;
        
        lessonItem.innerHTML = `
            <div class="lesson-number">${index + 1}</div>
            <div class="lesson-title">${lesson.title}</div>
            <div class="lesson-status">${lesson.completed ? 'Completed' : 'Not Started'}</div>
        `;
        
        lessonItem.addEventListener('click', () => toggleLessonComplete(index));
        lessonsList.appendChild(lessonItem);
    });
}

// Toggle Lesson Complete
function toggleLessonComplete(lessonIndex) {
    const lesson = selectedCourse.lessons[lessonIndex];
    lesson.completed = !lesson.completed;
    
    // Update lesson display
    const lessonItems = lessonsList.querySelectorAll('.lesson-item');
    const lessonItem = lessonItems[lessonIndex];
    
    if (lesson.completed) {
        lessonItem.classList.add('completed');
        lessonItem.querySelector('.lesson-status').textContent = 'Completed';
    } else {
        lessonItem.classList.remove('completed');
        lessonItem.querySelector('.lesson-status').textContent = 'Not Started';
    }
    
    // Update progress
    updateProgress();
    
    // Save progress
    saveProgress();
}

// Update Progress
function updateProgress() {
    if (!selectedCourse) return;
    
    const completedLessons = selectedCourse.lessons.filter(lesson => lesson.completed).length;
    const totalLessons = selectedCourse.lessons.length;
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
    
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage}% Complete`;
    
    // Update course status
    if (progressPercentage === 100) {
        selectedCourse.status = 'completed';
        completeBtn.textContent = 'Course Completed!';
        completeBtn.disabled = true;
    } else if (progressPercentage > 0) {
        selectedCourse.status = 'in-progress';
        completeBtn.textContent = 'Mark Course as Complete';
        completeBtn.disabled = false;
    } else {
        selectedCourse.status = 'not-started';
        completeBtn.textContent = 'Mark Course as Complete';
        completeBtn.disabled = true;
    }
}

// Mark Course Complete
function markCourseComplete() {
    if (!selectedCourse) return;
    
    // Mark all lessons as completed
    selectedCourse.lessons.forEach(lesson => {
        lesson.completed = true;
    });
    
    selectedCourse.status = 'completed';
    
    // Update display
    loadLessons();
    updateProgress();
    
    // Save progress
    saveProgress();
    
    // Show success message
    showNotification('Congratulations! Course completed successfully!', 'success');
}

// Calculate Progress
function calculateProgress(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return 0;
    
    const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
    return Math.round((completedLessons / course.lessons.length) * 100);
}

// Get Status Text
function getStatusText(status) {
    switch (status) {
        case 'completed': return 'Completed';
        case 'in-progress': return 'In Progress';
        default: return 'Not Started';
    }
}

// Save Progress to Local Storage
function saveProgress() {
    const progressData = {};
    coursesData.forEach(course => {
        progressData[course.id] = {
            enrolled: course.enrolled,
            status: course.status,
            lessons: course.lessons
        };
    });
    
    localStorage.setItem('userProgress', JSON.stringify(progressData));
}

// Load Progress from Local Storage
function loadProgress() {
    const savedProgress = JSON.parse(localStorage.getItem('userProgress'));
    if (!savedProgress) return;
    
    coursesData.forEach(course => {
        if (savedProgress[course.id]) {
            course.enrolled = savedProgress[course.id].enrolled;
            course.status = savedProgress[course.id].status;
            course.lessons = savedProgress[course.id].lessons || course.lessons;
        }
    });
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

// Load saved progress on page load
loadProgress();
