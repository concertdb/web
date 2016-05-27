import angular from 'angular';
import ArchiveOrgService from './archiveOrg.service';

let archiveOrgModule = angular.module('archiveOrg', [])

.service('ArchiveOrgService', ArchiveOrgService);

export default archiveOrgModule;
