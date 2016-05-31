import angular from 'angular';
import TrackService from './trackService.service';

let trackServiceModule = angular.module('trackService', [])

.service('TrackService', TrackService);

export default trackServiceModule;
