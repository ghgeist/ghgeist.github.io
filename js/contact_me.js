// Email protection using JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const emailParts = ['granthgeist', '@', 'gmail', '.com'];  // Change these parts to match your email
    const email = emailParts.join('');
    const emailLink = document.getElementById('email-link');
    
    if (emailLink) {
        emailLink.href = 'mailto:' + email;
        emailLink.addEventListener('click', function(e) {
            window.location.href = 'mailto:' + email;
        });
    }
});