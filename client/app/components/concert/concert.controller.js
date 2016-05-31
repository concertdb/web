function concertController($log, $http, $state, ArchiveOrgService, ConcertService){
    "ngInject";

    const http = $http;
    const vm = this;
    vm.name = 'concert';
    vm.concertForm = {
        artist: '',
        year: ''
    };
    vm.bandsActiveYears = [
        {
            artist: 'String Cheese Incident',
            year: '2016'
        },
        {
            artist: 'String Cheese Incident',
            year: '2015'
        },
        {
            artist: 'String Cheese Incident',
            year: '2014'
        }

    ];

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

    vm.clickConcertYear = function(artist, year) {
        let clickedParams = {
            artist: artist,
            year: year
        };
        vm.submitConcertSearchForm(clickedParams);
    };

    //@todo: after working out the data flow. Will remove and hook front-end buttons onto $stateParams.

    vm.clickConcertFromIndex = function(concertId) {
        let concert;

        // ArchiveOrgService.getConcertById('sci2004-06-19.flac16');
        ArchiveOrgService.getConcertById(concertId)
            .then(function(data){
                concert = data.data;
                return concert;

            }, function(error){
                $log.error('Error in concertController#clickConcertFromIndex: ', error);

            }).then(function(concert){
                debugger;
                ArchiveOrgService.parseArchiveOrgConcert(concert);
                $state.go('concert.show', {id: concertId});

            }, function(error){
                $log.error('Error in concertController#clickConcertFromIndex: ', error);
            });

        // $state.go( 'concert.show', { id: concertId});


    };


}

export default concertController;
