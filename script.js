function formatNumbers() {
    var numbers = document.getElementById('numbers').value.split('\n');
    var links = document.getElementById('links');
    var message = document.getElementById('message').value.trim();
    var copyButton = document.getElementById('copyButton');
    links.innerHTML = '';

    var hasValidNumbers = false;
    var invalidNumbers = [];

    for (var i = 0; i < numbers.length; i++) {
        var number = numbers[i].trim().replace(/-/g, '');

        // Ignora entradas em branco e que não sejam apenas números
        if (number === '' || /\D/.test(number)) {
            if (number !== '') { // Adiciona à lista de inválidos se não estiver em branco
                invalidNumbers.push(number);
            }
            continue;
        }

        if (/^\d{9,}$/.test(number)) {
            var link = document.createElement('a');
            var fullNumber = '+55' + number;
            link.href = 'https://wa.me/' + fullNumber + '?text=' + encodeURIComponent(message);
            link.target = '_blank';
            link.textContent = fullNumber;
            links.appendChild(link);
            hasValidNumbers = true;
        } else {
            invalidNumbers.push(number);
        }
    }

    if (hasValidNumbers) {
        copyButton.style.display = 'block';
    } else {
        copyButton.style.display = 'none';
    }

    if (invalidNumbers.length > 0) {
        showAlert("Os seguintes números são inválidos: " + invalidNumbers.join(', '));
    }

    if (!hasValidNumbers && invalidNumbers.length === 0) {
        showAlert("Por favor, insira pelo menos um número válido com 9 dígitos.");
    }
}

function copyLinks() {
    var links = document.getElementById('links').getElementsByTagName('a');
    var textToCopy = Array.from(links).map(link => link.href).join('\n');

    var tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    showAlert("Links copiados para a área de transferência!");
}

function showAlert(message) {
    var modal = document.getElementById('alertModal');
    var modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'block';

    // Fecha o modal após 5 segundos
    setTimeout(closeAlertModal, 3000);
}

function closeAlertModal() {
    var modal = document.getElementById('alertModal');
    modal.style.display = 'none';
}

// Fecha o modal se o usuário clicar fora do conteúdo do modal
window.onclick = function(event) {
    var modal = document.getElementById('alertModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
