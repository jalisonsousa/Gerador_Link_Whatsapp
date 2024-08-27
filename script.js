function formatNumbers() {
  var numbers = document.getElementById('numbers').value.split('\n');
  var links = document.getElementById('links');
  var message = document.getElementById('message').value.trim();
  var copyButton = document.getElementById('copyButton');
  links.innerHTML = '';

  var hasValidNumbers = false;
  var invalidNumbers = [];

  // Dividindo os números em lotes de 25 para processamento incremental
  var batchSize = 25;
  var batches = [];
  for (var i = 0; i < numbers.length; i += batchSize) {
    batches.push(numbers.slice(i, i + batchSize));
  }

  // Função para processar cada lote de números
  function processBatch(batch) {
    for (var i = 0; i < batch.length; i++) {
      var number = batch[i].trim().replace(/-/g, '');

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
  }

  // Processa cada lote de números
  for (var j = 0; j < batches.length; j++) {
    processBatch(batches[j]);
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
  var linksArray = Array.from(links).map(link => link.href);
  var textToCopy = '';

  for (var i = 0; i < linksArray.length; i++) {
    textToCopy += linksArray[i] + '\n\n';

    // Adiciona uma linha de divisão a cada 12 links
    if ((i + 1) % 12 === 0 && (i + 1) !== linksArray.length) {
      textToCopy += '-----------------\n\n';
    }
  }

  var tempTextArea = document.createElement('textarea');
  tempTextArea.value = textToCopy;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);

  showAlert("Todos os links copiados para a área de transferência!, separado por lote de 12 ");
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
window.onclick = function (event) {
  var modal = document.getElementById('alertModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
