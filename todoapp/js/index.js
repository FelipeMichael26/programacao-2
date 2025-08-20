async function removerTodo (elemento){    
    var elementoRemover = document.querySelector("#"+elemento);
    elementoRemover.remove();    
    await removerBanco(elemento.substring(1,elemento.length));    
    console.log(elemento);
}

async function removerBanco(idElemento){
    await fetch('http://localhost:8080/delete.php?id='+idElemento, {
        method: 'DELETE'})
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response.text);
    })
    .then((data) => {
        console.log('Data fetched:', data);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });    
}

function atualizarTodo(rowid) {
    const id = rowid.replace('_', '');
    const row = document.getElementById(rowid);
    const descricao = row.querySelector('.valor-descricao').value;

    fetch('update.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, descricao: descricao })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Tarefa atualizada com sucesso!');
        } else {
            alert('Erro ao atualizar: ' + (data.error || ''));
        }
    });
}