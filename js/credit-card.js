class CreditCardForm {
  constructor() {
    this.isMobileDevice = /Mobi/.test(navigator.userAgent);
    this.cardHolderName = document.getElementById("cardholderName");
    this.cardHolderSpan = document.getElementById("card-name-front");

    this.cardNumberInput = document.getElementById("cardNumber");
    this.cardNumberSpan = document.getElementById("number-card-front");

    this.cardMonthInput = document.getElementById("month");
    this.cardYearInput = document.getElementById("year");

    this.cardMonthSpan = document.getElementById("month-span");
    this.cardYearSpan = document.getElementById("year-span");

    this.cvcInput = document.getElementById("cvc");

    this.cvcSpan = document.getElementById("cvc-span");

    this.form = document.getElementById("credit-card-form");
    this.submitButton = document.getElementById("submit-button");

    this.validateDiv = document.getElementById("validate");
    this.continueButton = document.getElementById("continue-button");

    if (this.isMobileDevice) {
      this.cardNumberInput.addEventListener(
        "keyup",
        this.handleCardNumberInput.bind(this)
      );
      this.cardMonthInput.addEventListener(
        "keyup",
        this.handleCardMonthInput.bind(this)
      );
      this.cardYearInput.addEventListener(
        "keyup",
        this.handleCardYearInput.bind(this)
      );
      this.cvcInput.addEventListener(
        "keyup",
        this.handleCardCvcInput.bind(this)
      );
    } else {
      this.cardNumberInput.addEventListener(
        "keydown",
        this.handleCardNumberInput.bind(this)
      );
      this.cardMonthInput.addEventListener(
        "keydown",
        this.handleCardMonthInput.bind(this)
      );
      this.cardYearInput.addEventListener(
        "keydown",
        this.handleCardYearInput.bind(this)
      );
      this.cvcInput.addEventListener(
        "keydown",
        this.handleCardCvcInput.bind(this)
      );
    }
    this.cardHolderName.addEventListener(
      "input",
      this.handleCardNameInput.bind(this)
    );

    this.submitButton.addEventListener("click", (event) => {
      if (!this.validateForm()) {
        event.preventDefault();
      } else {
        this.validateDiv.classList.add("show");
        this.form.classList.add("hidde");
        event.preventDefault();
      }
    });

    this.continueButton.addEventListener("click", (event) => {
      this.validateDiv.classList.remove("show");
      this.form.classList.remove("hidde");
      this.resetForm();
      event.preventDefault();
    });
  }

  showErrorMessage(errorId, errorMessage) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = errorMessage;
    errorElement.style.display = "block";
  }

  hideErrorMessage(errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  handleCardNameInput(event) {
    const cardNameValue = event.target.value;
    this.cardHolderName.value = cardNameValue;
    this.cardHolderSpan.textContent = cardNameValue;
    if (cardNameValue.trim() === "") {
      this.cardHolderSpan.textContent = "Cardholder Name";
    }
  }

  handleCardNumberInput(event) {
    const currentValue = this.cardNumberInput.value;
    const keyCode = event.keyCode || event.which;

    if (keyCode >= 48 && keyCode <= 57) {
      const newValue = currentValue + String.fromCharCode(keyCode);
      const numericValue = newValue.replace(/\D/g, "");
      const formattedValue = numericValue.replace(/(\d{4})/g, "$1 ").trim();
      if (formattedValue.length <= 19) {
        this.cardNumberInput.value = formattedValue;
        this.cardNumberSpan.textContent = formattedValue;
        event.preventDefault();
      } else {
        event.preventDefault();
      }
    } else if (keyCode === 8) {
      const numericValue = currentValue.replace(/\D/g, "");
      const formattedValue = numericValue.replace(/(\d{4})/g, "$1 ").trim();
      this.cardNumberInput.value = formattedValue;
      this.cardNumberSpan.textContent = this.cardNumberInput.value.slice(0, -1);
    } else {
      event.preventDefault();
    }
  }

  handleCardMonthInput(event) {
    const currentValue = this.cardMonthInput.value;
    const keyCode = event.keyCode || event.which;

    if (keyCode >= 48 && keyCode <= 57) {
      const newValue = currentValue + String.fromCharCode(keyCode);
      const numericValue = newValue.replace(/\D/g, "");
      if (newValue.length <= 2) {
        this.cardMonthInput.value = numericValue;
        this.cardMonthSpan.textContent = numericValue;
        event.preventDefault();
      } else {
        event.preventDefault();
      }
    } else if (keyCode === 8) {
      const numericValue = currentValue.replace(/\D/g, "");
      this.cardMonthInput.value = numericValue;
      this.cardMonthSpan.textContent = this.cardMonthInput.value.slice(0, -1);
    } else {
      event.preventDefault();
    }
  }

  handleCardYearInput(event) {
    const currentValue = this.cardYearInput.value;
    const keyCode = event.keyCode || event.which;

    if (keyCode >= 48 && keyCode <= 57) {
      const newValue = currentValue + String.fromCharCode(keyCode);
      const numericValue = newValue.replace(/\D/g, "");
      if (newValue.length <= 2) {
        this.cardYearInput.value = numericValue;
        this.cardYearSpan.textContent = numericValue;
        event.preventDefault();
      } else {
        event.preventDefault();
      }
    } else if (keyCode === 8) {
      const numericValue = currentValue.replace(/\D/g, "");
      this.cardYearInput.value = numericValue;
      this.cardYearSpan.textContent = this.cardYearInput.value.slice(0, -1);
    } else {
      event.preventDefault();
    }
  }

  handleCardCvcInput(event) {
    const currentValue = this.cvcInput.value;
    const keyCode = event.keyCode || event.which;

    if (keyCode >= 48 && keyCode <= 57) {
      const newValue = currentValue + String.fromCharCode(keyCode);
      const numericValue = newValue.replace(/\D/g, "");
      if (newValue.length <= 3) {
        this.cvcInput.value = numericValue;
        this.cvcSpan.textContent = numericValue;
        event.preventDefault();
      } else {
        event.preventDefault();
      }
    } else if (keyCode === 8) {
      const numericValue = currentValue.replace(/\D/g, "");
      this.cvcInput.value = numericValue;
      this.cvcSpan.textContent = this.cvcInput.value.slice(0, -1);
    } else {
      event.preventDefault();
    }
  }

  validateForm() {
    let isValid = true;

    if (this.cardHolderName.value.trim() === "") {
      this.showErrorMessage(
        "card-holder-name-error",
        "Card holder name is required."
      );
      this.cardHolderName.classList.add("error-message");
      isValid = false;
    } else {
      this.hideErrorMessage("card-holder-name-error");
      this.cardHolderName.classList.remove("error-message");
    }

    if (this.cardNumberInput.value.replace(/\D/g, "").length !== 16) {
      this.showErrorMessage(
        "card-number-error",
        "Card number must have 19 digits."
      );
      this.cardNumberInput.classList.add("error-message");
      isValid = false;
    } else {
      this.hideErrorMessage("card-number-error");
      this.cardNumberInput.classList.remove("error-message");
    }

    if (this.cardMonthInput.value.length !== 2) {
      this.showErrorMessage("card-month-error", "Month must have 2 digits.");
      this.cardMonthInput.classList.add("error-message");
      isValid = false;
    } else {
      this.hideErrorMessage("card-month-error");
      this.cardMonthInput.classList.remove("error-message");
    }

    if (this.cardYearInput.value.length !== 2) {
      this.showErrorMessage("card-year-error", "Year must have 2 digits.");
      this.cardYearInput.classList.add("error-message");
      isValid = false;
    } else {
      this.hideErrorMessage("card-year-error");
      this.cardYearInput.classList.remove("error-message");
    }

    if (this.cvcInput.value.length !== 3) {
      this.showErrorMessage("cvc-error", "CVC must have 3 digits.");
      this.cvcInput.classList.add("error-message");
      isValid = false;
    } else {
      this.hideErrorMessage("cvc-error");
      this.cvcInput.classList.remove("error-message");
    }

    return isValid;
  }

  resetForm() {
    this.cardHolderName.value = "";
    this.cardHolderSpan.textContent = "Cardholder Name";
    this.cardNumberInput.value = "";
    this.cardNumberSpan.textContent = "0000 0000 0000 0000";
    this.cardMonthInput.value = "";
    this.cardMonthSpan.textContent = "00";
    this.cardYearInput.value = "";
    this.cardYearSpan.textContent = "00";
    this.cvcInput.value = "";
    this.cvcSpan.textContent = "000";
  }
}

const creditCardForm = new CreditCardForm();
