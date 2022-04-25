'use strict';

// 📌 build form HTML

function moodFormHTML(mood) {
  let formContainer;

  if (!mood) {
    pageTitle.innerHTML = `<h2>mood/<span>NEW</span></h2>`;
    formContainer = contentA;
  } else {
    pageTitle.innerHTML = `<h2>mood/<span>UPDATE</span></h2>`;
    formContainer = containerB;
  }

  formContainer.innerHTML = `
  <section class="form" id="moodForm">

    <div id="moodChoice">

        <input type="hidden" name="mood_id" id="mood_idInput" class="input">

        <span class="label">mood *</span>

        <div class="icon moodIcon default mood_1" id="1"></div>
        <div class="icon moodIcon default mood_2" id="2"></div>
        <div class="icon moodIcon default mood_3" id="3"></div>
        <div class="icon moodIcon default mood_4" id="4"></div>
        <div class="icon moodIcon default mood_5" id="5"></div>
        <div class="icon moodIcon default mood_6" id="6"></div>
        <div class="icon moodIcon default mood_0" id="0"></div>

    </div>

    <div id="dateTime">

        <span class="label" id="dateTimeLabel">date/time *</span>

        <input type="date" name="date" id="dateInput" class="dateTimeInput input" required>
        <input type="time" step="1" name="time" id="timeInput" class="dateTimeInput input" required>

    </div>

    <div id="iconChoice">

        <input type="hidden" name="icon" id="iconInput" class="input">

        <span class="label">icon</span>

        <div id="iconWrapper"></div>

    </div>

    <div id="textChoice">

        <span class="label">text</span>

        <input type="text" name="text" id="textInput" class="input"
                        placeholder="optional! type to add. this is example text...">

    </div>

    <input type="hidden" name="createdat" id="createdatInput" class="input">

  </section>
  `;

  const moodForm = document.getElementById('moodForm');

  if (!mood) {
    moodForm.insertAdjacentHTML(
      'beforeend',
      `
      <button id="moodFormBtn" onclick="addMood()" disabled>
        add<strong>Mood</strong>
        <span class="icon" id="btnIcon"></span>
      </button>
      `,
    );
  } else {
    moodForm.insertAdjacentHTML(
      'beforeend',
      `
      <button id="moodFormBtn" onclick="updateMood(${mood.id})" enabled>
        update<strong>Mood</strong>
        <span class="icon" id="btnIcon"></span>
      </button>
        `,
    );

    contentA.innerHTML = showSingleMood(mood);
  }
}

//📌 form script

function formScript(mood) {
  const iconList = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  const iconWrapper = document.getElementById('iconWrapper');

  for (let icon of iconList) {
    iconWrapper.insertAdjacentHTML('beforeend', `<div class="icon moodIcon custom">${icon}</div>`);
  }

  const mood_idInput = document.getElementById('mood_idInput');
  const iconInput = document.getElementById('iconInput');

  const button = document.getElementById('moodFormBtn');
  const btnIcon = document.getElementById('btnIcon');

  const defaultIconList = document.getElementsByClassName('moodIcon default');

  for (let moodIcon of defaultIconList) {
    moodIcon.addEventListener('click', () => {
      mood_idInput.value = moodIcon.id;
      iconInput.value = moodIcon.innerText;

      button.disabled = false;
      button.setAttribute('class', `mood_${moodIcon.id} btnEnabled`);
      btnIcon.innerText = moodIcon.innerText;
    });
  }

  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const createdatInput = document.getElementById('createdatInput');

  // 📌 NEW mood

  if (!mood) {
    const today = new Date();

    const year = today.getFullYear().toString().padStart(4, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    const date = `${year}-${month}-${day}`;

    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const seconds = today.getSeconds().toString().padStart(2, '0');

    const time = `${hours}:${minutes}:${seconds}`;

    createdatInput.value = year + month + day + hours + minutes + seconds;

    dateInput.value = date;
    timeInput.value = time;

    // 📌 UPDATE mood
  } else {
    const textInput = document.getElementById('textInput');

    mood_idInput.value = mood.mood_id;
    iconInput.value = mood.icon;
    dateInput.value = mood.dateTime.slice(0, 10);
    timeInput.value = mood.dateTime.slice(11);
    textInput.value = mood.text;
    createdatInput.value = mood.createdat;

    button.disabled = false;
    button.setAttribute('class', `mood_${mood.mood_id} btnEnabled`);
    btnIcon.innerText = iconInput.value;
  }

  dateInput.addEventListener('input', (e) => {
    timeInput.value = '00:00:00';
  });

  const customIconList = document.getElementsByClassName('moodIcon custom');

  for (let customIcon of customIconList) {
    customIcon.addEventListener('click', () => {
      iconInput.value = customIcon.innerText;
      btnIcon.innerText = customIcon.innerText;
    });
  }
}
