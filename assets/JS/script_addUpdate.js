'use sctrict';

function openNewMoodForm() {
  moodFormHTML();
  formScript();
}

async function openUpdateMoodForm(id) {
  const response = await fetch(`http://localhost:3000/mood/${id}`);
  const mood = await response.json();

  moodFormHTML(mood);
  formScript(mood);
}

function getMoodFromForm() {
  const mood_id = Number(document.getElementById('mood_idInput').value);
  const icon = document.getElementById('iconInput').value;
  const text = document.getElementById('textInput').value;

  const date = document.getElementById('dateInput').value;
  const time = document.getElementById('timeInput').value;

  const dateTime = `${date}T${time}`;

  const createdat = document.getElementById('createdatInput').value;

  return {
    mood_id,
    icon,
    text,
    dateTime,
    createdat,
  };
}

async function addMood() {
  const mood = getMoodFromForm();

  const response = await fetch('http://localhost:3000/mood/add', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(mood),
  });

  const message = await response.json();

  getTodayMoods(message);
}

async function updateMood(id) {
  const mood = getMoodFromForm();

  const response = await fetch(`http://localhost:3000/mood/update/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(mood),
  });

  const message = await response.json();

  getTodayMoods(message);
}
