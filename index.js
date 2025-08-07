function removerTodo (elemento){
    var elementoRemover = document.querySelector("#" + elemento);
    elementoRemover.remove();
    alert(elementoRemover);
}