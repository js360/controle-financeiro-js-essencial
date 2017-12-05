var nomeInput = document.querySelector("#nome-input");
var valorInput = document.querySelector("#valor-input");
var tabela = document.querySelector("#tabela");
var saldo = document.querySelector('#saldo');
var resultadoFinal = document.querySelector('.final');

var arrayLancamentos = [];
var id = 0;

window.onload = function(){
    if(localStorage.getItem("arrayLancamentos")) {
        arrayLancamentos = JSON.parse(localStorage.getItem("arrayLancamentos"));
        updateTabela();
        updateSaldo();
    }
};

function receita () {
    if(nomeInput.value && valorInput.value){
        novoLancamento (nomeInput.value, valorInput.value, "receita" );
        updateTabela();
        updateSaldo();
        clear();
    }
}

function despesa () {
    if(nomeInput.value && valorInput.value){
        var linha = novoLancamento (nomeInput.value, valorInput.value, "despesa" );
        updateTabela();
        updateSaldo();
        clear();
    }
}

function novoLancamento (nomeLancamento, valorLancamento, tipoLancamento) {
    var linha = '<tr class="' + tipoLancamento + '"><td>' + nomeLancamento + '</td><td>R$ '+ valorLancamento +'</td><td><button class="excluir" onclick="excluirLinha('+ id +')">Excluir</button></td></tr>';

    var lancamento = {
        id: id,
        nome: nomeLancamento,
        valor: valorLancamento, 
        tipo: tipoLancamento,
        html: linha
    }

    arrayLancamentos.push(lancamento);
    id++;
}

function updateTabela(){
    tabela.innerHTML = "";
    for(i=0; i < arrayLancamentos.length ; i++){
        tabela.innerHTML += arrayLancamentos[i].html;
    }
    localStorage.setItem("arrayLancamentos", JSON.stringify(arrayLancamentos));
}

function updateSaldo () {
    saldo.innerHTML = 0;
    for (i=0; i < arrayLancamentos.length; i++){
        switch (arrayLancamentos[i].tipo){
            case "receita":
                saldo.innerHTML = Number(saldo.innerHTML) + Number(arrayLancamentos[i].valor);
                break;
            case "despesa":
                saldo.innerHTML = Number(saldo.innerHTML) - Number(arrayLancamentos[i].valor);
                break;
            default:
                console.log("Erro no Tipo do Elementos" + arrayLancamentos[i].id);
        }
    }
   if (Number(saldo.innerHTML) > 0) {
        resultadoFinal.style.color = "green";
    } else if (Number(saldo.innerHTML) < 0 ){
        resultadoFinal.style.color = "red";
    } else {
        resultadoFinal.style.color = "black";
    }
}

function clear (){
    nomeInput.value = "";
    valorInput.value = "";
}

function excluirLinha(id) {
    for(i=0; i < arrayLancamentos.length; i++){
        if (arrayLancamentos[i].id == id) {
            var posicao = arrayLancamentos.indexOf(arrayLancamentos[i]);
            break;
        }
    }
    objetoRemovido = arrayLancamentos.splice(posicao, 1)[0];
    updateTabela();
    updateSaldo();
}