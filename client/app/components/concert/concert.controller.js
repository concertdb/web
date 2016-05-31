// jscs:disable

function concertController($log, $http, ArchiveOrgService, ConcertService){
    "ngInject";
    const http = $http;

    // ArchiveOrgService.getConcertById();
    const vm = this;
    const archiveConcertSearchService = {};
    const archiveOrgService = {};
    const songService = {};

    //Initialize the concert view model data elements that will be displayed on the page
    vm.name = 'concert';
    vm.concertSongs = [];
    vm.concertDate = '';
    vm.concertArtist = '';
    vm.concertLocation = '';
    vm.concertDescription = '';
    vm.concertNotes = '';
    vm.concertTaper = '';
    vm.concertSourceInfo = '';
    //@todo: after working out the data flow. Will remove and hook front-end buttons onto $stateParams.

    //testing fixture.
    vm.testService = function() {
        debugger;
        // ArchiveOrgService.getConcertById('sci2004-06-19.flac16');
        archiveOrgService.getConcertById();
    };

    vm.getConcertById = function(concertId) {
        debugger;
        archiveOrgService.getConcertById(concertId);
    };

    /**
     *  archiveOrg.service.js
     */

    archiveOrgService.getConcertById = (concertId) => {
        $log.log('Hitting ArchiveService');
        // concertId = 'sci2004-06-19.flac16';
        let concertUrl = 'http://archive.org/metadata/'+concertId+'?callback=JSON_CALLBACK';

        $http.jsonp(concertUrl)
            .then(function(response) {
                // $log.log('ArchiveOrgService. jsonp repo', response);
                concertService.parseArchiveOrgConcert(response);
                //@todo: Dig into the object here, and then make the subsequent code easier to read. concert.data.metadata is only here.
                // vm.initializeConcertViewModel(response.data.metadata);
                vm.initializeConcertViewModel(response);
            }, function(err){
                $log.log("Error: ", err);
            });
    };

    archiveOrgService.getConcertSearchResults = (search) => {

        return $http.jsonp('https://archive.org/advancedsearch.php?q=creator%3A%28String+Cheese+Incident%29%26title%3A%282016%29&fl%5B%5D=collection&fl%5B%5D=coverage&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=date+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=JSON_CALLBACK')
            // .then(function(response) {
            //     // $log.log("Got search results!!", response.data.response.docs);
            //     let searchResults = response.data.response.docs;
            //     vm.searchResults = searchResults;
            //     // searchResults.forEach(function(concert) {
            //     //     archiveConcertSearchService.showSearchResults(concert);
            //     // });
            // }, function(err) {
            //     $log.log('There was an error getting the concerts', err);
            // });
    };

    archiveOrgService.getConcertSearchResults().then(function(results){
        vm.searchResults = results.data.response.docs;
    });

    vm.initializeConcertViewModel = function(concert){
        //Attach concert info data items to the vm here
        vm.concertDate = concert.data.metadata.date;
        vm.concertArtist = concert.data.metadata.creator;
        vm.concertLocation = concert.data.metadata.coverage;
        vm.concertVenue = concert.data.metadata.venue;
        vm.concertDescription = concert.data.metadata.description;
        vm.concertNotes = concert.data.metadata.notes;
        vm.concertTaper = concert.data.metadata.taper;
        vm.concertSourceInfo = concert.data.metadata.source;
        vm.archive_url = "http://archive.org/details"+/items(.+)/.exec(concert.data.dir)[1];

    };



    /**
     *  concert.service.js
     */
    const concertService = {};

    concertService.currentConcertSongArray = [];

    concertService.parseArchiveOrgConcert = (concert) => {
        $log.log('Hitting ConcertService');

        // let getDbConcerts = $http.get('http://localhost:8000/v1/concert_recordings')
        //     .then(function successCallback(response) {
        //             $log.log("Got concert!!", response);
        //     }, function errorCallback(response) {
        //         $log.log('There was an error posting the data', response);
        //     });

        let {date, creator, coverage, venue, description, notes, taper, source} = concert.data.metadata;

        let concertRecordingToSave = {
            name: concert.data.dir,
            archive_url: concert.data.d1,
            artist: creator,
            date: date,
            //year: ,
            location: coverage,
            venue: venue,
            description: description,
            notes: notes,
            source_info: source,
            taper: taper

        };

        // Post the new concert object to the banck-end db
        // let createConcertRecording = $http.post('http://localhost:8000/v1/concert_recordings', concertRecordingToSave)
        //     .then(function successCallback(response) {
        //         $log.log("Successful save!!");
        // }, function errorCallback(response) {
        //     $log.log('There was an error posting the data', response);
        // });


        //Display the songs in the view model
        vm.concertSongs = concert.data.files;
        // $log.log(concert.data.files);

        //@todo: figure out how to only only pass files with the format of 'VBR MP3'
        //Iterate over the array of files, and pass each song into the song service, then pass each song into the concertSongArray cache
        concert.data.files.forEach(function(song) {

            //Only grab files that are VBR MP3 format
            if (song.format === "VBR MP3") {

                //Parse the song and save it to the db
                let formattedSong = SongService.parseArchiveOrgSong(song);
                //Add the song to the cache
                concertService.currentConcertSongArray.push(formattedSong);
            }


        });
        // $log.log("concertSongArray:", concertSongArray);

        //in concert.tracks.forEach()
        //SongService.saveSongToDb();
        // SongService.parseArchiveOrgSong();

    };




    /**
     *  song.service.js
     */
    const SongService = {};

    SongService.parseArchiveOrgSong = (song) => {
        $log.log("Hitting Song Service")

        //@todo: Store properties from the archive song object as properties on the song object that will be saved to the db
        //@todo: construct the url that will be added to each song
        //@todo: use the song object with the url to load on the page so that the player can find a url when the song is clicked

        let songToSave = {
            title: song.title,
            artist: song.creator,
            track: song.track,
            album: song.album,
            length: song.length,
            file: song.name

        };

        //Pass the properly formatted song object to the save function, which will save it to the db
        SongService.saveSong(songToSave);
    };

    SongService.saveSong = (song) => {
        // $log.log('Saving the song to the db');

        // let getSongs = $http.get('http://localhost:8000/v1/songs')
        //     .then(function successCallback(response) {
        //         $log.log("Got concert!!", response);
        //     }, function errorCallback(response) {
        //         $log.log('There was an error posting the data', response);
        //     });


        // ajax call to look up the song in the db. If it is not there, send a post request to create the song
        // Post the new song object to the banck-end db
        // let createSong = $http.post('http://localhost:8000/v1/songs', song)
        //     .then(function successCallback(response) {
        //         $log.log("Successfully saved song!!",
        //         response);
        // }, function errorCallback(response) {
        //     $log.log('There was an error saving the song', response);
        // });
    };
}

export default concertController;
