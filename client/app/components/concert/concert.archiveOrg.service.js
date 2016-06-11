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
        // let testsearch = $http.jsonp('https://archive.org/metadata/StringCheeseIncident?and[]=year%3A%222015%22&output=json&callback=JSON_CALLBACK');
        // $log.log("Test Search: ", testsearch);

        return $http.jsonp('https://archive.org/advancedsearch.php?q=creator%3A%28' + artistQueryString + '%29%26title%3A%28' + yearQueryString + '%29&fl%5B%5D=collection&fl%5B%5D=coverage&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=date+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=JSON_CALLBACK');

    };


    let parseArchiveOrgConcert = (concert) => {
        $log.info('ArchiveOrgService#parseArchiveOrgConcert');

        //Construct the "currentConcert" object to be "stored" in `ConcertService.currentConcert`
        //@todo: concertId manipulation. Figure out different way to get unique id for concert. This was done to prevent issue #XXXX.
        let concertId = concert.metadata.identifier.replace(/([^a-z0-9]+)/gi, '');
        let archiveUrl = `http://archive.org/details/${concert.metadata.identifier}`;

        let cachedConcertObject = {
            title: concert.metadata.title,
            artist: concert.metadata.creator,
            description: concert.metadata.description,
            location: concert.metadata.coverage,
            venue: concert.metadata.venue,
            notes: concert.metadata.notes,
            taper: concert.metadata.taper,
            source: concert.metadata.source,
            date: concert.metadata.date,
            archiveUrl: archiveUrl,

            concertId: concertId
        };
        //Add this concert to the ConcertService.currentConcert cache {}
        ConcertService.setCurrentConcert(cachedConcertObject);

        //then we are going to pass the un-manipulated "songs" array to `parseSongListAndAddToCache` method
        this.parseSongListAndAddToCache(concert.files, concert);
    };


    let parseSongListAndAddToCache = (unformattedSongArray, concert) => {

        //Create new array of only songs that are VBR MP3 format
        let mp3Array = unformattedSongArray.filter(function(song){
            return song.format === 'VBR MP3';
        });
        let ArchiveOrgService = this;

        if (mp3Array.length){
            mp3Array.forEach(function(song){
                //Parse the song and save it to the db
                let formattedSong = ArchiveOrgService.parseArchiveOrgSong(song, concert);
                //@TODO: pouchDb. Pass the properly formatted song object to the save function, which will save it to the db
                // db.put({
                //     _id: 'mydoc',
                //     title: 'Heroes'
                // }).then(function (response) {
                //     // handle response
                // }).catch(function (err) {
                //     console.log(err);
                // });
            });
        }

    };


    let parseArchiveOrgSong = (song, concert) => {
        $log.info('ArchiveOrgService#parseArchiveOrgSong');

        let archiveUrl = `https://${concert.d1}${concert.dir}/${song.name}`;
        //@todo: concertId manipulation. Figure out different way to get unique id for concert. This was done to prevent issue #XXXX.
        let concertId = concert.metadata.identifier.replace(/([^a-z0-9]+)/gi, '');

        let songToSave = {
            title: song.title,
            artist: song.creator,
            track: song.track,
            album: song.album,
            length: song.length,
            file: song.name,
            concertId: concertId,
            //@todo: figure out how to remove this requirement of having `url` for soundManager2, or at least have it be a custom property name
            url: archiveUrl,
            //@todo: figure out how to remove this requirement of having `id` for soundManager2
            id: song.name
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
