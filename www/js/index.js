document.addEventListener('DOMContentLoaded', function () {
    const addEventButton = document.getElementById('add-event-button');
    const backHomeButton = document.getElementById('back-home-button');
    const backHomeFromDetailsButton = document.getElementById('back-home-from-details-button');
    const backHomeFromSettingsButton = document.getElementById('back-home-from-settings-button');
    const saveEventButton = document.getElementById('save-event-button');
    const addEventScreen = document.getElementById('add-event-screen');
    const homeScreen = document.getElementById('home-screen');
    const eventDetailsScreen = document.getElementById('event-details-screen');
    const settingsScreen = document.getElementById('settings-screen');
    const eventForm = document.getElementById('event-form');
    const eventsList = document.getElementById('events-list');
    const eventNameDetail = document.getElementById('event-name-detail');
    const countdownTimer = document.getElementById('countdown-timer');
    const eventDateDetail = document.getElementById('event-date-detail');
    const eventNotesDetail = document.getElementById('event-notes-detail');
    const deleteEventButton = document.getElementById('delete-event-button');
    const sendNotificationsCheckbox = document.getElementById('send-notifications');
    const dateFormatSelect = document.getElementById('date-format');

    let events = [];

    addEventButton.addEventListener('click', function () {
        showScreen(addEventScreen);
    });

    backHomeButton.addEventListener('click', function () {
        showScreen(homeScreen);
    });

    backHomeFromDetailsButton.addEventListener('click', function () {
        showScreen(homeScreen);
    });

    backHomeFromSettingsButton.addEventListener('click', function () {
        showScreen(homeScreen);
    });

    saveEventButton.addEventListener('click', function () {
        const eventName = document.getElementById('event-name').value;
        const eventDate = document.getElementById('event-date').value;
        const eventTime = document.getElementById('event-time').value;
        const eventNotes = document.getElementById('event-notes').value;

        const eventDateTime = new Date(`${eventDate}T${eventTime}`);
        events.push({ name: eventName, dateTime: eventDateTime, notes: eventNotes });
        renderEvents();
        showScreen(homeScreen);
    });

    function renderEvents() {
        eventsList.innerHTML = '';
        events.forEach((event, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${event.name} - ${event.dateTime.toLocaleDateString()} ${event.dateTime.toLocaleTimeString()}`;
            li.addEventListener('click', function () {
                showEventDetails(index);
            });
            eventsList.appendChild(li);
        });
    }

    function showEventDetails(index) {
        const event = events[index];
        eventNameDetail.textContent = event.name;
        eventDateDetail.textContent = `Countdown for: ${event.dateTime.toLocaleDateString()} ${event.dateTime.toLocaleTimeString()}`;
        eventNotesDetail.textContent = event.notes || '';
        updateCountdown(event.dateTime);
        deleteEventButton.onclick = function () {
            events.splice(index, 1);
            showScreen(homeScreen);
            renderEvents();
        };
        showScreen(eventDetailsScreen);
    }

    function updateCountdown(dateTime) {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = dateTime - now;
            if (difference <= 0) {
                clearInterval(interval);
                countdownTimer.textContent = 'Event Started!';
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                countdownTimer.textContent = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
            }
        }, 1000);
    }

    document.getElementById('settings-button').addEventListener('click', function () {
        showScreen(settingsScreen);
    });

    function showScreen(screen) {
        const screens = [homeScreen, addEventScreen, eventDetailsScreen, settingsScreen];
        screens.forEach(s => {
            if (s === screen) {
                s.classList.remove('hidden');
            } else {
                s.classList.add('hidden');
            }
        });
    }

    // Initialize the app by rendering existing events
    renderEvents();
});
