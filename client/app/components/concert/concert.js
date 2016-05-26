import angular from 'angular';
import uiRouter from 'angular-ui-router';
import concertComponent from './concert.component';

let concertModule = angular.module('concert', [
    uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('concert', {
            url: '/concert',
            template: '<concert></concert>'
        });
})

.component('concert', concertComponent);

export default concertModule;


