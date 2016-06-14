import artistYearChoices from './artistYearChoices';
import _ from 'lodash';

function SidebarController($rootScope, $scope, $log, $state, $mdMedia, $mdSidenav, ConcertService, ArchiveOrgService){
    "ngInject";

    const vm = this;
    vm.ConcertService = ConcertService;
    vm.screenIsSmall = $mdMedia('max-width: 960px');

    var initialLoad = true;

    function init(){
        vm.name = 'sidebar';
        vm.currentArtist = ConcertService.current.artist.name;
        vm.showArtistChoices = false;

        //Hardcoded with band and their years active
        vm.artistYearChoices = artistYearChoices;
        //set current artist and year choices with defaults
        setArtistYears(vm.currentArtist);
        initialLoad = false;
    }

    vm.setArtist = function(artist, isFromHomepage){
        ConcertService.current.artist.name = artist;
        vm.currentArtist = ConcertService.current.artist.name;
        vm.showArtistChoices = !vm.showArtistChoices;
        setArtistYears(artist);
        if (isFromHomepage){
            $state.go('concert.index');
        }
    };
    function setArtistYears (artist){
        vm.currentYears = vm.artistYearChoices[artist];

        //pass the first year of the artists active years into the set year function
        vm.setYear(vm.currentYears[0]);
    }

    vm.setYear = function(year){
        ConcertService.current.year.name = year;

        if (!initialLoad) {
            vm.searchForConcert(year);
            //Since toggle is disabled for gt-sm, this will only toggle the sidebar close when the screen is less than 960px
            $mdSidenav('leftSideNavbar').toggle();
        }
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
                $state.go('concert.index', {
                    artist: ConcertService.current.artist.name,
                    year: ConcertService.current.year.name
                });

            }, function(error){
                $log.error('Error submitting concert search form: ', error);
            });
    };

    //initialize the component's controller.
    init();
}

export default SidebarController;
