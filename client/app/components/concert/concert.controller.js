// jscs:disable

function concertController($log, $http, ArchiveOrgService, ConcertService){
    "ngInject";
    const http = $http;

    // ArchiveOrgService.getConcertById();
    const vm = this;
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
        // ArchiveOrgService.getConcertById('sci2004-06-19.flac16');
        archiveOrgService.getConcertById();
    };





    /**
     *  archiveOrg.service.js
     */
    const archiveOrgService = {};
    archiveOrgService.getConcertById = (concertId) => {
        $log.log('Hitting ArchiveService');
        concertId = 'sci2004-06-19.flac16';
        let concertUrl = 'http://archive.org/metadata/'+concertId+'?callback=JSON_CALLBACK';

        $http.jsonp(concertUrl)
            .then(function(response) {
                // $log.log('ArchiveOrgService. jsonp repo', response);
                concertService.parseArchiveOrgConcert(response);
            }, function(err){
            });

    };




    /**
     *  concert.service.js
     */
    const concertService = {};

    concertService.parseArchiveOrgConcert = (concert) => {
        $log.log('Hitting ConcertService');
        // console.log('ArchiveOrgService. jsonp repo', concert);

        //Would this be my concert cache?
        let currentConcertSongArray = [];

        //Attach concert info to the vm here
        vm.concertDate = concert.data.metadata.date;
        vm.concertArtist = concert.data.metadata.creator;
        vm.concertLocation = concert.data.metadata.coverage;
        vm.concertVenue = concert.data.metadata.venue;
        vm.concertDescription = concert.data.metadata.description;
        vm.concertNotes = concert.data.metadata.notes;
        vm.concertTaper = concert.data.metadata.taper;
        vm.concertSourceInfo = concert.data.metadata.source;

        //Display the songs in the view model
        vm.concertSongs = concert.data.files;
        // $log.log(concert.data.files);

        //@todo: figure out how to only only pass the
        //Iterate over the array of files, and pass each song into the song service, then pass each song into the concertSongArray
        concert.data.files.forEach(function(song) {

            //Only grab files that are VBR MP3 format
            if (song.format === "VBR MP3") {

                //Parse the song and save it to the db
                let formattedSong = SongService.parseArchiveOrgSong(song);
                //Add the song to the cache
                currentConcertSongArray.push(formattedSong);
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
    const parsedSong = {};

    SongService.parseArchiveOrgSong = (song) => {
        $log.log(song);

        //@todo: Store properties from the archive song object as properties on the song object that will be saved to the db


        $log.log('Parsing song from Archive.org, then passing off to save to my concertdb.');
        //Pass the properly formatted song object to the save function, which will save it to the db
        SongService.saveSong(parsedSong);
    };

    SongService.saveSong = (song) => {
        $log.log('Saving the song to the db');
        //ajax call to look up the song in the db. If it is not there, send a post request to create the song
    }


    // songService.getConcert = function getConcert() {
    //
    //     var concertUrl = 'http://archive.org/details/sci2004-06-19.flac16?output=json&callback=JSON_CALLBACK';
    //
    //     return http.jsonp(concertUrl);
    //
    // };
    // songService.getConcert().then(function(response){
    //
    //     vm.concertTitle = response.data.metadata.title[0];
    //     vm.concertServer = response.data.server;
    //     vm.concertDirectory = response.data.dir;
    //
    //     var songArray = [];
    //     for(var item in response.data.files){
    //         // this condition is required to prevent moving forward to prototype chain
    //         if(response.data.files.hasOwnProperty(item)){
    //             // console.log(item);
    //             songArray.push(response.data.files[item]);
    //         }
    //     }
    //     vm.concertSongs = songArray;
    // });
}

export default concertController;
