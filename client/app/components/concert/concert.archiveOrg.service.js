let ArchiveOrgService = function ($log, $http, $state, ConcertService) {
    "ngInject";

    // this.name = 'archiveOrgService';

    let getConcertById = (concertId) => {
        $log.info('ArchiveOrgService#getConcertById');
        let concertUrl = 'http://archive.org/metadata/' + concertId + '?callback=JSON_CALLBACK';

        return $http.jsonp(concertUrl);
    };

    let getConcertSearchResults = (concertSearchParams) => {
        $log.info('ArchiveOrgService#getConcertSearchResults');

        let {artist, year} = concertSearchParams;
        let artistQueryString = artist.trim().toLowerCase().split(' ').join('+');
        let yearQueryString = parseInt(year.trim());

        return $http.jsonp('https://archive.org/advancedsearch.php?q=creator%3A%28' + artistQueryString + '%29%26title%3A%28' + yearQueryString + '%29&fl%5B%5D=collection&fl%5B%5D=coverage&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=date+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=JSON_CALLBACK');
    };


    let parseArchiveOrgConcert = (concert) => {
        $log.info('ArchiveOrgService#parseArchiveOrgConcert');

        //Construct the "currentConcert" object to be "stored" in `ConcertService.currentConcert`
        let concertId = concert.metadata.identifier;
        let cachedConcertObject = {
            title: concert.metadata.title,
            artist: concert.metadata.creator,
            description: concert.metadata.description,
            location: concert.metadata.coverage,
            date: concert.metadata.date,
            year: concert.metadata.year,
            concertId: concertId
        };
        //Add this concert to the ConcertService.currentConcert cache {}
        ConcertService.setCurrentConcert(cachedConcertObject);

        //then we are going to pass the un-manipulated "songs" array to `parseSongListAndAddToCache` method
        this.parseSongListAndAddToCache(concert.files, concert);
    };


    let parseSongListAndAddToCache = (unformattedSongArray, concert) => {

        //Create new array of only songs that are VBR MP3 format
        let mp3Array = unformattedSongArray.filter(function(song){ return song.format === 'VBR MP3';});
        let ArchiveOrgService = this;

        if (mp3Array.length){
            mp3Array.forEach(function(song){
                //Parse the song and save it to the db
                let formattedSong = ArchiveOrgService.parseArchiveOrgSong(song, concert);
                //@TODO: Pass the properly formatted song object to the save function, which will save it to the db
            });
        }

    };


    let parseArchiveOrgSong = (song, concert) => {
        $log.info('ArchiveOrgService#parseArchiveOrgSong');

        let archiveUrl = concert.d1 + concert.dir + '/'+song.name;
        let concertId = concert.metadata.identifier;

        let songToSave = {
            title: song.title,
            artist: song.creator,
            track: song.track,
            album: song.album,
            length: song.length,
            file: song.name,
            concertId: concertId,
            archiveUrl: archiveUrl
        };

        //Check if the song cache for this concertId has already been created in the concertSongs cache {}
        let concertCacheForThisConcert = ConcertService.concertSongs[concertId];

        //if it has, just add the newly formatted song to the cache'd array
        if (concertCacheForThisConcert){
            ConcertService.concertSongs[concertId].push(songToSave);

        } else {
            //if it hasnt, create an entry in the concertSongs object, accesible using the concertId
            // e.g. ConcertService.concertSongs['someId'] => [{song1}, {song2}, {songX}, ...]
            ConcertService.concertSongs[concertId] = [];
            //and finally, push the formatted song into this cached array
            ConcertService.concertSongs[concertId].push(songToSave);
        }

        return songToSave;
    };

    ///////////////////////////////////////////////

    this.getConcertById = getConcertById;
    this.getConcertSearchResults = getConcertSearchResults;
    this.parseArchiveOrgConcert = parseArchiveOrgConcert;
    this.parseSongListAndAddToCache = parseSongListAndAddToCache;
    this.parseArchiveOrgSong = parseArchiveOrgSong;
};

export default ArchiveOrgService;
