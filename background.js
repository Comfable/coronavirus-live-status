var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'USA',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};


var isoStates = {
    "Alabama" : "AL",
    "Alaska" : "AK",
    "American Samoa" : "AS",
    "Arizona" : "AZ",
    "Arkansas" : "AR",
    "California" : "CA",
    "Colorado" : "CO",
    "Connecticut" : "CT",
    "Delaware" : "DE",
    "District Of Columbia" : "DC",
    "Federated States Of Micronesia" : "FM",
    "Florida" : "FL",
    "Georgia" : "GA",
    "Guam" : "GU",
    "Hawaii" : "HI",
    "Idaho" : "ID",
    "Illinois" : "IL",
    "Indiana" : "IN",
    "Iowa" : "IA",
    "Kansas" : "KS",
    "Kentucky" : "KY",
    "Louisiana" : "LA",
    "Maine" : "ME",
    "Marshall Islands" : "MH",
    "Maryland" : "MD",
    "Massachusetts" : "MA",
    "Michigan" : "MI",
    "Minnesota" : "MN",
    "Mississippi" : "MS",
    "Missouri" : "MO",
    "Montana" : "MT",
    "Nebraska" : "NE",
    "Nevada" : "NV",
    "New Hampshire" : "NH",
    "New Jersey": "NJ",
    "New Mexico" : "NM",
    "New York" : "NY",
    "North Carolina" : "NC",
    "North Dakota" : "ND",
    "Northern Mariana Islands" :"MP",
    "Ohio" : "OH",
    "Oklahoma" : "OK",
    "Oregon" : "OR",
    "Palau" : "PW",
    "Pennsylvania" : "PA",
    "Puerto Rico" : "PR",
    "Rhode Island" : "RI",
    "South Carolina" : "SC",
    "South Dakota" : "SD",
    "Tennessee" : "TN",
    "Texas" : "TX",
    "Utah" : "UT",
    "Vermont" : "VT",
    "Virgin Islands" : "VI",
    "Virginia" : "VA",
    "Washington" : "WA",
    "West Virginia" : "WV",
    "Wisconsin" : "WI",
    "Wyoming" : "WY"
};


function getCountryName(countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
};

function getIsoState(state) {
    if (isoStates.hasOwnProperty(state)) {
        return isoStates[state];
    } else {
        return 'NY';
    }
};


chrome.storage.local.get(['verUpdate'], function(data) {
	verUpdate = data.verUpdate;

	if(verUpdate !== 3) {
			fetch('https://ipinfo.io/?token=6d819142de4288')
		  	.then((resp) => resp.json())
		  	 .then(function(result) {
		  	 	if(result) {
					countryAPI = JSON.stringify(result.country);
					country = (countryAPI.split('"'))[1];
                    //country = "JP";
					if(country == "ZZ") {
							country = "US"
						}
                    city = JSON.stringify(result.city);
					region = (JSON.stringify(result.region).split('"'))[1];
                    if(country == "US" || country == "us") {
                        state = region;
                        chrome.storage.local.set({'state': state});
                        chrome.storage.local.set({'region': state});
                    }
                    else if(country == "HK") {
                        city = 'New York';
                        state = 'New York';
                        region = 'New York';
                        country = 'US';
                        latGeo =  '40.6639';
                        lngGeo =  '-73.9383';
                    }                    
                    else{
                        state = '0';
                        chrome.storage.local.set({'state': '0'});
                    }

                    latandlong = JSON.stringify(result.loc);
                    chrome.storage.local.set({'verUpdate': 3});
                    chrome.storage.local.set({'city': city});
					chrome.storage.local.set({'region': region});
					chrome.storage.local.set({'country': country});
                    latlong = (latandlong.split('"'))[1];
                    latGeo = (latlong.split(','))[0];
                    lngGeo = (latlong.split(','))[1];
                    chrome.storage.local.set({'latGeo': latGeo});
                    chrome.storage.local.set({'lngGeo': lngGeo});
                    badgeNum(city,region,country,latGeo,lngGeo,state);
               }
				else{
					country = 'US';	
                    chrome.storage.local.set({'verUpdate': 3});
					chrome.storage.local.set({'country': 'US'});
					chrome.storage.local.set({'region': 'New York'});
                    chrome.storage.local.set({'city': 'New York'});
                    chrome.storage.local.set({'latGeo': '40.6639'});
                    chrome.storage.local.set({'lngGeo': '-73.9383'});
                    chrome.storage.local.set({'state': 'New York'});
                    city = 'New York';
                    state = 'New York';
                    region = 'New York';
                    country = 'US';
                    latGeo =  '40.6639';
                    lngGeo =  '-73.9383';
					badgeNum(city,region,country,latGeo,lngGeo,state);
				}

        })
   
    }
});


