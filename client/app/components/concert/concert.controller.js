function concertController($log, $http, $state, ArchiveOrgService, ConcertService){
    "ngInject";

    const http = $http;
    const vm = this;
    vm.name = 'concert';
    vm.concertForm = {
        artist: '',
        year: ''
    };

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

    vm.currentArtist = "String Cheese Incident";
    vm.currentYear = "2016";

    vm.setArtist = function(artist){
        vm.concertForm.artist = artist;
        vm.currentArtist = artist;
        vm.checkConcertForm();
    };
    vm.setYear = function(year){
        vm.concertForm.year = year;
        vm.currentYear = year;
        vm.checkConcertForm();
    };
    vm.checkConcertForm = function(){
        let shouldTriggerSearch = (vm.concertForm.artist.length > 0 && vm.concertForm.year.length > 0);
        if (shouldTriggerSearch) {
            vm.submitConcertSearchForm();
        }
    };

    /**
     * Click handler for concertSearchForm. Will set the `vm.searchResults` property on the controllers scope.
     * This needs to be refactored since it is closely coupled with `vm.clickConcertYear` and the controllers
     * `vm.concertForm` state.
     */
    vm.submitConcertSearchForm = function(searchParams) {
        let searchQuery;

        if (searchParams) {
            vm.concertForm = searchParams;
            searchQuery = searchParams;
        } else {
            searchQuery = vm.concertForm;
        }

        ArchiveOrgService
            .getConcertSearchResults(searchQuery)
            .then(function(concertSearchResults){
                $log.info('Concert Search Results: ', concertSearchResults);
                vm.searchResults = concertSearchResults.data.response.docs;

            }, function(error){
                $log.error('Error submitting concert search form: ', error);
            });
    };

    // vm.clickConcertYear = function(artist, year) {
    //     let clickedParams = {
    //         artist: artist,
    //         year: year
    //     };
    //     vm.submitConcertSearchForm(clickedParams);
    // };

    //@todo: after working out the data flow. Will remove and hook front-end buttons onto $stateParams.

    vm.clickConcertFromIndex = function(concertId) {
        let concert;

        // Use the getConcertById method to query archive.org's db for the concert
        ArchiveOrgService.getConcertById(concertId)
            .then(function(data){

                //return the concert object recieved back from archive.org
                concert = data.data;
                return concert;

            }, function(error){
                $log.error('Error in concertController#clickConcertFromIndex: ', error);

            //pass the returned concert to the parseArchiveOrgConcert method for parsing and cahcing of the concert and its songs
            }).then(function(concert){
                ArchiveOrgService.parseArchiveOrgConcert(concert);
                $state.go('concert.show', {id: concertId});

            }, function(error){
                $log.error('Error in concertController#clickConcertFromIndex: ', error);
            });

        // $state.go( 'concert.show', { id: concertId});


    };


}

export default concertController;
