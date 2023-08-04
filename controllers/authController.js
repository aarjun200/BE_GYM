import userModel from '../models/userModel.js';
import pkg from 'bcryptjs';
const { genSalt, hash, compare } = pkg;
import pkgs from 'jsonwebtoken';
const { sign } = pkgs;

export async function signUp(req, res) {
    try {
        const { firstName, lastName, email, password, userType, phone, organizationName, partnerId } = req.body;
        let user = await userModel.findOne({ email });
        if (user)
        return res.status(400).json({ success: false, message: "Email Already Exists" });
        if(req.body.userType = 1){
          var active = 1
          user = new userModel({ firstName, lastName, email, password, userType, phone, organizationName, partnerId, active});
        }
        else{
          var active = 0
          user = new userModel({ firstName, lastName, email, password, userType, phone, organizationName, partnerId , active});
        }
        
        const salt = await genSalt(10);
        user.password = await hash(password, salt);
        await user.save();
        const payload = { id: user.id };
        sign(
            payload,
            "healthapp", {
            expiresIn: '10d'
        },
            (err, token) => {
                if (err)
                    throw err;
                res.status(200).json({
                    success: true, message: {
                        token: token,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phoneNumber: user.phone,
                        userType: user.userType,
                        organizationName: user.organizationName,
                        codeId: user.codeId,
                        active : user.active
                    }
                });
            }
        );
    }
    catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false, message: error.message });
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        let user = await userModel.findOne({ email});
        if (user) {
            const validPassword = await compare(password, user.password);
            if (validPassword) {
                const payload = {
                    id: user.id
                };

                sign(
                    payload,
                    "healthapp", {
                    expiresIn: '10d'
                },
                    (err, token) => {
                        if (err)
                            throw err;
                        //sendEmail("mishra.abhi8888@gmail.com")
                        res.status(200).json({
                            success: true, message: {
                                token: token,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                id: user._id,
                                phoneNumber: user.phone,
                                userType: user.userType,
                                organizationName: user.organizationName,
                                codeId : user.codeId,
                                active : user.active
                            }
                        });
                    }
                );
            }
            else {
                return res.status(400).json({
                    success: false, message: "Invalid email/password"
                });
            }
        }

        else {
            return res.status(400).json({
                success: false, message: "No user exists"
            });
        }
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}


export async function getState(req, res){
        try{
            var stateList = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
            res.status(200).json({success : true ,message: stateList})
        }
        catch (error) {
            res.status(200).json({success : false,message: error.message})
        }
}

