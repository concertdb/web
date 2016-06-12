import angular from 'angular';
import uiRouter from 'angular-ui-router';
import concertComponent from './concert.component';
import ArchiveOrgService from './concert.archiveOrg.service';
import ConcertService from './concert.service';

let concertModule = angular.module('concert', [
    uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

    $urlRouterProvider.otherwise('/concert/');

    $stateProvider
        .state('concert', {
            abstract: true,
            url: '/concert',
            template: '<div ui-view></div>'
        })
        .state('concert.index', {
            url: '/',
            template: '<concert></concert>'
        })
        .state('concert.show', {
            url: '/:artist/:year/:id',
            template: '<concert-item></concert-item>',
            // resolve: {
            //     concertSongs: function($state, $stateParams, ConcertService){
            //
            //         var concertSongs = ConcertService.concertSongs[$stateParams.id];
            //         debugger;
            //         if (concertSongs){
            //             return concertSongs;
            //         } else {
            //             $state.go('concert.index');
            //
            //         }
            //     }
            // }
        });
})
.service('ArchiveOrgService', ArchiveOrgService)
.service('ConcertService', ConcertService)
.component('concert', concertComponent);

export default concertModule;


