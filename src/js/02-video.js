import Player from '@vimeo/player';
import * as _ from 'lodash.throttle';
//
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
//
player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  _(function (data) {
    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(data.seconds)
    );
  }, 1000)
);

let getTime = localStorage.getItem('videoplayer-current-time');
let parseTime = JSON.parse(getTime);

player
  .setCurrentTime(parseTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
