let ArchiveOrgService = function ($log, $http,ConcertService) {
    "ngInject";

    const user = {};

    // let getConcertById = (concertId) => {
    //     $log.log('Hitting ArchiveService');
    //
    //     // let concertId = 'sci2004-06-19.flac16';
    //     let concertUrl = 'http://archive.org/details/sci2004-06-19.flac16?output=json&callback=JSON_CALLBACK';
    //
    //     $http.jsonp(concertUrl)
    //         .then(function(response) {
    //             debugger;
    //             console.log('ArchiveOrgService. jsonp repo', response);
    //             ConcertService.parseArchiveOrgConcert(response);
    //     }, function(err){
    //             debugger;
    //         })
    //
    // };

    return {
        // getConcertById
    };
};

export default ArchiveOrgService;
