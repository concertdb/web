//@todo: inject SongService
import config from '../../../../dev-workspace/config';

let ConcertService = function ($log, $http, TrackService) {
    "ngInject";
    const ConcertService = this;
    let currentConcertSongArray = [];
    let concertSongs = [];

    ConcertService.parseArchiveOrgConcert = (concert) => {
        $log.log('Hitting ConcertService');
        debugger;

        // let getDbConcerts = $http.get('http://localhost:8000/v1/concert_recordings')
        //     .then(function successCallback(response) {
        //             $log.log("Got concert!!", response);
        //     }, function errorCallback(response) {
        //         $log.log('There was an error posting the data', response);
        //     });



        ConcertService.createConcertRecording(concert, concert.data.metadata);

        //Display the songs in the view model
        ConcertService.concertSongs = concert.data.files;
        // $log.log(concert.data.files);

        //@todo: figure out how to only only pass files with the format of 'VBR MP3'
        //Iterate over the array of files, and pass each song into the song service, then pass each song into the concertSongArray cache
        ConcertService.concertSongs.forEach(function(song) {

            //Only grab files that are VBR MP3 format
            if (song.format === "VBR MP3") {

                //Parse the song and save it to the db
                let formattedSong = TrackService.parseArchiveOrgSong(song);
                //Add the song to the cache
                ConcertService.currentConcertSongArray.push(formattedSong);
            }


        });
        // $log.log("concertSongArray:", concertSongArray);

        //in concert.tracks.forEach()
        //TrackService.saveSongToDb();
        // TrackService.parseArchiveOrgSong();

    };
    ConcertService.getConcertFromDb = (concertId) => {
        return $http.get(config.api + 'concert_recordings/'+ concertId);
    };
    


    // Post the new concert object to the back-end db
    ConcertService.createConcertRecording = (concert, concertMetadata) => {
        let {date, creator, coverage, venue, description, notes, taper, source} = concertMetadata;

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

        $http.post(config.api +'concert_recordings', concertRecordingToSave);

    };
};

export default ConcertService;
