//@todo: inject SongService
import config from '../../../../dev-workspace/config';

let ConcertService = function ($log, $http) {
    "ngInject";

    const ConcertService = this;

    //LocalCache interactions
    let setCurrentConcert = (concertObject) => {
        // db.put({
        //     _id: 'mydoc',
        //     title: 'Heroes'
        // }).then(function (response) {
        //     // handle response
        // }).catch(function (err) {
        //     console.log(err);
        // });
        this.currentConcert[concertObject.concertId] = concertObject;
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
