// class ConcertController {
//     constructor() {
//         this.name = 'concert';
//     }
// }

function concertController($http){
    "ngInject";
    var http = $http;

    var vm = this;
    var songService = {};

    vm.name = 'concert';
    vm.concert = [];

    songService.getConcert = function getConcert() {

        var concertUrl = 'http://archive.org/details/sci2004-06-19.flac16?output=json&callback=JSON_CALLBACK';

        return http.jsonp(concertUrl);

    };
    songService.getConcert().then(function(response){
        // vm.archive = response.data.files
        // console.log(response.data.files);
        // response.data.files.forEach(function(file){
        //     if(file.format === 'VBR MP3'){
        //         tempArr.push(file)
        //     }
        // });
        // vm.archive = tempArr;

        var songArray = [];
        for(var item in response.data.files){
            // this condition is required to prevent moving forward to prototype chain
            if(response.data.files.hasOwnProperty(item)){
                console.log(item);
                songArray.push(response.data.files[item]);
            }
        }
        vm.concert = songArray;
    });
}

export default concertController;
