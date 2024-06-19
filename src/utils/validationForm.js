function Validator(option) {
  const formElement = document.getElementById(option.form);
  function validate(inputElement, rulle) {
    var errorMessage = rulle.test(inputElement.value);
    var errorElement =
      inputElement.parentElement.querySelector(".form-message");
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      errorElement.style.color = "red";
      inputElement.style.borderColor = "red";
    } else {
      errorElement.innerText = " ";
      inputElement.style.borderColor = "green";
    }
    return errorMessage;
  }

  if (formElement) {
    formElement.onsubmit = function (e) {
      e.preventDefault();
      var isError = true;
      option.rulles.forEach(function (rulle) {
        var inputElement = formElement.querySelector(rulle.selection);
        var isVlaid = validate(inputElement, rulle);
        if (isVlaid) {
          // console.log(isVlaid);
          isError = false;
        }
      });
      if (isError) {
        console.log(isError);
        var data = {
          fullname: document.querySelector("#fullname").value,
          Email: document.querySelector("#email").value,
          Password: document.querySelector("#password").value,
          Password_confirmation: document.querySelector(
            "#password_confirmation"
          ).value,
        };
        console.log(data);
      } else {
      }
    };
    option.rulles.forEach(function (rulle) {
      var inputElement = formElement.querySelector(rulle.selection);
      if (inputElement) {
        inputElement.onblur = function () {
          // console.log(inputElement);
          validate(inputElement, rulle);
        };
      }
    });
  }
}
Validator.isRequỉed = function (selection) {
  return {
    selection: selection,
    test: function (value) {
      if (value) {
        return undefined;
      } else {
        return "Vui lòng nhập trường này";
      }
    },
  };
};
Validator.isEmail = function (selection) {
  return {
    selection: selection,
    test: function (value) {
      var regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (regex.test(value)) {
        return undefined;
      } else {
        return "Trường này nhập Email";
      }
    },
  };
};
Validator.minLenght = function (selection, min) {
  return {
    selection: selection,
    test: function (value) {
      if (value.length >= min) {
        return undefined;
      } else {
        return `Vui lòng nhập ${min} ký tự`;
      }
    },
  };
};
Validator.isConfirmed = function (selection, getConfirmValue) {
  return {
    selection: selection,
    test: function (value) {
      if (value === getConfirmValue()) {
        return undefined;
      } else {
        return "Mật khẩu không trùng nhau";
      }
    },
  };
};
Validator({
  form: "form-register",
  rulles: [
    Validator.isRequỉed("#fullname"),
    Validator.isEmail("#email"),
    Validator.minLenght("#password", 6),
    Validator.isConfirmed("#password_confirmation", function () {
      return document.querySelector("#password").value;
    }),
  ],
});
