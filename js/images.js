document.addEventListener('DOMContentLoaded', function() {
    $('.project-item').click(function() {
        const url = $(this).data('url');
        window.location.href = url;
    });
});