chrome.runtime.onStartup.addListener(function(details) {
	chrome.storage.local.get(['city', 'region', 'country', 'latGeo', 'lngGeo', 'state'], function(data) { 
            city = data.city;
            region = data.region;
 			country = data.country;
            latGeo =  data.latGeo;
            lngGeo =  data.lngGeo;
            state =  data.state;
            if(typeof(state) == 'undefined') {
                state = region;
            }
			badgeNum(city,region,country,latGeo,lngGeo,state);
	});
});


chrome.runtime.onInstalled.addListener(function(details) {
	if(details.reason == "update") {
			chrome.storage.local.get(['city', 'region', 'country', 'latGeo', 'lngGeo', 'state'], function(data) {
                city = data.city;
                region = data.region;
	 			country = data.country;
                latGeo =  data.latGeo;
                lngGeo =  data.lngGeo;
                state =  data.state;
                if(typeof(state) == 'undefined') {
                    state = region;
                }
				badgeNum(city,region,country,latGeo,lngGeo,state);
			});
	}
});


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.msg == "intervalUpdateMessage") {
			intervalUpdateFunction();
		}
	}
);

function intervalUpdateFunction() {
	chrome.storage.local.get(['IntervalUpdate', ''], function(data) {
		intervalUpdateNumber = data.IntervalUpdate;
		if(typeof intervalUpdateNumber == 'undefined') {
			var intervalUpdateNumber = 60;
			chrome.storage.local.set({'IntervalUpdate': '60'});
		};
		intervalUpdateTime = 1000 * 60 * intervalUpdateNumber; //miliseconds * seconds * minutes

		var intervalUpdateTimes = window.setInterval(_ => {

				chrome.storage.local.get(['city', 'region', 'country', 'latGeo', 'lngGeo', 'state'], function(data){
                    city = data.city;
	 				region = data.region;
	 				country = data.country;
                    latGeo =  data.latGeo;
                    lngGeo =  data.lngGeo;
                    state =  data.state;
                    if(typeof(state) == 'undefined') {
                        state = region;
                    }
                    badgeNum(city,region,country,latGeo,lngGeo,state);
				});
		}, intervalUpdateTime);
	});
};
intervalUpdateFunction();


//badgeDisplay----------------------------------------------------------------------------------
function badgeUpdate(confirmed,deaths,country_full,last_updated,region,provinceConfirmed,provinceDeaths,state) {

		chrome.browserAction.setBadgeBackgroundColor({color: '#eb5569'});
		confirmedString = confirmed.toString();
        updated = moment(last_updated);
        if(confirmedString >= 1000000) {
            confirmedBadge = (confirmedString/1000000).toFixed(1) + 'm';
            chrome.browserAction.setBadgeText({"text":confirmedBadge});
        }        
        else if(confirmedString >= 100000) {
            confirmedBadge = (confirmedString/1000).toFixed(0) + 'k';
            chrome.browserAction.setBadgeText({"text":confirmedBadge});
        }
        else if(confirmedString >= 10000) {
			confirmedBadge = (confirmedString/1000).toFixed(1) + 'k';
            chrome.browserAction.setBadgeText({"text":confirmedBadge});
		}
        else {
            chrome.browserAction.setBadgeText({"text":confirmedString});
        }


		if (country == "US" || country == "us" || country == "United States of America" || country == "CA" || country == "ca" || country == "Canada") {
                if(country == "US" || country == "us") {
                    region = state;
                }
				updateTimeRelativeBadge = moment(last_updated).format('dddd, MMMM D') + " - Updated " + updated.fromNow();
                toolTipBadge = country_full +   ' - ' + updateTimeRelativeBadge + ' '  + ' ' +'\n' +  '----------------------' + '\n' + confirmed.toLocaleString(undefined, { minimumFractionDigits: 0 }) + '  ' + ' Confirmed' + '\n' + deaths.toLocaleString(undefined, { minimumFractionDigits: 0 }) + '  ' + ' Deaths' + 
                '\n' + '\n' + 
                region +  '\n' +  '----------------------' + '\n' + provinceConfirmed.toLocaleString(undefined, { minimumFractionDigits: 0 }) + '  ' + ' Confirmed' + '\n' + provinceDeaths.toLocaleString(undefined, { minimumFractionDigits: 0 }) + '  ' + ' Deaths' + 
                '   ';
                chrome.browserAction.setTitle({title: toolTipBadge});
            }
			else {
				updateTimeRelativeBadge = moment(last_updated).format('dddd, MMMM D') + " - Updated " + updated.fromNow();
                toolTipBadge = country_full +   ' - ' + updateTimeRelativeBadge + ' '  + ' ' +'\n' +  '----------------------' + '\n' + confirmed.toLocaleString(undefined, { minimumFractionDigits: 0 }) + '  ' + ' Confirmed' + '\n' + deaths.toLocaleString(undefined, { minimumFractionDigits: 0 }) + '  ' + ' Deaths';
                chrome.browserAction.setTitle({title: toolTipBadge});
			}
		
					
};


