import angular from 'angular';
import ArchiveOrgServiceModule from './archiveOrgService/archiveOrg';
import ConcertServiceModule from './concertService/concertService';

let servicesModule = angular.module('app.services', [
    ArchiveOrgServiceModule.name,
    ConcertServiceModule.name
]);

export default servicesModule;
