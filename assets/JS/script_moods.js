'use strict';

window.addEventListener('load', getTodayMoods());

function getTodayMoods(message) {
  getMoods('today', message);
}

function getAllMoods() {
  getMoods('all');
}

// 📌❗ function showSingleMood usage:
// CONTAINER.innerHTML = showSingleMood(mood);

function showSingleMood(mood) {
  return `
  <article class="updateDestroy moodContainer mood_${mood.mood_id}">

    <div class="icon moodIcon">
      ${mood.icon}
    </div>

    <div class="moodTimestamp">
      <span class="date">
          ${mood.formattedDateBody}
      </span> @ <span class="time">
          ${mood.formattedTime}
      </span>
    </div>

    <div class="moodText">
      ${mood.text}
    </div>

  </article>
  `;
}

// 📌 timerange: all OR today

async function getMoods(timerange, message) {
  const response = await fetch(`http://localhost:3000/mood/${timerange}`);
  const moods = await response.json();

  if (message) {
    const messageContainer = document.getElementById('messageContainer');

    messageContainer.innerHTML = `
    <section id="message">
      <span class="icon" id="messageIcon">${message.icon}</span>
      <span id="messageText">${message.message}</span>
    </section>
    `;
  }

  pageTitle.innerHTML = `<h2>mood/<span>${timerange.toUpperCase()}</span></h2>`;

  contentA.innerHTML = '<section id="moods"></section>';

  if (moods.length !== 0) {
    moods.forEach((mood, index) => {
      const sectionMoods = document.getElementById('moods');

      if (index === 0 || mood.formattedDateBody !== moods[index - 1].formattedDateBody) {
        sectionMoods.insertAdjacentHTML(
          'beforeend',
          `<h3 class="titleDate"> ${mood.formattedDateTitle} </h3>`,
        );
      }

      sectionMoods.insertAdjacentHTML(
        'beforeend',
        `
        <article class="moodContainer mood_${mood.mood_id} ">

            <div class="icon moodIcon">
                ${mood.icon}
            </div>

            <div class="moodTimestamp">
                <span class="date"> ${mood.formattedDateBody} </span> @ <span class="time"> ${mood.formattedTime} </span>
            </div>

            <div class="moodOptions">
                <div class="icon updateIcon updateDeleteIcon"><a onclick="openUpdateMoodForm('${mood._id}')"></a></div>
                <div class="icon deleteIcon updateDeleteIcon"><a onclick="confirmDeletion('${mood._id}')"></a></div>
            </div>

            <div class="moodText">
                ${mood.text}
            </div>

        </article>
      `,
      );
    });
    const moodOptions = document.getElementsByClassName('moodOptions');
    const moodContainer = document.getElementsByClassName('moodContainer');

    for (let i = 0; i < moodContainer.length; i++) {
      moodContainer[i].addEventListener('mouseenter', () => {
        moodOptions[i].setAttribute('class', 'moodOptions visible');
      });
    }

    for (let i = 0; i < moodContainer.length; i++) {
      moodContainer[i].addEventListener('mouseleave', () => {
        moodOptions[i].setAttribute('class', 'moodOptions');
      });
    }
  } else {
    document.getElementById('moods').insertAdjacentHTML(
      'beforeend',
      `
    <h2>no<strong>MOOD</strong></h2>
  
    <p>looks like you've been a lazy little piece of shit and didn't log any moods, huh?</p>
  
    <div id="noMoodBtns">
  
      <span id="addBtn"><a onclick="openNewMoodForm()">new<strong>MOOD</strong><span class="icon btnIcon" id="addIcon"></span></a></span>
  
    </div>
    `,
    );
  }

  containerB.innerHTML = '';
}
