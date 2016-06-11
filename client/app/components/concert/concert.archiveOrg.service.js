import _ from 'lodash';

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
        let yearQueryString = parseInt(year.trim(), 10);

        return $http.jsonp('https://archive.org/advancedsearch.php?q=creator%3A%28' + artistQueryString + '%29%26title%3A%28' + yearQueryString + '%29&fl%5B%5D=collection&fl%5B%5D=coverage&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=date+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=JSON_CALLBACK');

    };

    /**
     * Unmodified concert response object from Archive.org
     * @param concert
     */
    let parseArchiveOrgConcert = (concert) => {
        $log.info('ArchiveOrgService#parseArchiveOrgConcert');

        //Transform the concert response into desired concert {}
        //@todo: concertId manipulation. Figure out different way to get unique id for concert. This was done to prevent issue #XXXX.
        let concertId = concert.metadata.identifier.replace(/([^a-z0-9]+)/gi, '');
        let archiveUrl = `http://archive.org/details/${concert.metadata.identifier}`;
        let formattedConcertObject = {
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


        //Transform the concert response's Songs into desired songs [{}, {},...]
        let formattedSongsArray;
        let unformattedSongsArray = concert.files;
        //Create new array of only songs that are VBR MP3 format
        let mp3Array = unformattedSongsArray.filter(function(song){
            return song.format === 'VBR MP3';
        });

        if (mp3Array.length) { //Ensure there are songs that we can play (i.e. mp3's in the mp3Array)
            let ArchiveOrgService = this;
            //Create new array of formatted songs. These will be persisted and only have the properties we care about.
            formattedSongsArray = _.map(mp3Array, function(unformattedMp3){
                return ArchiveOrgService.parseArchiveOrgSong(unformattedMp3, concert);
            });
        }


        //Return the formatted Concert {} and Songs [] to ConcertService for local/remote persistence.
        ConcertService.setCurrentConcert(formattedConcertObject, formattedSongsArray);
    };

    /**
     * Take an unformatted song from Archive.org and return a new object with only the properties we care about.
     * @param {Object} song - unformatted song object from Archive.org
     * @param {Object} concert - unformatted concert object from Archive.org
     * @returns {{title: *, artist: string, track: (*|boolean|TimedTrack), album: *, length: *, file: *, concertId: string, url: string, id: *}}
     */
    let parseArchiveOrgSong = (song, concert) => {
        $log.info('ArchiveOrgService#parseArchiveOrgSong');
        let archiveUrl = `https://${concert.d1}${concert.dir}/${song.name}`;
        //@todo: concertId manipulation. Figure out different way to get unique id for concert. This was done to prevent issue #XXXX.
        let concertId = concert.metadata.identifier.replace(/([^a-z0-9]+)/gi, '');

        let songToSave = {
            title: song.title,
            artist: song.creator,
            track: song.track,
            format: song.format,
            album: song.album,
            length: song.length,
            file: song.name,
            concertId: concertId,
            //@todo: figure out how to remove this requirement of having `url` for soundManager2, or at least have it be a custom property name
            url: archiveUrl,
            //@todo: figure out how to remove this requirement of having `id` for soundManager2
            id: song.name
        };

        return songToSave;
    };

    ///////////////////////////////////////////////

    this.getConcertById = getConcertById;
    this.getConcertSearchResults = getConcertSearchResults;
    this.parseArchiveOrgConcert = parseArchiveOrgConcert;
    this.parseArchiveOrgSong = parseArchiveOrgSong;
};

export default ArchiveOrgService;
