// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    let menuToggle = document.getElementById('menu-toggle');
    let nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        
        let navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    

    let themeToggle = document.getElementById('theme-toggle');
    
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            }
        });
    }
    
    
    const form = document.getElementById('reservation-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const carType = document.getElementById('car-type').value;
            const messageDiv = document.getElementById('form-message');
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            messageDiv.style.display = 'none';
            
            let errors = [];
            
            if (!name) {
                errors.push('Ime je obavezno');
            }
            
            if (!email) {
                errors.push('Email adresa je obavezna');
            } else if (!emailRegex.test(email)) {
                errors.push('Email adresa nije validna (npr: ime@domen.com)');
            }
            
            if (!phone) {
                errors.push('Kontakt telefon je obavezan');
            }
            
            if (!carType) {
                errors.push('Molimo izaberite tip automobila');
            }
            
            if (errors.length > 0) {
                messageDiv.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#3d1f1f' : '#ffebee';
                messageDiv.style.color = '#ff6b6b';
                messageDiv.style.border = '2px solid #ff6b6b';
                messageDiv.innerHTML = '❌ Greška:<br>' + errors.join('<br>');
                messageDiv.style.display = 'block';
            } else {
                messageDiv.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#1f3d2f' : '#e8f5e9';
                messageDiv.style.color = '#4ade80';
                messageDiv.style.border = '2px solid #4ade80';
                messageDiv.innerHTML = '✅ Uspešno!<br>Vaša rezervacija je primljena. Uskoro ćemo vas kontaktirati na ' + email + ' sa detaljima.';
                messageDiv.style.display = 'block';
                
                setTimeout(function() {
                    form.reset();
                    messageDiv.style.display = 'none';
                }, 3000);
            }
        });
    }
    
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
        
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            
            this.classList.add('active');
            
            
            const filterValue = this.getAttribute('data-filter');
            
            
            carCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});

