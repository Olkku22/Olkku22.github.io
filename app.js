const menuListElement = document.getElementById('menu-list');
const maanantai = document.getElementById('1');
const tiistai = document.getElementById('2');
const keskiviikko = document.getElementById('3');
const torstai = document.getElementById('4');
const perjantai = document.getElementById('5');
const lauantai = document.getElementById('6');
const sunnuntai = document.getElementById('7');
const filterKeyword = 'Varusmiesruokalista ';

// Create separate arrays for each meal type
const aamiainenMenuItems = [];
const lounasMenuItems = [];
const paivallinenMenuItems = [];
const iltapalaMenuItems = [];

// Function to toggle visibility of specific meal items for each day
function toggleVisibility(dayElement, itemsToDisplay) {
  let html = ""; // Define the variable outside the loop

  for (const itemObj of itemsToDisplay) {
    const { items, index } = itemObj;
    if (index >= 0 && index < items.length) {
      const item = items[index];
      html += `<strong>${item.title}</strong><br>${item.description}<br><br>`;
    }
  }

  if (html !== "") {
    dayElement.innerHTML = html;
    dayElement.style.display = 'block'; // Show the element by setting display to 'block'
  } else {
    dayElement.innerHTML = 'No data available.';
    dayElement.style.display = 'none'; // Hide the element by setting display to 'none'
  }
}
function combineAndDisplayData(dayElement, dataArray) {
  let finalTitle = '';
  let finalDescription = '';

  dataArray.forEach((dataObj, i) => {
    const { items, index } = dataObj;
    const item = items[index] || null;

    if (item) {
      if (i === 0) {
        finalTitle = item.title;
        finalDescription = item.description;
      } else {
        finalDescription += `<br>${item.description}`;
      }
    }
  });

  if (finalTitle !== '') {
    dayElement.innerHTML = `<strong>${finalTitle}</strong><br>${finalDescription}`;
  } else {
    dayElement.innerHTML = 'No data available.';
  }
}



// Function to filter the description based on meal types
function filterDescription(description) {
  const aamiainenIndex = description.indexOf('Lounas:');
  const lounasIndex = description.indexOf('Päivällinen:');
  const iltapalaIndex = description.indexOf('Iltapala:');

  const aamiainenDescription = description.substring(0, aamiainenIndex).trim();
  const lounasDescription = description.substring(aamiainenIndex, lounasIndex).trim();
  const paivallinenDescription = description.substring(lounasIndex, iltapalaIndex).trim();
  const iltapalaDescription = description.substring(iltapalaIndex).trim();

  return { aamiainenDescription, lounasDescription, paivallinenDescription, iltapalaDescription };
}

fetch('http://localhost:3000/menu')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'application/xml');
    const items = xml.querySelectorAll('item');

    items.forEach((item, index) => {
      const title = item.querySelector('title').textContent;
      const description = item.querySelector('description').textContent;

      if (title.toLowerCase().includes(filterKeyword.toLowerCase())) {
        // Filter the description based on meal types
        const { aamiainenDescription, lounasDescription, paivallinenDescription, iltapalaDescription } = filterDescription(description);

        if (aamiainenDescription.trim() !== "") {
          aamiainenMenuItems.push({ title, description: aamiainenDescription });
        }
        if (lounasDescription.trim() !== "") {
          lounasMenuItems.push({ title, description: lounasDescription });
        }
        if (paivallinenDescription.trim() !== "") {
          paivallinenMenuItems.push({ title, description: paivallinenDescription });
        }
        if (iltapalaDescription.trim() !== "") {
          iltapalaMenuItems.push({ title, description: iltapalaDescription });
        }
      }

      const li = document.createElement('li');
      li.innerHTML = `<strong>${title}</strong><br>${description}`;
      menuListElement.appendChild(li);
    });

    // Show all meals for each day on default

combineAndDisplayData(maanantai, [
  { items: aamiainenMenuItems, index: 0 },
  { items: lounasMenuItems, index: 0 },
  { items: paivallinenMenuItems, index: 0 },
  { items: iltapalaMenuItems, index: 0 }
]);
    
combineAndDisplayData(tiistai, [
  { items: aamiainenMenuItems, index: 1 },
  { items: lounasMenuItems, index: 1 },
  {items: paivallinenMenuItems, index:1},
  {items: iltapalaMenuItems, index:1}
]);
combineAndDisplayData(keskiviikko, [
  { items: aamiainenMenuItems, index: 2 },
  { items: lounasMenuItems, index: 2 },
  {items: paivallinenMenuItems, index:2},
  {items: iltapalaMenuItems, index:2}
]);
combineAndDisplayData(torstai, [
  { items: aamiainenMenuItems, index: 3 },
  { items: lounasMenuItems, index: 3 },
  {items: paivallinenMenuItems, index:3},
  {items: iltapalaMenuItems, index:3}
]);
combineAndDisplayData(perjantai, [
  { items: aamiainenMenuItems, index: 4 },
  { items: lounasMenuItems, index: 4 },
  {items: paivallinenMenuItems, index:4},
  {items: iltapalaMenuItems, index:4}
]);
combineAndDisplayData(lauantai, [
  { items: aamiainenMenuItems, index: 5 },
  { items: lounasMenuItems, index: 5 },
  {items: paivallinenMenuItems, index:5},
  {items: iltapalaMenuItems, index:5}
]);
combineAndDisplayData(sunnuntai, [

  { items: lounasMenuItems, index: 6 },
  {items: paivallinenMenuItems, index:6},
  {items: iltapalaMenuItems, index:6}
]);


    console.log('aamiainen', aamiainenMenuItems);
    console.log('lounas', lounasMenuItems);
    console.log('päivällinen', paivallinenMenuItems);
    console.log('iltapala', iltapalaMenuItems);
    console.log('kontsa', contentArrays);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to handle button clicks and show specific meals for each day
