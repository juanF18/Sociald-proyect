function showMessage(message) {
  document.querySelector("#textMessage").innerHTML = message;
  let elem = document.querySelector("#messageModal");
  let instances = M.Modal.init(elem, {});
  instances.open();
}

function showRemoveConfirmation() {
  let elem = document.querySelector("#removeCofirmation");
  let instances = M.Modal.init(elem, {});
  instances.open();
}
function showRemoveImgConfirmation() {
  let elem = document.querySelector("#removeImgCofirmation");
  let instances = M.Modal.init(elem, {});
  instances.open();
}

function closeModal(idModal){
  let elem = document.querySelector("#"+idModal);
  let instances = M.Modal.init(elem, {
    dismissible: false
  });
}

function showUploadModal() {
  let elem = document.querySelector("#uploadModal");
  let instances = M.Modal.init(elem, {
    dismissible: false
  });
  instances.open();
}