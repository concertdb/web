function SidebarController($rootScope, $log, $stateParams, ConcertService, ArchiveOrgService){
    "ngInject";

    const vm = this;

    function init(){
        vm.name = 'concert';
        vm.currentArtist = ConcertService.current.artist.name;
        //Hard-coded band and year list
        vm.artistChoices =[
            {
                artist: 'String Cheese Incident'
            },
            {
                artist: 'Lotus'
            },
            {
                artist: 'Keller Williams'
            },
            {
                artist: 'Sound Tribe Sector 9'
            },
            {
                artist: 'Yonder Mountain String Band'
            }
        ];
        vm.yearChoices = [
            {
                year: '2016'
            },
            {
                year: '2015'
            },
            {
                year: '2014'
            },
            {
                year: '2013'
            },
            {
                year: '2012'
            },
            {
                year: '2011'
            },
            {
                year: '2010'
            },
            {
                year: '2009'
            },
            {
                year: '2008'
            },
            {
                year: '2007'
            },
            {
                year: '2006'
            },
            {
                year: '2005'
            },
            {
                year: '2004'
            },
            {
                year: '2003'
            },
            {
                year: '2002'
            },
            {
                year: '2001'
            },
            {
                year: '2000'
            }
        ];
        vm.showArtistChoices = false;
    }
    init();

    vm.setArtist = function(artist){
        ConcertService.current.artist.name = artist;
        vm.currentArtist = ConcertService.current.artist.name;
        vm.showArtistChoices = !vm.showArtistChoices;
    };
    vm.setYear = function(year){
        ConcertService.current.year.name = year;
        vm.searchForConcert(year);
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
