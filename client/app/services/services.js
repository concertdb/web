import angular from 'angular';
import ArchiveOrgServiceModule from './archiveOrgService/archiveOrg';
import ConcertServiceModule from './concertService/concertService';
import TrackService from './trackService/trackService';

let servicesModule = angular.module('app.services', [
    ArchiveOrgServiceModule.name,
    ConcertServiceModule.name,
    TrackService.name
]);

export default servicesModule;
