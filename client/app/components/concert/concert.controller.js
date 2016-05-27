// jscs:disable
// class ConcertController {
//     constructor() {
//         this.name = 'concert';
//     }
// }

function concertController($log, $http, ArchiveOrgService, ConcertService){
    "ngInject";
    var http = $http;

    // ArchiveOrgService.getConcertById();
    var vm = this;
    var songService = {};

    vm.name = 'concert';
    vm.concertSongs = [];
    vm.concertTitle = '';
    vm.concertServer = '';
    vm.concertDirectory = '';
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
                $log.log('ArchiveOrgService. jsonp repo', response);
                concertService.parseArchiveOrgConcert(response);
            }, function(err){
            })

    };




    /**
     *  concert.service.js
     */
    const concertService = {};

    concertService.parseArchiveOrgConcert = (concert) => {
        $log.log('Hitting ConcertService');
        console.log('ArchiveOrgService. jsonp repo', concert);

        //@todo: diginto concert here.... along the way do

        //Attach concert info to the vm here
        vm.concertTitle = concert.data.metadata.title;

        //Parse through concert to get the songs to be passed off to the song service
        vm.concertSongs = concert.data.files

        // for (song in concert.data.files) {
        //     debugger;
        //     $log.log(song);
        //     let concertSongTitle = song.name
        // }

        //in concert.tracks.forEach()
        //SongService.saveSongToDb();
        SongService.parseArchiveOrgSong();

    };




    /**
     *  song.service.js
     */
    const SongService = {};

    SongService.parseArchiveOrgSong = (song) => {
        debugger;
        $log.log('Parsing song from Archive.org, then passing off to save to my concertdb.');
    };


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
