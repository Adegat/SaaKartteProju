{
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
}


$(function() {
    continentInfo();
    $('#continentMenu').on('change', onValueChange);
    function onValueChange() {
        console.log('Valittu arvo:' +this.value);
        console.log('Valittu teksti: '+$('#continentMenu option:selected').text());
        countryFilter(this.value);
        console.log(this.value);
        console.log("continentMenu loppu");
    }
    $('#countryMenu').on('change', onValueChangeCou);
    function onValueChangeCou() {
        console.log('Valittu arvo:' +this.value);
        console.log('Valittu teksti: '+$('#countryMenu option:selected').text());
        addCountryKnowledgeToDiv(this.value);
        console.log(this.value);
    }
    /*
    function appendToCountryDropdown(id,name) {
        console.log(this.id);
        $('#countryMenu').append('<option>'+id+","+name+'</option>');
    }


    function appendToMovieDiv(html) {
        $('#movieContainer').append(html+'<br/>');
    }

        function countryInfo(latitude, longitude) {
            $.ajax({
                'url': 'http://api.geonames.org/countryInfo?username=demo',
                'dataType': 'json',
                'data': {
                    'lat': latitude,
                    'lng': longitude,
                    'radius': 20,
                    'username': 'almix',
                },
                'success': articlesLoaded,
            });
        }

        function articlesLoaded(data) {
            clearWikipediaMarkers();
            data.geonames.forEach(handleArticle);
        }
*/
    function continentInfo() {
        console.log("countryInfo")
        $.ajax({
            'url': 'http://api.geonames.org/countryInfo?username=Dega',
            'dataType': 'xml',
            'success': countryInfoLoaded,
    });
    }
var countKnow =[];
    function countryInfoLoaded(data) {
        var allCountries = {};
        var continents = {};
        var countryKnow = {};

        $(data).find('country').each(function () {
            var countryCode = $(this).find('countryCode').text();
            var countryName = $(this).find('countryName').text();
            var isoNumeric = $(this).find('isoNumeric').text();
            var isoAlpha3 = $(this).find('isoAlpha3').text();
            var fipsCode = $(this).find('fipsCode').text();
            var continent = $(this).find('continent').text();
            var continentName = $(this).find('continentName').text();
            var capital = $(this).find('capital').text();
            var areaInSqKm = $(this).find('areaInSqKm').text();
            var population = $(this).find('population').text();
            var currencyCode = $(this).find('currencyCode').text();
            var languages = $(this).find('languages').text();
            var geonameId = $(this).find('geonameId').text();
            var west = $(this).find('west').text();
            var north = $(this).find('north').text();
            var east = $(this).find('east').text();
            var south = $(this).find('south').text();
            var postalCodeFormat = $(this).find('postalCodeFormat').text();
            countryKnow;
            allCountries[countryCode] = countryName;
            continents[continent] = continentName;
            countKnow.push({
                countryCode: countryCode,
                countryName: countryName,
                isoNumeric: isoNumeric,
                isoAlpha3: isoAlpha3,
                fipsCode: fipsCode,
                continent: continent,
                continentName: continentName,
                capital: capital,
                areaInSqKm: areaInSqKm,
                population: population,
                currencyCode: currencyCode,
                languages: languages,
                geonameId: geonameId,
                west: west,
                north: north,
                east: east,
                south: south,
                postalCodeFormat: postalCodeFormat
            });

        });
        addCountryToMenu(allCountries);
        addContinentToMenu(continents);
    }
    function addContinentToMenu(theatresObject) {
        for (var key of Object.keys(theatresObject)) {
            $('#continentMenu').append('<option value="'+key+'">'+key+", "+theatresObject[key]+'</option>');
        }
        console.log('continent loaded');
    }
    function addCountryToMenu(theatresObject) {
        for (var key of Object.keys(theatresObject)) {
            $('#countryMenu').append('<option value="'+key+'">'+key+", "+theatresObject[key]+'</option>');
        }
        console.log('country loaded');
    };
    console.log('page ready!');

    function countryFilter(continent) {
        $('#countryMenu').empty();
        countKnow.filter(function(move){
            var Cont = move.continent.split(", ")[0];
            return Cont.indexOf(continent) != -1;
        }).forEach(function addCountryToMenu(theatresObject) {
                $('#countryMenu').append(
                    '<option>'+theatresObject.countryCode+
                    ", " +theatresObject.countryName+'</option>');
        });
    }

      function addCountryKnowledgeToDiv(country) {
          $('#Knowledge').empty();
          var Count = country.split(", ")[0];
          countKnow.filter(function(move){
              var Cont = move.countryCode.split(", ")[0];
              return Cont.indexOf(Count) != -1;
          }).forEach(function addCountryToMenu(theatresObject) {
              $('#Knowledge').append(
                  '<div>'+"  Country Code: "+theatresObject.countryCode+
                  "<br>" +"  Country Name: "+theatresObject.countryName+
                  "<br>" +"  isoNumeric: "+theatresObject.isoNumeric+
                  "<br>" +"  isoAlpha3 "+theatresObject.isoAlpha3+
                  "<br>" +"  fipsCode: "+theatresObject.fipsCode+
                  "<br>" +"  Continent: "+theatresObject.continent+
                  "<br>" +"  Continent Name: "+theatresObject.continentName+
                  "<br>" +"  Capital: "+theatresObject.capital+
                  "<br>" +"  Area In SqKm: "+theatresObject.areaInSqKm+
                  "<br>" +"  Population: "+theatresObject.population+
                  "<br>" +"  Currency Code: "+theatresObject.currencyCode+
                  "<br>" +"  Languages: "+theatresObject.languages+
                  "<br>" +"  Geoname Id: "+theatresObject.geonameId+
                  "<br>" +"  West: "+theatresObject.west+
                  "<br>" +"  North: "+theatresObject.north+
                  "<br>" +"  East: "+theatresObject.east+
                  "<br>" +"  South: "+theatresObject.south+
                  "<br>" +"  Postal Code Format: "+theatresObject.postalCodeFormat+'</div>');
              console.log('Knowledge loaded');
          });

        }


});
