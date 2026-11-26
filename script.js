// Wait for the html document to load before executing any code
document.addEventListener('DOMContentLoaded', function() {
  // Shared functionality across pages, set up logo and navigation link
  initializeNavigation();
  
  // Initialize carousal
  if (document.querySelector('.stories-carousel')) {
    initializeCarousel();
  }
  
  // Initialize signup form 
  if (document.querySelector('#signup-form')) {
    initializeSignupForm();
  }
  
  // Initialize pitch submition form
  if (document.querySelector('#pitch-form')) {
    initializePitchForm();
  }
  
  // Initailize filter on browse page
  if (document.querySelector('.filter-dropdown')) {
    initializeFilters();
  }
});

// Initialize navigation and shared components
function initializeNavigation() {
  // Navigate to index.html when logo is clicked 
  const logoElements = document.querySelectorAll('.logo');
  logoElements.forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      window.location.href = 'index.html'; //Redirect to homepage
    });
  });

  // Navigate to brose page if discover is clicked
  const discoverLinks = document.querySelectorAll('a[href="#"]');
  discoverLinks.forEach(link => {
    if (link.textContent.includes('Discover')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'browse.html';
      });
    }
  });
}

// Success stories carousel
function initializeCarousel() {
  const prevBtn = document.getElementById('prev-story');
  const nextBtn = document.getElementById('next-story');
  const storyCard = document.querySelector('.story-card');
  
  // Getting multiple stories with an array
  const stories = [
    {
      name: 'Sarah Johnson',
      position: 'CEO, TechNova',
      text: '" Thanks to PitchConnect, we secured our Series A funding in just 3 months. The platform made it easy to connect with investors who were truly interested in our startup."',
      amount: '$2.5M Raised',
      // image: 'https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Michael Chen',
      position: 'Founder, EcoSmart',
      text: '" The quality of investors on PitchConnect is outstanding. We connected with partners who not only provided capital but also valuable industry expertise."',
      amount: '$1.8M Raised',
      // image: ''
    },
    {
      name: 'Emma Williams',
      position: 'CTO, HealthSync',
      text: '" From our first pitch to closing funding took only 4 months. The platform\'s tools helped us refine our presentation and connect with the right investors."',
      amount: '$3.2M Raised',
      // image: ''
    }
  ];
  
  let currentStoryIndex = 0;
  
  // Update the story card with content from the current story
  function updateStory(index) {
    const story = stories[index];
    const storyContent = `
      <div class="founder-img">
        <img src="${story.image}" alt="${story.name}">
      </div>
      <div class="story-content">
        <h3 class="founder-name">${story.name}</h3>
        <p class="founder-position">${story.position}</p>
        <p class="story-text">${story.text}</p>
        <p class="funding-amount">${story.amount}</p>
      </div>
    `;
    
    // Fade out effect
    storyCard.style.opacity = '0';
    
    setTimeout(() => {
      storyCard.innerHTML = storyContent;
      // Fade in effect
      storyCard.style.opacity = '1';
    }, 300);
  }
  
  // Previous and Nect navigation for carousel 
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentStoryIndex = (currentStoryIndex - 1 + stories.length) % stories.length;
      updateStory(currentStoryIndex);
    });
    
    nextBtn.addEventListener('click', () => {
      currentStoryIndex = (currentStoryIndex + 1) % stories.length;
      updateStory(currentStoryIndex);
    });
  }
  
  // Auto-rotate stories every 7 seconds
  setInterval(() => {
    currentStoryIndex = (currentStoryIndex + 1) % stories.length;
    updateStory(currentStoryIndex);
  }, 7000);
}

// Signup form functionality - toggle account type(investor or founder) and handle form
function initializeSignupForm() {
  const accountTypes = document.querySelectorAll('.account-type');
  const signupForm = document.getElementById('signup-form');
  
  // Account type selector - highlight the selected account type
  accountTypes.forEach(button => {
    button.addEventListener('click', () => {
      accountTypes.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  
  // Form submission handle
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const accountType = document.querySelector('.account-type.active').dataset.type;
      
      console.log('Signup form submitted:', { name, email, accountType });
      
      // Successful signup 
      alert('Account created successfully!');
      
      // Redirect based on account type
      if (accountType === 'founder') {
        window.location.href = 'founder.html';
      } else if (accountType === 'investor') {
        window.location.href = 'investor.html';
      }
    });
  }
}

// Pitch submission form
function initializePitchForm() {
  const pitchForm = document.getElementById('pitch-form');
  const fileSelectBtn = document.querySelector('.file-select-btn');
  const fileInput = document.getElementById('pitch-file');
  const fileNameDisplay = document.querySelector('.file-name');
  const descriptionTextarea = document.getElementById('description');
  const charCountDisplay = document.getElementById('char-count');
  
  // File selection
  if (fileSelectBtn && fileInput) {
    fileSelectBtn.addEventListener('click', () => {
      fileInput.click();
    });
    
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
      } else {
        fileNameDisplay.textContent = 'No file chosen (PDF only)';
      }
    });
  }
  
  // Character counter for description
  if (descriptionTextarea && charCountDisplay) {
    descriptionTextarea.addEventListener('input', () => {
      const count = descriptionTextarea.value.length;
      charCountDisplay.textContent = count;
      
      // Add visual feedback when approaching limit
      if (count > 200) {
        charCountDisplay.style.color = '#ef4444';
      } else {
        charCountDisplay.style.color = '';
      }
    });
  }
  
  // Form submission
  if (pitchForm) {
    pitchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Collect form data
      const formData = {
        startupName: document.getElementById('startup-name').value,
        industry: document.getElementById('industry').value,
        location: document.getElementById('location').value,
        fundingStage: document.getElementById('funding-stage').value,
        description: document.getElementById('description').value,
        // File would be handled differently in a real application
        hasFile: fileInput.files.length > 0
      };
      
      console.log('Pitch form submitted:', formData);
      
      // Validation check
      if (!formData.hasFile) {
        alert('Please upload a pitch document');
        return;
      }
      
      // Successful submission
      alert('Your pitch has been submitted successfully!');
      window.location.href = 'founder.html';
    });
  }
}

// Filter functionality for browse page
function initializeFilters() {
  const filterDropdowns = document.querySelectorAll('.filter-dropdown');
  const searchInput = document.querySelector('.search-box input');
  
  // Show/hide dropdown on click (for mobile)
  filterDropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.filter-btn');
    const content = dropdown.querySelector('.dropdown-content');
    
    if (btn && content) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close other dropdowns
        filterDropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.querySelector('.dropdown-content').style.display = 'none';
          }
        });
        
        // Toggle current dropdown
        if (content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      });
      
      // Handle filter selection
      const filterOptions = content.querySelectorAll('a');
      filterOptions.forEach(option => {
        option.addEventListener('click', (e) => {
          e.preventDefault();
          const selectedValue = option.textContent;
          btn.innerHTML = `${selectedValue} <i class="fas fa-chevron-down"></i>`;
          content.style.display = 'none';
          
          // Apply filter (simulated)
          console.log('Filter applied:', selectedValue);
        });
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    filterDropdowns.forEach(dropdown => {
      const content = dropdown.querySelector('.dropdown-content');
      if (content) {
        content.style.display = 'none';
      }
    });
  });
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      console.log('Searching for:', searchTerm);
      
      // Simulated search - would connect to backend in a real app
      if (searchTerm.length > 2) {
        // Filtering would happen here
      }
    });
  }
}