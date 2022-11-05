let state = true;
let showState = false;

window.onload = function () {
    checkUrl();
}

/**
 * Checking URL (where we are).
 */
checkUrl = () => {
    setTimeout(function() {
        if ($('.ProfileHeader').length !== 0) {
            if (showState !== true) {
                showState = true;
                renderButton();
            }
        } else {
            showState = false;
        }

        if (state) {
            checkUrl();
        }
    }, 1000)
}

/**
 * Rendering button beside other buttons in profile header.
 *
 * @param userId
 */
renderButton = (userId) => {
    const buttonList = $('.ProfileHeaderActions__buttons');
    buttonList.prepend(prepareButton(userId));
}

/**
 * Drawing button - Show ID
 *
 * @returns {string}
 */
prepareButton = () => {
    let html = '';

    html += '<div id="buttonIdBlock">';
    html += '<button class="vk-button">';
    html += '<span class="vk-button-text" user-id="'+getUserId()+'">';
    html += '🪄 Показать ID';
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

    // Here we're making delay in 1s for query effect :)
    setTimeout( function () {
        buttonText.text(userId); // Drawing user id.
    }, 1000)
});

/**
 * Getting user ID from DOM.
 *
 * @returns {*|jQuery}
 */
getUserId = () => {
    return  $('#l_aud > a').attr('href').replace('/audios', '');
}

/**
 * Reloading page for avoiding bug with link "My page".
 */
$(document).on('click', '#l_pr', () => {
    const link = $("#l_pr > a").attr('href');

    if (window.location.pathname === link) {
        window.location.href = link;
    }
});