const aamiainenButton = document.getElementsByClassName('aamiainen-button')[0];
const lounasButton = document.getElementsByClassName('lounas-button')[0];
const paivallinenButton = document.getElementsByClassName('paivallinen-button')[0];
const iltapalaButton = document.getElementsByClassName('iltapala-button')[0];
const kaikkiButton = document.getElementsByClassName('kaikki-button') [0];

kaikkiButton.addEventListener('click',() =>{
  combineAndDisplayData(maanantai, [
    { items: aamiainenMenuItems, index: 0 },
    { items: lounasMenuItems, index: 0 },
    { items: paivallinenMenuItems, index: 0 },
    { items: iltapalaMenuItems, index: 0 }
  ]);
      
  combineAndDisplayData(tiistai, [
    { items: aamiainenMenuItems, index: 1 },
    { items: lounasMenuItems, index: 1 },
    {items: paivallinenMenuItems, index:1},
    {items: iltapalaMenuItems, index:1}
  ]);
  combineAndDisplayData(keskiviikko, [
    { items: aamiainenMenuItems, index: 2 },
    { items: lounasMenuItems, index: 2 },
    {items: paivallinenMenuItems, index:2},
    {items: iltapalaMenuItems, index:2}
  ]);
  combineAndDisplayData(torstai, [
    { items: aamiainenMenuItems, index: 3 },
    { items: lounasMenuItems, index: 3 },
    {items: paivallinenMenuItems, index:3},
    {items: iltapalaMenuItems, index:3}
  ]);
  combineAndDisplayData(perjantai, [
    { items: aamiainenMenuItems, index: 4 },
    { items: lounasMenuItems, index: 4 },
    {items: paivallinenMenuItems, index:4},
    {items: iltapalaMenuItems, index:4}
  ]);
  combineAndDisplayData(lauantai, [
    { items: aamiainenMenuItems, index: 5 },
    { items: lounasMenuItems, index: 5 },
    {items: paivallinenMenuItems, index:5},
    {items: iltapalaMenuItems, index:5}
  ]);
  combineAndDisplayData(sunnuntai, [
  
    { items: lounasMenuItems, index: 6 },
    {items: paivallinenMenuItems, index:6},
    {items: iltapalaMenuItems, index:6}
  ]);
})
aamiainenButton.addEventListener('click', () => {
  toggleVisibility(maanantai, [
    { items: aamiainenMenuItems, index: 0}
  ]);
  toggleVisibility(tiistai, [
    { items: aamiainenMenuItems, index: 1}
  ]);
  toggleVisibility(keskiviikko, [
    { items: aamiainenMenuItems, index: 2}
  ]);
  toggleVisibility(torstai, [
    { items: aamiainenMenuItems, index: 3}
  ]);
  toggleVisibility(perjantai, [
    { items: aamiainenMenuItems, index: 4}
  ]);
  toggleVisibility(lauantai, [
    { items: aamiainenMenuItems, index: 5}
  ]);
  toggleVisibility(sunnuntai, [
    { items: aamiainenMenuItems, index: 6}
  ]);
});

lounasButton.addEventListener('click', () => {
  toggleVisibility(maanantai, [
    { items: lounasMenuItems, index: 0}
  ]);
  toggleVisibility(tiistai, [
    { items: lounasMenuItems, index: 1}
  ]);
  toggleVisibility(keskiviikko, [
    { items: lounasMenuItems, index: 2}
  ]);
  toggleVisibility(torstai, [
    { items: lounasMenuItems, index: 3}
  ]);
  toggleVisibility(perjantai, [
    { items: lounasMenuItems, index: 4}
  ]);
  toggleVisibility(lauantai, [
    { items: lounasMenuItems, index: 5}
  ]);
  toggleVisibility(sunnuntai, [
    { items: lounasMenuItems, index: 6}
  ]);
});


paivallinenButton.addEventListener('click', () => {
  toggleVisibility(maanantai, [
    { items: paivallinenMenuItems, index: 0}
  ]);
  toggleVisibility(tiistai, [
    { items: paivallinenMenuItems, index: 1}
  ]);
  toggleVisibility(keskiviikko, [
    { items: paivallinenMenuItems, index: 2}
  ]);
  toggleVisibility(torstai, [
    { items: paivallinenMenuItems, index: 3}
  ]);
  toggleVisibility(perjantai, [
    { items: paivallinenMenuItems, index: 4}
  ]);
  toggleVisibility(lauantai, [
    { items: paivallinenMenuItems, index: 5}
  ]);
  toggleVisibility(sunnuntai, [
    { items: paivallinenMenuItems, index: 6}
  ]);
});

iltapalaButton.addEventListener('click', () => {
  toggleVisibility(maanantai, [
    { items: iltapalaMenuItems, index: 0}
  ]);
  toggleVisibility(tiistai, [
    { items: iltapalaMenuItems, index: 1}
  ]);
  toggleVisibility(keskiviikko, [
    { items: iltapalaMenuItems, index: 2}
  ]);
  toggleVisibility(torstai, [
    { items: iltapalaMenuItems, index: 3}
  ]);
  toggleVisibility(perjantai, [
    { items: iltapalaMenuItems, index: 4}
  ]);
  toggleVisibility(lauantai, [
    { items: iltapalaMenuItems, index: 5}
  ]);
  toggleVisibility(sunnuntai, [
    { items: iltapalaMenuItems, index: 6}
  ]);
});
