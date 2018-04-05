/* #6 start the #external #action and say hello */
console.log("App is alive");
//var currentChannel =sevencontinents;

var currentLocation= {
    longitude: 11.537566 ,
    latitude: 48.113743,
    what3words: "duschen.befund.leiter"
};
/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelName Text which is set
 */
function switchChannel(channelObject) {
    //Log the channel switch
    console.log("Tuning in to channel", channelObject.name);
    currentChannel=channelObject;

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelObject.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/'
        +channelObject.createdBy
    +'" target="_blank"><strong>'
    +channelObject.createdBy
    +'</strong></a>';

    /* #6 #liking channels on #click */
    $('#channel-star').removeClass('fa-star fa-star-o');

    $('#channel-star').addClass(channelObject.starred? 'fa-star':'fa-star-o');
    /* #6 #highlight the selected #channel.
       This is inefficient (jQuery has to search all channel list items), but we'll change it later on */
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelObject.name + ')').addClass('selected');
}

/* #6 #liking a channel on #click */
function star() {
//    $('#channel-star').attr('src', 'http://ip.lfe.mw.tum.de/sections/star.png');
     $('#channel-star').toggleClass('fa-star');
    $('#channel-star').toggleClass('fa-star-o');
    currentChannel.starred = !currentChannel.starred;
    $('#channels li:contains(' + currentChannel.name + ') .fa').removeClass('fa-star fa-star-o');
    $('#channels li:contains(' + currentChannel.name + ') .fa').addClass(currentChannel.starred ? 'fa-star' : 'fa-star-o');
    
    
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}

function Message(messageText) {
//    debugger;
    this.createdBy= currentLocation.what3words;
    this.longitude= currentLocation.longitude;
    this.latitude= currentLocation.latitude;
    this.createdOn= new Date();
    this.expiresOn= new Date (this.createdOn + 15*60*1000);
    this.text= messageText;
    this.own= true;

}

function sendMessage(){
//    debugger;
    var message= new Message($('#textinput').val());
    console.log("New message:", message);
    $(createMessageElement(message)).appendTo('#messages');
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    $('#textinput').val('');
}

function createMessageElement(messageObject){
//    debugger;
    var expire = Math.round((messageObject.expiresOn - Date.now())/60000);
    return '<div class="message' + (messageObject.own? 'own':'')+ '"><h3><a href="'+messageObject.createdBy+'" target="_blank"><strong>'+messageObject.createdBy+'</strong></a>'   
    +messageObject.createdOn+': <em>'+expire+' min. left</em></h3><p>'+messageObject.text+'</p><button>+5 min.</button></div>';
    
}

function listChannels(){
//    $('<li>').appendTo('#channels ul');
    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevencontinents));
    $('#channels ul').append(createChannelElement(killerapp));
    $('#channels ul').append(createChannelElement(firstpersononmars));
    $('#channels ul').append(createChannelElement(octoberfest));
    
}

function  createChannelElement(channelObject) {
    // create a channel
    var channel = $('<li>').text(channelObject.name);

    // create and append channel meta
    var meta = $('<span>').addClass('channel-meta').appendTo(channel);

    // The star including #star functionality.
    // Since we don't want to append child elements to this element, we don't need to 'wrap' it into a variable as the elements above.
    $('<i>').addClass('fa').addClass(channelObject.starred ? 'fa-star' : 'fa-star-o').appendTo(meta);

    // #8 #channel #boxes for some additional meta data
    $('<span>').text(channelObject.expiresIn + ' min').appendTo(meta);
    $('<span>').text(channelObject.messageCount + ' new').appendTo(meta);

    // The chevron
    $('<i>').addClass('fa').addClass('fa-chevron-right').appendTo(meta);

    // return the complete channel
    return channel;
}