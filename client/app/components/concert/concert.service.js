//@todo: inject SongService
import config from '../../../../dev-workspace/config';

let ConcertService = function ($log, $window, $http) {
    "ngInject";

    const ConcertService = this;
    const db = $window.PouchDB('concertDbLocal');

    //LocalCache interactions
    let setCurrentConcert = (concertObject, songsArray) => {
        //leave this part in to maintain existing functionality for now
        this.currentConcert[concertObject.concertId] = concertObject;
        this.concertSongs[concertObject.concertId] = songsArray;

        // update or create in PouchDb
        //@todo: Promises. Refactor this into various methods... make it readable and maintainable...
        //@todo: PouchDB. Figure out why this update/create flow is required.
        db.get(concertObject.concertId).then(function(foundConcert) {
            return db.put({
                _id: foundConcert._id,
                _rev: foundConcert._rev,
                concert: concertObject,
                playlist: songsArray
            });

        }).then(function(response) {
            // handle response of an existing concertAndPlaylist {} in PouchDB

        }).catch(function (error) {
            // there is no existing doc to update
            if (error.name === 'not_found'){
                //so create it...
                db.put({
                    _id: concertObject.concertId,
                    concert: concertObject,
                    playlist: songsArray

                }).then(function (response) {
                    // handle response of a newly created concertAndPlaylist {} in PouchDB
                    //@todo: communicate that the new concertAndPlaylist {} is available in PouchDB to the concertItemController.

                }).catch(function (error) {
                    $log.error(error);
                });

            } else {
                $log.error(error);
            }
        });
    };
    let getCurrentConcert = (concertId) => {
        return this.currentConcert[concertId] || {};
    };
    let getCurrentConcertSongs = (concertId) => {
        return this.concertSongs[concertId];
    };

    //DB interactions
    let getConcertFromDb = (concertId) => {
        return $http.get(config.api + 'concert_recordings/'+ concertId);
    };

    /**
     * Post the new concert object to the back-end db
     *
     * @param {object} concert - the concert object retrieved from a third-party API
     * @param {string} concert.date - formatted date/time. Format: 'YYYY-MM-DD'
     * @param {string} concert.creator -
     * @param {object} concertMetadata - the concert details I actually care about enough to store in my DB
     * @returns {Object} Promise - The Promise from saving to my DB.
     */
    let createConcertRecording = (concert, concertMetadata) => {
        let {date, creator, coverage, venue, description, notes, taper, source} = concertMetadata;

        let concertRecordingToSave = {
            name: concert.data.dir,
            archive_url: concert.data.d1,
            artist: creator,
            date: date,
            //@todo: createConcertRecording. year prop missing?
            location: coverage,
            venue: venue,
            description: description,
            notes: notes,
            source_info: source,
            taper: taper
        };

        return $http.post(config.api +'concert_recordings', concertRecordingToSave);
    };

    /////////////////////////////////////////////////////

    //Service cache
    this.concertSongs = {};
    this.currentConcert = {};
    this.searchResults = [];

    this.current = {
        artist: {
            name: 'String Cheese Incident'
        },
        year: {
            name: '2016'
        },
        searchResults: []
    };

    //Service methods
    this.getConcertFromDb = getConcertFromDb;
    // this.parseArchiveOrgConcert = parseArchiveOrgConcert;
    this.createConcertRecording = createConcertRecording;
    this.setCurrentConcert = setCurrentConcert;
    this.getCurrentConcert = getCurrentConcert;
};

export default ConcertService;
