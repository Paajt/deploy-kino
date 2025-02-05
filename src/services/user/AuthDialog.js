export default class AuthDialog {
  constructor() {}

  render() {
    this.dialog = document.createElement('dialog');
    this.dialog.className = 'auth-dialog';

    const guestSubmit = document.createElement('span');
    guestSubmit.className = 'auth-guest';
    guestSubmit.innerHTML = 'Submit as a guest';

    const hint = document.createElement('span');
    hint.className = 'hint';
    hint.innerHTML = 'The default password is: default';

    const form = document.createElement('form');
    form.method = 'dialog';
    form.className = 'auth-form';

    const usernameDiv = document.createElement('div');
    usernameDiv.className = 'input-group';
    const usernameLabel = document.createElement('label');
    usernameLabel.className = 'auth-label';
    usernameLabel.htmlFor = 'username';
    usernameLabel.textContent = 'Username:';
    const usernameInput = document.createElement('input');
    usernameInput.className = 'auth-input';
    usernameInput.type = 'text';
    usernameInput.id = 'username';

    const passwordDiv = document.createElement('div');
    passwordDiv.className = 'input-group';
    const passwordLabel = document.createElement('label');
    passwordLabel.className = 'auth-label';
    passwordLabel.htmlFor = 'password';
    passwordLabel.textContent = 'Password:';
    const passwordInput = document.createElement('input');
    passwordInput.className = 'auth-input';
    passwordInput.type = 'password';
    passwordInput.id = 'password';

    const submitButton = document.createElement('button');
    submitButton.className = 'submit-button';
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';

    usernameDiv.append(usernameLabel, usernameInput);
    passwordDiv.append(passwordLabel, passwordInput);
    form.append(usernameDiv, passwordDiv, submitButton, hint, guestSubmit);
    this.dialog.append(form);

    return this.dialog;
  }
}
