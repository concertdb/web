import angular from 'angular';
import uiRouter from 'angular-ui-router';
import concertItem from './concertItem.component';

// Styles
import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';


let concertItemModule = angular.module('concertItem', [
    uiRouter,
    angularMaterial
])

.component('concertItem', concertItem);

export default concertItemModule;
