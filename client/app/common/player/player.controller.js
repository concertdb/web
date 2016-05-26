class PlayerController {

    constructor($http) {
        "ngInject";

        this.http = $http;

        this.name = 'player';
        this.songs = this.getSongs();
        this.archive = this.getArchive();
    };

    getSongs(){

        return [
            {
                id: '1',
                url: 'https://ia802700.us.archive.org/31/items/sci2007-08-12.Schoeps/sci2007-08-12.Schoeps_d3t01.mp3',
                source: "derivative",
                creator: "String Cheese Incident",
                title: "Rhythm of the Road",
                track: "21",
                album: "2007-08-12 - Red Rocks Amphitheatre",
                bitrate: "191",
                length: "12:40",
                format: "VBR MP3",
                original: "sci2007-08-12.Schoeps_d3t01.flac",
                mtime: "1429316847",
                size: "18184192",
                md5: "7166059ca8755c9a2366c94c8f436255",
                crc32: "7d6e51fa",
                sha1: "d4ba258246160fda4def96030be5048fe5f85953",
                height: "0",
                width: "0"
            },
            {
                id: '2',
                url: 'https://ia802700.us.archive.org/31/items/sci2007-08-12.Schoeps/sci2007-08-12.Schoeps_d3t02.mp3',
                source: "derivative",
                creator: "String Cheese Incident",
                title: "Bumpin' Reel",
                track: "22",
                album: "2007-08-12 - Red Rocks Amphitheatre",
                bitrate: "196",
                length: "11:20",
                format: "VBR MP3",
                original: "sci2007-08-12.Schoeps_d3t02.flac",
                mtime: "1429317175",
                size: "16677376",
                md5: "8483c00dce289cf35621a62aa62da86d",
                crc32: "3bf24818",
                sha1: "b6cd02aeea578991d23dab69d1ca2f1e4ed4fd59",
                height: "0",
                width: "0"
            }
        ];

    }

    // getArchive(){
    //
    //     var concertUrl = 'http://archive.org/details/sci2004-06-19.flac16?output=json&callback=JSON_CALLBACK';
    //
    //     this.http({
    //         method: 'GET',
    //         url: concertUrl,
    //         withCredentials: true,
    //         headers: {
    //             'Access-Control-Allow-Origin': window.location.origin,
    //             'Cache-Control': ['no-cache', 'max-age=0', 'must-revalidate', 'no-store']
    //         }
    //     }).then(function(data){},function(err){});
    // }

    getArchive(){

        var concertUrl = 'http://archive.org/details/sci2004-06-19.flac16?output=json&callback=JSON_CALLBACK';

        this.http
            .jsonp( concertUrl )
            .then(
                function getArchiveSuccess(response) {
                    console.log(response.data)
                    console.log(response.data.server);
                },
                function getArchiveError(error) {
                    console.log('There was an error getting the data', err);
                });
    }
}



export default PlayerController;
