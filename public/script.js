console.log("script");
const urlFormEl = document.getElementById('url-form');

urlFormEl.addEventListener('submit', function (event) {
    if (!urlFormEl.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    urlFormEl.classList.add('was-validated');
  }, false)

//   if (document.getElementById('myModal')) {
//     var myModal = new bootstrap.Modal(document.getElementById('myModal'));
//     myModal.show();
// }


// ---------  PRICING

function submitPricing() {
    
}

// ---------  SAVE PDF  

function savePDF() {
    console.log("save");
}