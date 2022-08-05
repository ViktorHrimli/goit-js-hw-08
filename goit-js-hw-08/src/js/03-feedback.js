import * as _ from 'lodash.throttle';
//

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input[name="email"]'),
  textArea: document.querySelector('textarea'),
};

const FEADBACKFORM = 'feedback-form-state';

outputUpdate();
function outputUpdate() {
  const outputFormText = readInputForm();
  const { email, massage } = outputFormText;
  refs.textArea.value = massage || '';
  refs.input.value = email || '';
}

function hendelClickSubmit(ev) {
  ev.preventDefault();
  console.log(readInputForm());

  refs.textArea.value = '';
  refs.input.value = '';
}

function handleFormInput() {
  saveInputForm({ email: refs.input.value, massage: refs.textArea.value });
}

function saveInputForm(input) {
  localStorage.setItem(FEADBACKFORM, JSON.stringify(input));
}

function readInputForm() {
  let formText = {};

  try {
    formText = JSON.parse(localStorage.getItem(FEADBACKFORM));
  } catch (error) {
    console.log(error);
  }

  return formText || {};
}

// listener
refs.form.addEventListener('submit', hendelClickSubmit);
refs.form.addEventListener('input', _(handleFormInput, 500));
