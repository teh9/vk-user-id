let state = true;
let showState = false;
let nameState = '';

window.onload = function () {
    checkUrl();
}

/**
 * Checking URL (where we are).
 */
checkUrl = () => {
    setTimeout(function() {
        if ($('.ProfileHeader').length !== 0) { // Checking is that page Profile
            const userName = $(".OwnerPageName"); // Getting username

            if (showState !== true || nameState !== userName.text()) {
                showState = true;
                nameState = userName.text()
                renderButton();
            }
        } else {
            showState = false;
        }

        if (state) {
            checkUrl();
        }
    }, 500)
}

/**
 * Rendering button beside other buttons in profile header.
 */
function renderButton () {
    const buttonList = $('.ProfileHeaderActions__buttons');
    buttonList.prepend(prepareButton());
}

/**
 * Drawing button - Show ID
 *
 * @returns {string}
 */
prepareButton = () => {
    const buttonState = getUserId();

    let html = '';

    html += '<div id="buttonIdBlock">';
    html += (!buttonState) ? '<button class="vk-button" disabled>' : '<button class="vk-button">';
    html += '<span class="vk-button-text" user-id="'+getUserId()+'">';
    html += (!buttonState) ? '⛔ Недоступно' : '🪄 Показать ID';
    html += '</span>';
    html += '</button>';
    html += '</div>';

    return html;
}

/**
 * On button "Show ID" click, showing ID.
 */
$(document).on('click', '.vk-button', () => {
    let buttonText = $(".vk-button > span");
    buttonText.text('• • •'); // Showing loading effect

    const userId = $('.vk-button-text').attr('user-id');

    // Here we're making delay in 0.7s for query effect :)
    setTimeout( function () {
        buttonText.text(userId); // Drawing user id.
        $(".vk-button").prop('disabled', true);
    }, 700)
});

/**
 * Getting user ID from DOM.
 *
 * @returns {*|jQuery}
 */
getUserId = () => {
    let pageUserId = $('#wall_tabs > li > a').attr('href');

    if (pageUserId === undefined) return false;

    if (pageUserId.includes("?own")) return pageUserId.replace('?own=1', '').replace('/wall', '');

    return pageUserId.replace('/wall', '');
}

//TODO implement copy button
