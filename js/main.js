 const emergencyFormModal = document.getElementById('emergencyFormModal');
    const emergencyFormOverlay = document.getElementById('emergencyFormOverlay');
    const emergencyRequestBtn = document.getElementById('emergencyRequestBtn');
    const closeEmergencyFormBtn = document.getElementById('closeEmergencyFormBtn');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    emergencyRequestBtn.addEventListener('click', () => {
      emergencyFormModal.style.display = 'block';
      emergencyFormOverlay.style.display = 'block';
    });

    function closeForm() {
      emergencyFormModal.style.display = 'none';
      emergencyFormOverlay.style.display = 'none';
    }

    emergencyFormOverlay.addEventListener('click', closeForm);
    closeEmergencyFormBtn.addEventListener('click', closeForm);

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });