function enviarPergunta() {
    var ingredientsInput = document.getElementById("ingredients");
    var ingredients = ingredientsInput.value;

    if (ingredients.trim() === "") {
        alert("Por favor, insira os ingredientes.");
        return;
    }

    ingredientsInput.disabled = true;
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("ingredients-input").style.display = "none";
    document.getElementById("loading").style.display = "block";
    document.getElementById("response").style.display = "none";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/recipe", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            document.getElementById("loading").style.display = "none";
            ingredientsInput.disabled = false;
            document.getElementById("submit-btn").disabled = false;
            
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                exibirReceita(response.recipe);
            } else {
                alert("Ocorreu um erro ao processar a requisição.");
                limparCampos();
            }
        }
    };
    xhr.send(JSON.stringify({ ingredients: ingredients }));
}

function exibirReceita(recipe) {
    var recipeElement = document.getElementById("recipe");
    recipeElement.innerHTML = recipe;
    document.getElementById("response").style.display = "block";
    document.getElementById("ingredients-input").style.display = "none";
}

function limparCampos() {
    var ingredientsInput = document.getElementById("ingredients");
    ingredientsInput.disabled = false;
    document.getElementById("submit-btn").disabled = false;
    ingredientsInput.value = "";
}
