export const validateForm = (name, password, enterCaptcha, captcha) => {
  const usernameRegex = /^[A-Za-z]+$/;
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (!usernameRegex.test(name)) {
    return "Username must contain only alphabets.";
  }

  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters long and include at least one special symbol.";
  }

  if (enterCaptcha !== captcha) {
    return "Captcha does not match. Please try again.";
  }

  return null;
};
