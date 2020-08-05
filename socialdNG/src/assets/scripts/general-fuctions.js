function showMessage(message) {
    document.querySelector("#textMessage").innerHTML = message;
    let elem = document.querySelector("#messageModal");
    let instances = M.Modal.init(elem, {});
    instances.open();
  }
