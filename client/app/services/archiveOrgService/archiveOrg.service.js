let ArchiveOrgService = function ($log, $http, ConcertService) {
    "ngInject";
    const ArchiveOrgService = this;


    ArchiveOrgService.getConcertById = (concertId) => {
        $log.log('Hitting ArchiveService');
        // concertId = 'sci2004-06-19.flac16';
        let concertUrl = 'http://archive.org/metadata/' + concertId + '?callback=JSON_CALLBACK';

        return $http.jsonp(concertUrl);
    };

    ArchiveOrgService.getConcertSearchResults = (concertSearchForm) => {

        let {artist, year} = concertSearchForm;
        // if (artist && year){
        let artistQueryString = artist.trim().toLowerCase().split(' ').join('+');
        let yearQueryString = parseInt(year.trim());

        return $http.jsonp('https://archive.org/advancedsearch.php?q=creator%3A%28' + artistQueryString + '%29%26title%3A%28' + yearQueryString + '%29&fl%5B%5D=collection&fl%5B%5D=coverage&fl%5B%5D=creator&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=year&sort%5B%5D=date+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&callback=JSON_CALLBACK');
    
    };

    // return {
    //     getConcertById,
    //     getConcertSearchResults
    // };
};

export default ArchiveOrgService;
