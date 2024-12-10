import Swal from 'sweetalert2';


class Utils {
  static showElement(element) {
    element.style.display = 'block';
    element.hidden = false;
  }

  static hideElement(element) {
    element.style.display = 'none';
    element.hidden = true;
  }

  static emptyElement(element) {
    element.innerHTML = '';
  }

  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }

  static showLoading() {
    Swal.fire({
      background: 'none',
      showConfirmButton: false,
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }

  static hideLoading() {
    setTimeout(() => {
      Swal.fire({
        background: 'none',
        showConfirmButton: false,
        timer: 1,
      });
    }, 500);
  }

  static showError(errorName, errorMessage) {
    Swal.fire({
      title: errorName,
      text: errorMessage,
      icon: 'warning',
    });
  }
}

export default Utils;
