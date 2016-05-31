// jscs:disable

function concertController($log, $http, $stateParams, ArchiveOrgService, ConcertService, TrackService){
    "ngInject";

    const http = $http;
    const vm = this;
    vm.name = 'concert';
    vm.concertForm = {
        artist: '',
        year: ''
    };

    const appCache = {};
    appCache.songs = [];
    appCache.concert = {};

    appCache.getSongs = () => {
        return appCache.songs;
    };
    appCache.setSongs = (songsArray) => {
        appCache.songs = songsArray;
    };

    appCache.getConcert = () => {
        return appCache.concert;
    };
    appCache.setConcert = (concertObject) => {
        appCache.concert = concertObject;
    };


    vm.submitConcertSearchForm = function() {
        ArchiveOrgService.getConcertSearchResults(vm.concertForm).then(function(concertSearchResults){
            $log.info('Concert Search Results: ', concertSearchResults);
            vm.searchResults= concertSearchResults.data.response.docs;

        }, function(error){
            $log.error('Error submitting concert search form: ', error);
        });
    };

    vm.initializeConcertViewModel = function(concert){
        //Initialize the concert view model data elements that will be displayed on the page
        //Attach concert info data items to the vm here
        vm.concertDate = concert.data.metadata.date;
        vm.concertArtist = concert.data.metadata.creator;
        vm.concertLocation = concert.data.metadata.coverage;
        vm.concertVenue = concert.data.metadata.venue;
        vm.concertDescription = concert.data.metadata.description;
        vm.concertNotes = concert.data.metadata.notes;
        vm.concertTaper = concert.data.metadata.taper;
        vm.concertSourceInfo = concert.data.metadata.source;
        vm.archive_url = 'http://archive.org/details/'+concert.data.dir.split('/').pop();
    };

    //@todo: after working out the data flow. Will remove and hook front-end buttons onto $stateParams.

    //testing fixture.
    vm.testService = function() {
        // ArchiveOrgService.getConcertById('sci2004-06-19.flac16');
        ArchiveOrgService.getConcertById();
    };

    vm.getConcertById = function(concertId) {
        ConcertService.getConcertFromDb(concertId).then(function(success){
            let isConcertInDb = success.data.length;

            if (isConcertInDb) {
                vm.initializeConcertViewModel(success.data);

            } else {

                // Reach out to Archive.org because this concert is not yet in my DB
                ArchiveOrgService.getConcertById(concertId).then(function(response){
                    debugger;
                    vm.initializeConcertViewModel(response);
                });

            }
        })
    };

    /**
     *  archiveOrg.service.js
     */
    //hook onto various parts of UI to trigger a hard-coded response.
    // ArchiveOrgService.getConcertSearchResults().then(function(results){
    //     debugger;
    //     vm.searchResults = results.data.response.docs;
    // });





    /**
     *  concert.service.js
     */
    // const concertService = {};
    //this has to come after the call to parseConcert. Because inside of parseConcert the cache is being initially populated.
    vm.concertSongs = ConcertService.concertSongs;





    /**
     *  song.service.js
     */
    // const SongService = {};




}

export default concertController;
