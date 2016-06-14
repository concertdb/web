import angular from 'angular';
import uiRouter from 'angular-ui-router';
import concertComponent from './concert.component';
import ArchiveOrgService from './concert.archiveOrg.service';
import ConcertService from './concert.service';
//@todo: homeComponent.
import temporaryHomeTemplate from './home.html';
import SidebarController from '../../common/sidebar/sidebar.controller';

let concertModule = angular.module('concert', [
    uiRouter
])

.config(($stateProvider, $urlRouterProvider) => {
    "ngInject";
    //@todo: homeComponent. Change back to '/concert/'
    $urlRouterProvider.otherwise('/');

    $stateProvider
        //@todo: homeComponent.
        .state('home', {
            url: '/',
            template: temporaryHomeTemplate,
            controller: SidebarController,
            controllerAs: 'vm'
        })
        .state('concert', {
            abstract: true,
            url: '/concert',
            template: '<div ui-view></div>'
        })
        .state('concert.index', {
            url: '/:artist/:year',
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


