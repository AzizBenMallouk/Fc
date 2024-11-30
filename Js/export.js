document.getElementById('fetchQRButton').addEventListener('click', function () {
    fetch('http://localhost:3000/qr-code')
      .then(response => response.text())
      .then(data => {
        console.log(data);
        document.getElementById('qrCodeDisplay').innerHTML = `<img src="${data}" alt="QR Code" />`;
      })
      .catch(error => {
        console.error('Error fetching QR Code:', error);
      });
});


  document.getElementById('convertButton').addEventListener('click', function () {
    html2canvas(document.getElementById('builder')).then(function (canvas) {
      const imageData = canvas.toDataURL('image/png');
      const formData = new FormData();

      fetch(imageData)
        .then(res => res.blob())
        .then(blob => {
          formData.append('image', blob, 'screenshot.png');

          fetch('http://localhost:3000/upload-image', {
            method: 'POST',
            body: formData
          })
            .then(response => response.json())
            .then(data => {
              console.log("data : ", data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        });
    });
});