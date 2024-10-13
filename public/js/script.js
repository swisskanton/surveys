function showContent(index) {
    document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
    document.getElementById('content-' + index).classList.add('active');
}