function badgeNum(city,region,country,latGeo,lngGeo,state) {
    if(country == "CA" || country == "ca") {
        fetch('https://covid19.mathdro.id/api/countries/' + country)
        .then((resp) => resp.json())
        .then(function(result) {       
                confirmed = result.confirmed.value;
                deaths = result.deaths.value;
                country_full = getCountryName(country);
                //last_updated = new Date();
                last_updated = result.lastUpdate;
                chrome.storage.local.set({'confirmed': confirmed});
                chrome.storage.local.set({'deaths': deaths});  
                chrome.storage.local.set({'last_updated': last_updated});

            fetch('https://covid19.mathdro.id/api/countries/' + country + '/confirmed')
            .then((resp) => resp.json())
            .then(function(result) {       
                   for(var i = 0; i < result.length; i++) {
                          if(result[i].provinceState == region)
                          {
                            provinceConfirmed = result[i].confirmed;
                            provinceDeaths = result[i].deaths;
                          }
                    }

                chrome.storage.local.set({'region': region});
                chrome.storage.local.set({'state': '-'});
                chrome.storage.local.set({'provinceConfirmed': provinceConfirmed});
                chrome.storage.local.set({'provinceDeaths': provinceDeaths});
                chrome.storage.local.set({'country_full': country_full});

                badgeUpdate(confirmed,deaths,country_full,last_updated,region,provinceConfirmed,provinceDeaths,state);
                    fetch('https://covid19.mathdro.id/api')
                    .then((resp) => resp.json())
                    .then(function(result) {  
                        worldConfirmed = result.confirmed.value;
                        worldDeaths = result.deaths.value;
                        chrome.storage.local.set({'worldConfirmed': worldConfirmed});
                        chrome.storage.local.set({'worldDeaths': worldDeaths});
                    });
            })
        })
    }     
    if(country == "US" || country == "us") {
                    fetch('https://covid19.mathdro.id/api/countries/' + country)
                    .then((resp) => resp.json())
                    .then(function(result) {       
                            confirmed = result.confirmed.value;
                            deaths = result.deaths.value;
                            country_full = getCountryName(country);
                            //last_updated = new Date();
                            last_updated = result.lastUpdate;
                            chrome.storage.local.set({'confirmed': confirmed});
                            chrome.storage.local.set({'deaths': deaths});
                            chrome.storage.local.set({'last_updated': last_updated});
                        isoState = getIsoState(state);
                        fetch('https://uv-weather.herokuapp.com/https://coronavirusapi.com/getTimeSeries/' + isoState)
                        .then((resp) => resp.text())
                        .then(function(result) {
                            result = result.split(/[\s,]+/);
                            provinceConfirmed = parseInt(result[result.length  - 2]);
                            provinceDeaths = parseInt(result[result.length  - 1]);
                            
                            chrome.storage.local.set({'region': state});
                            chrome.storage.local.set({'state': state});
                            chrome.storage.local.set({'provinceConfirmed': provinceConfirmed});
                            chrome.storage.local.set({'provinceDeaths': provinceDeaths});
                            chrome.storage.local.set({'country_full': country_full});
                            badgeUpdate(confirmed,deaths,country_full,last_updated,region,provinceConfirmed,provinceDeaths,state);
                                fetch('https://covid19.mathdro.id/api')
                                .then((resp) => resp.json())
                                .then(function(result) { 
                                    worldConfirmed = result.confirmed.value;
                                    worldDeaths = result.deaths.value;
                                    chrome.storage.local.set({'worldConfirmed': worldConfirmed});
                                    chrome.storage.local.set({'worldDeaths': worldDeaths});
                                });
                    })

            }); 

    }

    else if(country !== "US" && country !== "us" && country !== "CA" && country !== "ca") {
        fetch('https://uv-weather.herokuapp.com/https://covid19.mathdro.id/api/countries/' + country)
        .then((resp) => resp.json())
        .then(function(result) {       
                confirmed = result.confirmed.value;
                deaths = result.deaths.value;
                country_full = getCountryName(country);
                //last_updated = new Date();
                last_updated = result.lastUpdate;
                region = '-';
                provinceConfirmed = '-';
                provinceDeaths = '-';
                state = '-';

                chrome.storage.local.set({'confirmed': confirmed});
                chrome.storage.local.set({'deaths': deaths});  
                chrome.storage.local.set({'last_updated': last_updated});
                chrome.storage.local.set({'region': '-'});
                chrome.storage.local.set({'state': '-'});
                chrome.storage.local.set({'provinceConfirmed': '-'});
                chrome.storage.local.set({'provinceDeaths': '-'});
                chrome.storage.local.set({'country_full': country_full});

                badgeUpdate(confirmed,deaths,country_full,last_updated,region,provinceConfirmed,provinceDeaths,state);  

                fetch('https://uv-weather.herokuapp.com/https://covid19.mathdro.id/api')
                .then((resp) => resp.json())
                .then(function(result) {  
                    worldConfirmed = result.confirmed.value;
                    worldDeaths = result.deaths.value;
                    chrome.storage.local.set({'worldConfirmed': worldConfirmed});
                    chrome.storage.local.set({'worldDeaths': worldDeaths});                    
                }); 

        }); 
    }

};

