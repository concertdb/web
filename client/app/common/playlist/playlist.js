import angular from 'angular';
import uiRouter from 'angular-ui-router';
import playlistComponent from './playlist.component';

// Styles
import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

//soundmanager2
// included using `requires` due to the module not being ready for ES2016 import syntax
// this also means that we will inject it into the angular module below using the "old" named provider string syntax...
require('angular-soundmanager2/dist/angular-soundmanager2');

let playlistModule = angular.module('playlist', [
    uiRouter,
    angularMaterial,
    'angularSoundManager'
])

.component('playlist', playlistComponent);

export default playlistModule;
