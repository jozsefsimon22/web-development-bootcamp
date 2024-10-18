function scrolldiv(){
    var element = document.getElementById("test");
    element.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
    });
}