export async function getCity(req, res){
    try{
      var New_York = [
          "New York",
          "Buffalo",
          "Rochester",
          "Yonkers",
          "Syracuse",
          "Albany",
          "New Rochelle",
          "Mount Vernon",
          "Schenectady",
          "Utica",
          "White Plains",
          "Hempstead",
          "Troy",
          "Niagara Falls",
          "Binghamton",
          "Freeport",
          "Valley Stream"
        ]
      var California = [
    "Los Angeles",
    "San Diego",
    "San Jose",
    "San Francisco",
    "Fresno",
    "Sacramento",
    "Long Beach",
    "Oakland",
    "Bakersfield",
    "Anaheim",
    "Santa Ana",
    "Riverside",
    "Stockton",
    "Chula Vista",
    "Irvine",
    "Fremont",
    "San Bernardino",
    "Modesto",
    "Fontana",
    "Oxnard",
    "Moreno Valley",
    "Huntington Beach",
    "Glendale",
    "Santa Clarita",
    "Garden Grove",
    "Oceanside",
    "Rancho Cucamonga",
    "Santa Rosa",
    "Ontario",
    "Lancaster",
    "Elk Grove",
    "Corona",
    "Palmdale",
    "Salinas",
    "Pomona",
    "Hayward",
    "Escondido",
    "Torrance",
    "Sunnyvale",
    "Orange",
    "Fullerton",
    "Pasadena",
    "Thousand Oaks",
    "Visalia",
    "Simi Valley",
    "Concord",
    "Roseville",
    "Victorville",
    "Santa Clara",
    "Vallejo",
    "Berkeley",
    "El Monte",
    "Downey",
    "Costa Mesa",
    "Inglewood",
    "Carlsbad",
    "San Buenaventura (Ventura)",
    "Fairfield",
    "West Covina",
    "Murrieta",
    "Richmond",
    "Norwalk",
    "Antioch",
    "Temecula",
    "Burbank",
    "Daly City",
    "Rialto",
    "Santa Maria",
    "El Cajon",
    "San Mateo",
    "Clovis",
    "Compton",
    "Jurupa Valley",
    "Vista",
    "South Gate",
    "Mission Viejo",
    "Vacaville",
    "Carson",
    "Hesperia",
    "Santa Monica",
    "Westminster",
    "Redding",
    "Santa Barbara",
    "Chico",
    "Newport Beach",
    "San Leandro",
    "San Marcos",
    "Whittier",
    "Hawthorne",
    "Citrus Heights",
    "Tracy",
    "Alhambra",
    "Livermore",
    "Buena Park",
    "Menifee",
    "Hemet",
    "Lakewood",
    "Merced",
    "Chino",
    "Indio",
    "Redwood City",
    "Lake Forest",
    "Napa",
    "Tustin",
    "Bellflower",
    "Mountain View",
    "Chino Hills",
    "Baldwin Park",
    "Alameda",
    "Upland",
    "San Ramon",
    "Folsom",
    "Pleasanton",
    "Union City",
    "Perris",
    "Manteca",
    "Lynwood",
    "Apple Valley",
    "Redlands",
    "Turlock",
    "Milpitas",
    "Redondo Beach",
    "Rancho Cordova",
    "Yorba Linda",
    "Palo Alto",
    "Davis",
    "Camarillo",
    "Walnut Creek",
    "Pittsburg",
    "South San Francisco",
    "Yuba City",
    "San Clemente",
    "Laguna Niguel",
    "Pico Rivera",
    "Montebello",
    "Lodi",
    "Madera",
    "Santa Cruz",
    "La Habra",
    "Encinitas",
    "Monterey Park",
    "Tulare",
    "Cupertino",
    "Gardena",
    "National City",
    "Rocklin",
    "Petaluma",
    "Huntington Park",
    "San Rafael",
    "La Mesa",
    "Arcadia",
    "Fountain Valley",
    "Diamond Bar",
    "Woodland",
    "Santee",
    "Lake Elsinore",
    "Porterville",
    "Paramount",
    "Eastvale",
    "Rosemead",
    "Hanford",
    "Highland",
    "Brentwood",
    "Novato",
    "Colton",
    "Cathedral City",
    "Delano",
    "Yucaipa",
    "Watsonville",
    "Placentia",
    "Glendora",
    "Gilroy",
    "Palm Desert",
    "Cerritos",
    "West Sacramento",
    "Aliso Viejo",
    "Poway",
    "La Mirada",
    "Rancho Santa Margarita",
    "Cypress",
    "Dublin",
    "Covina",
    "Azusa",
    "Palm Springs",
    "San Luis Obispo",
    "Ceres",
    "San Jacinto",
    "Lincoln",
    "Newark",
    "Lompoc",
    "El Centro",
    "Danville",
    "Bell Gardens",
    "Coachella",
    "Rancho Palos Verdes",
    "San Bruno",
    "Rohnert Park",
    "Brea",
    "La Puente",
    "Campbell",
    "San Gabriel",
    "Beaumont",
    "Morgan Hill",
    "Culver City",
    "Calexico",
    "Stanton",
    "La Quinta",
    "Pacifica",
    "Montclair",
    "Oakley",
    "Monrovia",
    "Los Banos",
    "Martinez"
        ]
      var Illinois =  [
    "Chicago",
    "Aurora",
    "Rockford",
    "Joliet",
    "Naperville",
    "Springfield",
    "Peoria",
    "Elgin",
    "Waukegan",
    "Cicero",
    "Champaign",
    "Bloomington",
    "Arlington Heights",
    "Evanston",
    "Decatur",
    "Schaumburg",
    "Bolingbrook",
    "Palatine",
    "Skokie",
    "Des Plaines",
    "Orland Park",
    "Tinley Park",
    "Oak Lawn",
    "Berwyn",
    "Mount Prospect",
    "Normal",
    "Wheaton",
    "Hoffman Estates",
    "Oak Park",
    "Downers Grove",
    "Elmhurst",
    "Glenview",
    "DeKalb",
    "Lombard",
    "Belleville",
    "Moline",
    "Buffalo Grove",
    "Bartlett",
    "Urbana",
    "Quincy",
    "Crystal Lake",
    "Plainfield",
    "Streamwood",
    "Carol Stream",
    "Romeoville",
    "Rock Island",
    "Hanover Park",
    "Carpentersville",
    "Wheeling",
    "Park Ridge",
    "Addison",
    "Calumet City"
        ]
      var Texas =  [
    "Houston",
    "San Antonio",
    "Dallas",
    "Austin",
    "Fort Worth",
    "El Paso",
    "Arlington",
    "Corpus Christi",
    "Plano",
    "Laredo",
    "Lubbock",
    "Garland",
    "Irving",
    "Amarillo",
    "Grand Prairie",
    "Brownsville",
    "Pasadena",
    "McKinney",
    "Mesquite",
    "McAllen",
    "Killeen",
    "Frisco",
    "Waco",
    "Carrollton",
    "Denton",
    "Midland",
    "Abilene",
    "Beaumont",
    "Round Rock",
    "Odessa",
    "Wichita Falls",
    "Richardson",
    "Lewisville",
    "Tyler",
    "College Station",
    "Pearland",
    "San Angelo",
    "Allen",
    "League City",
    "Sugar Land",
    "Longview",
    "Edinburg",
    "Mission",
    "Bryan",
    "Baytown",
    "Pharr",
    "Temple",
    "Missouri City",
    "Flower Mound",
    "Harlingen",
    "North Richland Hills",
    "Victoria",
    "Conroe",
    "New Braunfels",
    "Mansfield",
    "Cedar Park",
    "Rowlett",
    "Port Arthur",
    "Euless",
    "Georgetown",
    "Pflugerville",
    "DeSoto",
    "San Marcos",
    "Grapevine",
    "Bedford",
    "Galveston",
    "Cedar Hill",
    "Texas City",
    "Wylie",
    "Haltom City",
    "Keller",
    "Coppell",
    "Rockwall",
    "Huntsville",
    "Duncanville",
    "Sherman",
    "The Colony",
    "Burleson",
    "Hurst",
    "Lancaster",
    "Texarkana",
    "Friendswood",
    "Weslaco"
        ]
      var Pennsylvania =  [
        "Philadelphia",
        "Pittsburgh",
        "Allentown",
        "Erie",
        "Reading",
        "Scranton",
        "Bethlehem",
        "Lancaster",
        "Harrisburg",
        "Altoona",
        "York",
        "State College",
        "Wilkes-Barre"
        ]
      var Arizona =  [
    "Phoenix",
    "Tucson",
    "Mesa",
    "Chandler",
    "Glendale",
    "Scottsdale",
    "Gilbert",
    "Tempe",
    "Peoria",
    "Surprise",
    "Yuma",
    "Avondale",
    "Goodyear",
    "Flagstaff",
    "Buckeye",
    "Lake Havasu City",
    "Casa Grande",
    "Sierra Vista",
    "Maricopa",
    "Oro Valley",
    "Prescott",
    "Bullhead City",
    "Prescott Valley",
    "Marana",
    "Apache Junction"
        ]
      var Florida =  [
    "Jacksonville",
    "Miami",
    "Tampa",
    "Orlando",
    "St. Petersburg",
    "Hialeah",
    "Tallahassee",
    "Fort Lauderdale",
    "Port St. Lucie",
    "Cape Coral",
    "Pembroke Pines",
    "Hollywood",
    "Miramar",
    "Gainesville",
    "Coral Springs",
    "Miami Gardens",
    "Clearwater",
    "Palm Bay",
    "Pompano Beach",
    "West Palm Beach",
    "Lakeland",
    "Davie",
    "Miami Beach",
    "Sunrise",
    "Plantation",
    "Boca Raton",
    "Deltona",
    "Largo",
    "Deerfield Beach",
    "Palm Coast",
    "Melbourne",
    "Boynton Beach",
    "Lauderhill",
    "Weston",
    "Fort Myers",
    "Kissimmee",
    "Homestead",
    "Tamarac",
    "Delray Beach",
    "Daytona Beach",
    "North Miami",
    "Wellington",
    "North Port",
    "Jupiter",
    "Ocala",
    "Port Orange",
    "Margate",
    "Coconut Creek",
    "Sanford",
    "Sarasota",
    "Pensacola",
    "Bradenton",
    "Palm Beach Gardens",
    "Pinellas Park",
    "Coral Gables",
    "Doral",
    "Bonita Springs",
    "Apopka",
    "Titusville",
    "North Miami Beach",
    "Oakland Park",
    "Fort Pierce",
    "North Lauderdale",
    "Cutler Bay",
    "Altamonte Springs",
    "St. Cloud",
    "Greenacres",
    "Ormond Beach",
    "Ocoee",
    "Hallandale Beach",
    "Winter Garden",
    "Aventura"
        ]
      var Indiana = [
    "Indianapolis",
    "Fort Wayne",
    "Evansville",
    "South Bend",
    "Carmel",
    "Bloomington",
    "Fishers",
    "Hammond",
    "Gary",
    "Muncie",
    "Lafayette",
    "Terre Haute",
    "Kokomo",
    "Anderson",
    "Noblesville",
    "Greenwood",
    "Elkhart",
    "Mishawaka",
    "Lawrence",
    "Jeffersonville",
    "Columbus",
    "Portage"
        ]
      var Ohio = [
    "Columbus",
    "Cleveland",
    "Cincinnati",
    "Toledo",
    "Akron",
    "Dayton",
    "Parma",
    "Canton",
    "Youngstown",
    "Lorain",
    "Hamilton",
    "Springfield",
    "Kettering",
    "Elyria",
    "Lakewood",
    "Cuyahoga Falls",
    "Middletown",
    "Euclid",
    "Newark",
    "Mansfield",
    "Mentor",
    "Beavercreek",
    "Cleveland Heights",
    "Strongsville",
    "Dublin",
    "Fairfield",
    "Findlay",
    "Warren",
    "Lancaster",
    "Lima",
    "Huber Heights",
    "Westerville",
    "Marion",
    "Grove City"
        ]
      var North_Carolina =  [
    "Charlotte",
    "Raleigh",
    "Greensboro",
    "Durham",
    "Winston-Salem",
    "Fayetteville",
    "Cary",
    "Wilmington",
    "High Point",
    "Greenville",
    "Asheville",
    "Concord",
    "Gastonia",
    "Jacksonville",
    "Chapel Hill",
    "Rocky Mount",
    "Burlington",
    "Wilson",
    "Huntersville",
    "Kannapolis",
    "Apex",
    "Hickory",
    "Goldsboro"
        ]
      var Michigan =  [
    "Detroit",
    "Grand Rapids",
    "Warren",
    "Sterling Heights",
    "Ann Arbor",
    "Lansing",
    "Flint",
    "Dearborn",
    "Livonia",
    "Westland",
    "Troy",
    "Farmington Hills",
    "Kalamazoo",
    "Wyoming",
    "Southfield",
    "Rochester Hills",
    "Taylor",
    "Pontiac",
    "St. Clair Shores",
    "Royal Oak",
    "Novi",
    "Dearborn Heights",
    "Battle Creek",
    "Saginaw",
    "Kentwood",
    "East Lansing",
    "Roseville",
    "Portage",
    "Midland",
    "Lincoln Park",
    "Muskegon"
        ]
      var Tennessee = [
        "Memphis",
        "Nashville-Davidson",
        "Knoxville",
        "Chattanooga",
        "Clarksville",
        "Murfreesboro",
        "Jackson",
        "Franklin",
        "Johnson City",
        "Bartlett",
        "Hendersonville",
        "Kingsport",
        "Collierville",
        "Cleveland",
        "Smyrna",
        "Germantown",
        "Brentwood"
        ]
      var Massachusetts = [
        "Boston",
        "Worcester",
        "Springfield",
        "Lowell",
        "Cambridge",
        "New Bedford",
        "Brockton",
        "Quincy",
        "Lynn",
        "Fall River",
        "Newton",
        "Lawrence",
        "Somerville",
        "Waltham",
        "Haverhill",
        "Malden",
        "Medford",
        "Taunton",
        "Chicopee",
        "Weymouth Town",
        "Revere",
        "Peabody",
        "Methuen",
        "Barnstable Town",
        "Pittsfield",
        "Attleboro",
        "Everett",
        "Salem",
        "Westfield",
        "Leominster",
        "Fitchburg",
        "Beverly",
        "Holyoke",
        "Marlborough",
        "Woburn",
        "Chelsea"
        ]
      var Washington = [
        "Seattle",
        "Spokane",
        "Tacoma",
        "Vancouver",
        "Bellevue",
        "Kent",
        "Everett",
        "Renton",
        "Yakima",
        "Federal Way",
        "Spokane Valley",
        "Bellingham",
        "Kennewick",
        "Auburn",
        "Pasco",
        "Marysville",
        "Lakewood",
        "Redmond",
        "Shoreline",
        "Richland",
        "Kirkland",
        "Burien",
        "Sammamish",
        "Olympia",
        "Lacey",
        "Edmonds",
        "Bremerton",
        "Puyallup"
        ]
      var Colorado = [
        "Denver",
        "Colorado Springs",
        "Aurora",
        "Fort Collins",
        "Lakewood",
        "Thornton",
        "Arvada",
        "Westminster",
        "Pueblo",
        "Centennial",
        "Boulder",
        "Greeley",
        "Longmont",
        "Loveland",
        "Grand Junction",
        "Broomfield",
        "Castle Rock",
        "Commerce City",
        "Parker",
        "Littleton",
        "Northglenn"
        ]
      var District_of_Columbia =  [
        "Washington"
        ]
      var Maryland = [
        "Baltimore",
        "Frederick",
        "Rockville",
        "Gaithersburg",
        "Bowie",
        "Hagerstown",
        "Annapolis"
        ]
      var Kentucky = [
        "Louisville/Jefferson County",
        "Lexington-Fayette",
        "Bowling Green",
        "Owensboro",
        "Covington"
        ]
      var Oregon = [
        "Portland",
        "Eugene",
        "Salem",
        "Gresham",
        "Hillsboro",
        "Beaverton",
        "Bend",
        "Medford",
        "Springfield",
        "Corvallis",
        "Albany",
        "Tigard",
        "Lake Oswego",
        "Keizer"
        ]
      var Oklahoma = [
        "Oklahoma City",
        "Tulsa",
        "Norman",
        "Broken Arrow",
        "Lawton",
        "Edmond",
        "Moore",
        "Midwest City",
        "Enid",
        "Stillwater",
        "Muskogee"
        ]
      var Wisconsin = [
        "Milwaukee",
        "Madison",
        "Green Bay",
        "Kenosha",
        "Racine",
        "Appleton",
        "Waukesha",
        "Eau Claire",
        "Oshkosh",
        "Janesville",
        "West Allis",
        "La Crosse",
        "Sheboygan",
        "Wauwatosa",
        "Fond du Lac",
        "New Berlin",
        "Wausau",
        "Brookfield",
        "Greenfield",
        "Beloit"
        ]
      var Nevada = [
        "Las Vegas",
        "Henderson",
        "Reno",
        "North Las Vegas",
        "Sparks",
        "Carson City"
        ]
      var New_Mexico =  [
        "Albuquerque",
        "Las Cruces",
        "Rio Rancho",
        "Santa Fe",
        "Roswell",
        "Farmington",
        "Clovis"
        ]
      var Missouri = [
        "Kansas City",
        "St. Louis",
        "Springfield",
        "Independence",
        "Columbia",
        "Lee's Summit",
        "O'Fallon",
        "St. Joseph",
        "St. Charles",
        "St. Peters",
        "Blue Springs",
        "Florissant",
        "Joplin",
        "Chesterfield",
        "Jefferson City",
        "Cape Girardeau"
        ]
      var Virginia = [
        "Virginia Beach",
        "Norfolk",
        "Chesapeake",
        "Richmond",
        "Newport News",
        "Alexandria",
        "Hampton",
        "Roanoke",
        "Portsmouth",
        "Suffolk",
        "Lynchburg",
        "Harrisonburg",
        "Leesburg",
        "Charlottesville",
        "Danville",
        "Blacksburg",
        "Manassas"
        ]
      var Georgia = [
        "Atlanta",
        "Columbus",
        "Augusta-Richmond County",
        "Savannah",
        "Athens-Clarke County",
        "Sandy Springs",
        "Roswell",
        "Macon",
        "Johns Creek",
        "Albany",
        "Warner Robins",
        "Alpharetta",
        "Marietta",
        "Valdosta",
        "Smyrna",
        "Dunwoody"
        ]
      var Nebraska = [
        "Omaha",
        "Lincoln",
        "Bellevue",
        "Grand Island"
        ]
      var Minnesota = [
        "Minneapolis",
        "St. Paul",
        "Rochester",
        "Duluth",
        "Bloomington",
        "Brooklyn Park",
        "Plymouth",
        "St. Cloud",
        "Eagan",
        "Woodbury",
        "Maple Grove",
        "Eden Prairie",
        "Coon Rapids",
        "Burnsville",
        "Blaine",
        "Lakeville",
        "Minnetonka",
        "Apple Valley",
        "Edina",
        "St. Louis Park",
        "Mankato",
        "Maplewood",
        "Moorhead",
        "Shakopee"
        ]
      var Kansas = [
        "Wichita",
        "Overland Park",
        "Kansas City",
        "Olathe",
        "Topeka",
        "Lawrence",
        "Shawnee",
        "Manhattan",
        "Lenexa",
        "Salina",
        "Hutchinson"
        ]
      var Louisiana = [
        "New Orleans",
        "Baton Rouge",
        "Shreveport",
        "Lafayette",
        "Lake Charles",
        "Kenner",
        "Bossier City",
        "Monroe",
        "Alexandria"
        ]
      var Hawaii = [
        "Honolulu"
        ]
      var Alaska = [
        "Anchorage"
        ]
      var New_Jersey = [
        "Newark",
        "Jersey City",
        "Paterson",
        "Elizabeth",
        "Clifton",
        "Trenton",
        "Camden",
        "Passaic",
        "Union City",
        "Bayonne",
        "East Orange",
        "Vineland",
        "New Brunswick",
        "Hoboken",
        "Perth Amboy",
        "West New York",
        "Plainfield",
        "Hackensack",
        "Sayreville",
        "Kearny",
        "Linden",
        "Atlantic City"
        ]
      var Idaho = [
        "Boise City",
        "Nampa",
        "Meridian",
        "Idaho Falls",
        "Pocatello",
        "Caldwell",
        "Coeur d'Alene",
        "Twin Falls"
        ]
      var Alabama =  [
        "Birmingham",
        "Montgomery",
        "Mobile",
        "Huntsville",
        "Tuscaloosa",
        "Hoover",
        "Dothan",
        "Auburn",
        "Decatur",
        "Madison",
        "Florence",
        "Gadsden"
        ]
      var Iowa =  [
        "Des Moines",
        "Cedar Rapids",
        "Davenport",
        "Sioux City",
        "Iowa City",
        "Waterloo",
        "Council Bluffs",
        "Ames",
        "West Des Moines",
        "Dubuque",
        "Ankeny",
        "Urbandale",
        "Cedar Falls"
        ]
      var Arkansas = [
        "Little Rock",
        "Fort Smith",
        "Fayetteville",
        "Springdale",
        "Jonesboro",
        "North Little Rock",
        "Conway",
        "Rogers",
        "Pine Bluff",
        "Bentonville"
      ]
      var Utah = [
        "Salt Lake City",
        "West Valley City",
        "Provo",
        "West Jordan",
        "Orem",
        "Sandy",
        "Ogden",
        "St. George",
        "Layton",
        "Taylorsville",
        "South Jordan",
        "Lehi",
        "Logan",
        "Murray",
        "Draper",
        "Bountiful",
        "Riverton",
        "Roy"
      ]
      var Rhode_Island = [
        "Providence",
        "Warwick",
        "Cranston",
        "Pawtucket",
        "East Providence",
        "Woonsocket"
      ]
      var Mississippi = [
        "Jackson",
        "Gulfport",
        "Southaven",
        "Hattiesburg",
        "Biloxi",
        "Meridian"
      ]
      var South_Dakota = [
        "Sioux Falls",
        "Rapid City"
      ]
      var Connecticut = [
        "Bridgeport",
        "New Haven",
        "Stamford",
        "Hartford",
        "Waterbury",
        "Norwalk",
        "Danbury",
        "New Britain",
        "Meriden",
        "Bristol",
        "West Haven",
        "Milford",
        "Middletown",
        "Norwich",
        "Shelton"
      ]
      var South_Carolina = [
        "Columbia",
        "Charleston",
        "North Charleston",
        "Mount Pleasant",
        "Rock Hill",
        "Greenville",
        "Summerville",
        "Sumter",
        "Goose Creek",
        "Hilton Head Island",
        "Florence",
        "Spartanburg"
      ]
      var New_Hampshire = [
        "Manchester",
        "Nashua",
        "Concord"
      ]
      var North_Dakota = [
        "Fargo",
        "Bismarck",
        "Grand Forks",
        "Minot"
      ]
      var Montana = [
        "Billings",
        "Missoula",
        "Great Falls",
        "Bozeman"
      ]
      var Delaware = [
    "Wilmington",
    "Dover"
      ]
      var Maine = [
        "Portland"
      ]
      var Wyoming = [
        "Cheyenne",
        "Casper"
      ]
      var West_Virginia =  [
        "Charleston",
        "Huntington"
      ]
      var Vermont =  [
        "Burlington"
      ]

        if(req.body.state == 'Vermont'){
            res.status(200).json({success : true,message: Vermont})
        }
        else if(req.body.state == 'West Virginia'){
          res.status(200).json({success : true,message: West_Virginia})
        }
        else if(req.body.state == 'Wyoming'){
          res.status(200).json({success : true,message: Wyoming})
        }
        else if(req.body.state == 'Maine'){
          res.status(200).json({success : true,message: Maine})
        }
        else if(req.body.state == 'Delaware'){
          res.status(200).json({success : true,message: Delaware})
        }
        else if(req.body.state == 'Montana'){
          res.status(200).json({success : true,message: Montana})
        }
        else if(req.body.state == 'Wyoming'){
          res.status(200).json({success : true,message: Wyoming})
        }
        else if(req.body.state == 'North Dakota'){
          res.status(200).json({success : true,message: North_Dakota})
        }
        else if(req.body.state == 'New Hampshire'){
          res.status(200).json({success : true,message: New_Hampshire})
        }
        else if(req.body.state == 'South Carolina'){
          res.status(200).json({success : true,message: South_Carolina})
        }
        else if(req.body.state == 'Connecticut'){
          res.status(200).json({success : true,message: Connecticut})
        }
        else if(req.body.state == 'South Dakota'){
          res.status(200).json({success : true,message: South_Dakota})
        }
        else if(req.body.state == 'Mississippi'){
          res.status(200).json({success : true,message: Mississippi})
        }
        else if(req.body.state == 'Rhode Island'){
          res.status(200).json({success : true,message: Rhode_Island})
        }
        else if(req.body.state == 'Utah'){
          res.status(200).json({success : true,message: Utah})
        }
        else if(req.body.state == 'Arkansas'){
          res.status(200).json({success : true,message: Arkansas})
        }
        else if(req.body.state == 'Iowa'){
          res.status(200).json({success : true,message: Iowa})
        }
        else if(req.body.state == 'Alabama'){
          res.status(200).json({success : true,message: Alabama})
        }
        else if(req.body.state == 'Idaho'){
          res.status(200).json({success : true,message: Idaho})
        }
        else if(req.body.state == 'New Jersey'){
          res.status(200).json({success : true,message: New_Jersey})
        }
        else if(req.body.state == 'Alaska'){
          res.status(200).json({success : true,message: Alaska})
        }
        else if(req.body.state == 'Hawaii'){
          res.status(200).json({success : true,message: Hawaii})
        }
        else if(req.body.state == 'Louisiana'){
          res.status(200).json({success : true,message: Louisiana})
        }
        else if(req.body.state == 'Kansas'){
          res.status(200).json({success : true,message: Kansas})
        }
        else if(req.body.state == 'Minnesota'){
          res.status(200).json({success : true,message: Minnesota})
        }
        else if(req.body.state == 'Nebraska'){
          res.status(200).json({success : true,message: Nebraska})
        }
        else if(req.body.state == 'Georgia'){
          res.status(200).json({success : true,message: Georgia})
        }
        else if(req.body.state == 'Virginia'){
          res.status(200).json({success : true,message: Virginia})
        }
        else if(req.body.state == 'Missouri'){
          res.status(200).json({success : true,message: Missouri})
        }
        else if(req.body.state == 'New Mexico'){
          res.status(200).json({success : true,message: New_Mexico})
        }
        else if(req.body.state == 'Nevada'){
          res.status(200).json({success : true,message: Nevada})
        }
        else if(req.body.state == 'Wisconsin'){
          res.status(200).json({success : true,message: Wisconsin})
        }
        else if(req.body.state == 'Oklahoma'){
          res.status(200).json({success : true,message: Oklahoma})
        }
        else if(req.body.state == 'Oregon'){
          res.status(200).json({success : true,message: Oregon})
        }
        else if(req.body.state == 'Kentucky'){
          res.status(200).json({success : true,message: Kentucky})
        }
        else if(req.body.state == 'Maryland'){
          res.status(200).json({success : true,message: Maryland})
        }
        else if(req.body.state == 'District of Columbia'){
          res.status(200).json({success : true,message: District_of_Columbia})
        }
        else if(req.body.state == 'Colorado'){
          res.status(200).json({success : true,message: Colorado})
        }
        else if(req.body.state == 'Washington'){
          res.status(200).json({success : true,message: Washington})
        }
        else if(req.body.state == 'Massachusetts'){
          res.status(200).json({success : true,message: Massachusetts})
        }
        else if(req.body.state == 'Tennessee'){
          res.status(200).json({success : true,message: Tennessee})
        }
        else if(req.body.state == 'Michigan'){
          res.status(200).json({success : true,message: Michigan})
        }
        else if(req.body.state == 'North Carolina'){
          res.status(200).json({success : true,message: North_Carolina})
        }
        else if(req.body.state == 'Ohio'){
          res.status(200).json({success : true,message: Ohio})
        }
        else if(req.body.state == 'Indiana'){
          res.status(200).json({success : true,message: Indiana})
        }
        else if(req.body.state == 'Florida'){
          res.status(200).json({success : true,message: Florida})
        }
        else if(req.body.state == 'Arizona'){
          res.status(200).json({success : true,message: Arizona})
        }
        else if(req.body.state == 'Pennsylvania'){
          res.status(200).json({success : true,message: Pennsylvania})
        }
        else if(req.body.state == 'Texas'){
          res.status(200).json({success : true,message: Texas})
        }
        else if(req.body.state == 'Illinois'){
          res.status(200).json({success : true,message: Illinois})
        }
        else if(req.body.state == 'California'){
          res.status(200).json({success : true,message: California})
        }
        else if(req.body.state == 'New York'){
          res.status(200).json({success : true,message: New_York})
        }
    }
    catch (error) {
        res.status(400).json({success : false,message: error.message})
    }
}