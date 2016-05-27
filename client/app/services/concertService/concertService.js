import angular from 'angular';
import ConcertService from './concertService.service';

let concertServiceModule = angular.module('concertService', [])

.service('ConcertService', ConcertService);

export default concertServiceModule;
