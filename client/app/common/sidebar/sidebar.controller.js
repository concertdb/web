import artistYearChoices from './artistYearChoices';
import _ from 'lodash';

function SidebarController($rootScope, $log, $mdSidenav, ConcertService, ArchiveOrgService){
    "ngInject";

    const vm = this;

    function init(){
        vm.name = 'concert';
        vm.currentArtist = ConcertService.current.artist.name;
        vm.showArtistChoices = false;

        //Hardcoded with band and their years active
        vm.artistYearChoices = artistYearChoices;
    }
    init();

    vm.setArtist = function(artist){
        ConcertService.current.artist.name = artist;
        vm.currentArtist = ConcertService.current.artist.name;
        vm.showArtistChoices = !vm.showArtistChoices;
        setArtistYears(artist);
    };
    function setArtistYears (artist){
        vm.artistAndYear = _.find(vm.artistYearChoices, function(artistYear){
            return artistYear.artist === artist;
        });
        vm.currentYears = vm.artistAndYear.years;
        //pass the first year of the artists active years into the set year function
        vm.setYear(vm.artistAndYear.years[0]);
    }
    vm.setYear = function(year){
        ConcertService.current.year.name = year;
        vm.searchForConcert(year);
        //@todo: get rid of magic string!!!
        $mdSidenav('leftSideNavbar').toggle();
    };
    vm.showArtistList = function(){
        vm.showArtistChoices = !vm.showArtistChoices;
    };
    vm.searchForConcert = function(year){

        let searchQuery = {
            artist: ConcertService.current.artist.name,
            year: ConcertService.current.year.name
        };

        ArchiveOrgService
            .getConcertSearchResults(searchQuery)
            .then(function(concertSearchResults){
                $log.info('Concert Search Results: ', concertSearchResults);

                ConcertService.current.searchResults = concertSearchResults.data.response.docs;

                //broadcast the update:searchResults event
                //@todo: refactor component-to-component communication. $broadcast not in ng2.
                $rootScope.$broadcast('update:searchResults');

            }, function(error){
                $log.error('Error submitting concert search form: ', error);
            });
    };

}

export default SidebarController;
