function formatNumbers() {
    var numbers = document.getElementById('numbers').value.split('\n');
    var links = document.getElementById('links');
    var message = document.getElementById('message').value.trim(); // Captura a mensagem padrão do textarea
    links.innerHTML = '';

    var hasValidNumbers = false; // Variável para verificar se há pelo menos um número válido

    for (var i = 0; i < numbers.length; i++) {
        var number = numbers[i].trim().replace(/-/g, '');

        // Verifica se o número tem pelo menos 9 dígitos numéricos
        if (/^\d{9,}$/.test(number)) {
            var link = document.createElement('a');
            var fullNumber = '+55' + number; // Adiciona o prefixo "+55" ao número após a validação
            link.href = 'https://wa.me/' + fullNumber + '?text=' + encodeURIComponent(message);
            link.target = '_blank';
            link.textContent = fullNumber;
            links.appendChild(link);
            hasValidNumbers = true; // Define como true se houver pelo menos um número válido
        } else {
            alert("O número " + number + " não possui 9 dígitos. Por favor, verifique.");
            return; // Retorna imediatamente se um número inválido for encontrado
        }
    }

    // Se nenhum número válido for encontrado, exibe um alerta
    if (!hasValidNumbers) {
        alert("Por favor, insira pelo menos um número válido com 9 dígitos.");
    }
}
