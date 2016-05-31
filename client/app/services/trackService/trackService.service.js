let TrackService = function ($log) {
    "ngInject";

    const TrackService = this;

    TrackService.parseArchiveOrgSong = (song) => {
        $log.log('TrackService#parseArchiveOrgSong');

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
        TrackService.saveSong(songToSave);
    };

    /**
     *
     * @param song
     */
    TrackService.saveSong = (song) => {
        $log.log('TrackService#saveSong');
        $log.log('Saving the song to the db');

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

};

export default TrackService;
