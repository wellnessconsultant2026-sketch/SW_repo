import fs from 'fs';
import path from 'path';

const data = {
  "Moldova": [
    "Chișinău", "Bălți", "Tiraspol", "Bender (Tighina)", "Cahul", "Ungheni", 
    "Soroca", "Orhei", "Comrat", "Ceadîr-Lunga", "Strășeni", "Drochia", 
    "Edineț", "Căușeni", "Fălești", "Hîncești", "Călărași", "Ialoveni", 
    "Florești", "Rîșcani", "Sîngerei", "Taraclia", "Nisporeni", "Basarabeasca", 
    "Șoldănești", "Glodeni", "Leova", "Rezina", "Briceni", "Ocnița", 
    "Anenii Noi", "Criuleni", "Telenești", "Ștefan Vodă", "Cantemir"
  ],
  "Romania": [
    "Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Constanța", "Craiova", 
    "Brașov", "Galați", "Ploiești", "Oradea", "Brăila", "Arad", "Pitești", 
    "Sibiu", "Bacău", "Târgu Mureș", "Baia Mare", "Buzău", "Botoșani", 
    "Satu Mare", "Râmnicu Vâlcea", "Suceava", "Piatra Neamț", "Drobeta-Turnu Severin", 
    "Focșani", "Târgu Jiu", "Tulcea", "Târgoviște", "Reșița", "Bistrița", 
    "Slatina", "Hunedoara", "Vaslui", "Călărași", "Giurgiu", "Deva", "Alba Iulia", 
    "Zalău", "Sfântu Gheorghe", "Mediaș"
  ],
  "Italy": [
    "Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", 
    "Bari", "Catania", "Venice", "Verona", "Messina", "Padua", "Trieste", "Brescia", 
    "Parma", "Taranto", "Prato", "Modena", "Reggio Calabria", "Reggio Emilia", 
    "Perugia", "Ravenna", "Livorno", "Cagliari", "Foggia", "Rimini", "Salerno", 
    "Ferrara", "Sassari", "Latina", "Monza", "Syracuse", "Bergamo", "Pescara", 
    "Trento", "Forlì", "Vicenza", "Terni", "Bolzano", "Novara", "Piacenza", "Ancona", "Udine"
  ],
  "Spain": [
    "Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia", 
    "Palma de Mallorca", "Las Palmas", "Bilbao", "Alicante", "Córdoba", "Valladolid", 
    "Vigo", "Gijón", "L'Hospitalet de Llobregat", "Vitoria-Gasteiz", "A Coruña", 
    "Elche", "Granada", "Terrassa", "Badalona", "Oviedo", "Cartagena", "Sabadell", 
    "Jerez de la Frontera", "Móstoles", "Santa Cruz de Tenerife", "Pamplona", 
    "Almería", "Alcalá de Henares", "San Sebastián", "Burgos", "Santander", 
    "Castellón de la Plana", "Salamanca", "Marbella", "Tarragona", "Ibiza"
  ],
  "Germany": [
    "Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt am Main", "Stuttgart", 
    "Düsseldorf", "Leipzig", "Dortmund", "Essen", "Bremen", "Dresden", "Hanover", 
    "Nuremberg", "Duisburg", "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster", 
    "Karlsruhe", "Mannheim", "Augsburg", "Wiesbaden", "Gelsenkirchen", "Mönchengladbach", 
    "Braunschweig", "Chemnitz", "Kiel", "Aachen", "Halle", "Magdeburg", "Freiburg", 
    "Krefeld", "Mainz", "Lübeck", "Erfurt", "Rostock", "Kassel", "Potsdam", "Heidelberg"
  ],
  "France": [
    "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Montpellier", 
    "Strasbourg", "Bordeaux", "Lille", "Rennes", "Reims", "Saint-Étienne", "Toulon", 
    "Le Havre", "Grenoble", "Dijon", "Angers", "Villeurbanne", "Saint-Denis", "Nîmes", 
    "Clermont-Ferrand", "Le Mans", "Aix-en-Provence", "Brest", "Tours", "Amiens", 
    "Limoges", "Annecy", "Perpignan", "Metz", "Besançon", "Orléans", "Rouen", "Cannes"
  ],
  "Russia": [
    "Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", 
    "Nizhny Novgorod", "Chelyabinsk", "Krasnoyarsk", "Samara", "Ufa", "Rostov-on-Don", 
    "Omsk", "Krasnodar", "Voronezh", "Perm", "Volgograd", "Saratov", "Tyumen", 
    "Tolyatti", "Barnaul", "Izhevsk", "Makhachkala", "Khabarovsk", "Ulyanovsk", 
    "Irkutsk", "Vladivostok", "Yaroslavl", "Sevastopol", "Tomsk", "Orenburg", 
    "Kemerovo", "Novokuznetsk", "Ryazan", "Naberezhnye Chelny", "Astrakhan", "Sochi"
  ],
  "United Kingdom": [
    "London", "Birmingham", "Manchester", "Glasgow", "Leeds", "Liverpool", 
    "Newcastle upon Tyne", "Sheffield", "Bristol", "Edinburgh", "Belfast", 
    "Leicester", "Nottingham", "Southampton", "Cardiff", "Coventry", "Bradford", 
    "Stoke-on-Trent", "Wolverhampton", "Plymouth", "Derby", "Swansea", "Aberdeen", 
    "Milton Keynes", "Reading", "Northampton", "Luton", "Portsmouth", "Norwich", 
    "Bournemouth", "Oxford", "Cambridge", "York", "Brighton"
  ],
  "United States": [
    "New York City", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", 
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", 
    "Fort Worth", "Columbus", "Charlotte", "Indianapolis", "San Francisco", "Seattle", 
    "Denver", "Washington D.C.", "Boston", "El Paso", "Nashville", "Detroit", 
    "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", 
    "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Atlanta", "Miami", 
    "Minneapolis", "Tampa", "New Orleans", "Orlando", "Honolulu"
  ],
  "India": [
    "New Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", 
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", 
    "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad", 
    "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Varanasi", 
    "Srinagar", "Aurangabad", "Amritsar", "Navi Mumbai", "Prayagraj", "Ranchi", 
    "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", 
    "Raipur", "Kota", "Chandigarh", "Guwahati", "Gurgaon", "Noida", "Kochi", "Goa"
  ],
  "Canada": [
    "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", 
    "Quebec City", "Hamilton", "Kitchener", "London", "Victoria", "Halifax", 
    "Oshawa", "Windsor", "Saskatoon", "Regina", "St. John's", "Kelowna", "Barrie", 
    "Sherbrooke", "Guelph", "Abbotsford", "Kingston", "Trois-Rivières"
  ],
  "Australia": [
    "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", 
    "Canberra", "Newcastle", "Wollongong", "Geelong", "Hobart", "Townsville", 
    "Cairns", "Toowoomba", "Darwin", "Ballarat", "Bendigo", "Launceston"
  ],
  "Switzerland": [
    "Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Lucerne", "St. Gallen", 
    "Lugano", "Biel/Bienne", "Thun", "Bellinzona", "Fribourg", "Schaffhausen", "Chur", "Sion", "Neuchâtel"
  ],
  "Austria": [
    "Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Villach", 
    "Wels", "Sankt Pölten", "Dornbirn", "Wiener Neustadt", "Steyr", "Feldkirch", "Bregenz"
  ],
  "United Arab Emirates": [
    "Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman", "Ras Al Khaimah", 
    "Fujairah", "Umm Al Quwain", "Khor Fakkan"
  ],
  "Ukraine": [
    "Kyiv", "Kharkiv", "Odesa", "Dnipro", "Donetsk", "Zaporizhzhia", "Lviv", 
    "Kryvyi Rih", "Mykolaiv", "Vinnytsia", "Chernihiv", "Poltava", "Cherkasy", 
    "Khmelnytskyi", "Chernivtsi", "Zhytomyr", "Sumy", "Rivne", "Ivano-Frankivsk", "Ternopil", "Lutsk"
  ],
  "Netherlands": [
    "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", 
    "Groningen", "Almere", "Breda", "Nijmegen", "Enschede", "Haarlem", "Arnhem", 
    "Amersfoort", "Apeldoorn", "'s-Hertogenbosch", "Maastricht", "Leiden", "Dordrecht"
  ],
  "Belgium": [
    "Brussels", "Antwerp", "Ghent", "Charleroi", "Liège", "Bruges", "Namur", 
    "Leuven", "Mons", "Aalst", "Mechelen", "Kortrijk", "Hasselt", "Ostend", "Tournai"
  ],
  "Sweden": [
    "Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås", "Örebro", 
    "Linköping", "Helsingborg", "Jönköping", "Norrköping", "Lund", "Umeå", "Gävle", "Borås", "Halmstad"
  ],
  "Norway": [
    "Oslo", "Bergen", "Trondheim", "Stavanger", "Bærum", "Kristiansand", 
    "Drammen", "Asker", "Lillestrøm", "Fredrikstad", "Tromsø", "Sandnes", "Ålesund", "Bodø"
  ],
  "Denmark": [
    "Copenhagen", "Aarhus", "Odense", "Aalborg", "Frederiksberg", "Esbjerg", 
    "Horsens", "Randers", "Kolding", "Vejle", "Roskilde", "Herning", "Helsingør", "Silkeborg"
  ],
  "Poland": [
    "Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin", 
    "Bydgoszcz", "Lublin", "Białystok", "Katowice", "Gdynia", "Częstochowa", 
    "Radom", "Toruń", "Sosnowiec", "Rzeszów", "Kielce", "Gliwice"
  ],
  "Portugal": [
    "Lisbon", "Porto", "Vila Nova de Gaia", "Amadora", "Braga", "Funchal", 
    "Coimbra", "Setúbal", "Almada", "Aveiro", "Viseu", "Guimarães", "Faro", "Évora", "Cascais"
  ],
  "Greece": [
    "Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa", "Volos", 
    "Ioannina", "Trikala", "Chalcis", "Serres", "Alexandroupoli", "Kalamata", "Chania", "Rhodes", "Corfu"
  ],
  "Ireland": [
    "Dublin", "Cork", "Limerick", "Galway", "Waterford", "Drogheda", "Dundalk", 
    "Swords", "Bray", "Navan", "Kilkenny", "Ennis", "Carlow", "Tralee", "Sligo"
  ],
  "Czech Republic": [
    "Prague", "Brno", "Ostrava", "Plzeň", "Liberec", "Olomouc", "České Budějovice", 
    "Hradec Králové", "Ústí nad Labem", "Pardubice", "Zlín", "Kladno", "Karlovy Vary"
  ],
  "Hungary": [
    "Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs", "Győr", "Nyíregyháza", 
    "Kecskemét", "Székesfehérvár", "Szombathely", "Szolnok", "Tatabánya", "Sopron", "Eger"
  ],
  "Israel": [
    "Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", 
    "Netanya", "Be'er Sheva", "Holon", "Bnei Brak", "Ramat Gan", "Rehovot", "Bat Yam", "Herzliya"
  ],
  "Turkey": [
    "Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Konya", 
    "Gaziantep", "Şanlıurfa", "Kocaeli", "Mersin", "Diyarbakır", "Kayseri", "Samsun", "Bodrum"
  ],
  "Brazil": [
    "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", 
    "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Goiânia", "Belém", "Porto Alegre", "Campinas"
  ],
  "Mexico": [
    "Mexico City", "Tijuana", "Ecatepec", "León", "Puebla", "Ciudad Juárez", 
    "Guadalajara", "Zapopan", "Monterrey", "Chihuahua", "Mérida", "Cancún", "Querétaro"
  ],
  "Argentina": [
    "Buenos Aires", "Córdoba", "Rosario", "Mendoza", "Tucumán", "La Plata", 
    "Mar del Plata", "Salta", "Santa Fe", "San Juan", "Neuquén", "Bariloche"
  ],
  "Chile": [
    "Santiago", "Puente Alto", "Antofagasta", "Viña del Mar", "Valparaíso", 
    "Temuco", "Concepción", "Rancagua", "La Serena", "Puerto Montt"
  ],
  "Colombia": [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Cúcuta", 
    "Bucaramanga", "Santa Marta", "Pereira", "Manizales"
  ],
  "Peru": [
    "Lima", "Arequipa", "Trujillo", "Chiclayo", "Piura", "Iquitos", "Cusco", "Huancayo", "Tacna"
  ],
  "Japan": [
    "Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Kobe", "Kyoto", 
    "Fukuoka", "Kawasaki", "Saitama", "Hiroshima", "Sendai", "Chiba", "Shizuoka"
  ],
  "South Korea": [
    "Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon", "Ulsan", "Seongnam", "Jeju"
  ],
  "China": [
    "Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Chongqing", 
    "Hangzhou", "Wuhan", "Xi'an", "Tianjin", "Nanjing", "Qingdao", "Hong Kong", "Macau"
  ],
  "Singapore": ["Singapore"],
  "New Zealand": [
    "Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga", "Napier-Hastings", "Dunedin", "Queenstown"
  ],
  "South Africa": [
    "Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Bloemfontein", "East London"
  ],
  "Egypt": [
    "Cairo", "Alexandria", "Giza", "Port Said", "Suez", "Mansoura", "Tanta", "Asyut", "Ismailia", "Aswan", "Hurghada", "Sharm El Sheikh"
  ],
  "Saudi Arabia": [
    "Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Taif", "Tabuk", "Al Khobar", "Al Jubail"
  ],
  "Qatar": ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor", "Lusail"],
  "Kuwait": ["Kuwait City", "Al Ahmadi", "Hawalli", "Salmiya"],
  "Bahrain": ["Manama", "Riffa", "Muharraq", "Hamad Town"],
  "Oman": ["Muscat", "Seeb", "Salalah", "Bawshar", "Sohar"],
  "Finland": [
    "Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu", "Turku", "Jyväskylä", "Lahti", "Kuopio", "Rovaniemi"
  ],
  "Croatia": [
    "Zagreb", "Split", "Rijeka", "Osijek", "Zadar", "Pula", "Dubrovnik", "Varaždin", "Šibenik"
  ],
  "Bulgaria": [
    "Sofia", "Plovdiv", "Varna", "Burgas", "Ruse", "Stara Zagora", "Pleven", "Veliko Tarnovo"
  ],
  "Serbia": [
    "Belgrade", "Novi Sad", "Niš", "Kragujevac", "Subotica", "Pančevo", "Zrenjanin", "Čačak"
  ],
  "Slovakia": [
    "Bratislava", "Košice", "Prešov", "Žilina", "Banská Bystrica", "Nitra", "Trnava", "Trenčín", "Poprad"
  ],
  "Slovenia": [
    "Ljubljana", "Maribor", "Kranj", "Celje", "Koper", "Novo Mesto", "Bled", "Portorož"
  ],
  "Cyprus": ["Nicosia", "Limassol", "Larnaca", "Paphos", "Ayia Napa", "Kyrenia"],
  "Georgia": ["Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Gori", "Zugdidi", "Borjomi"],
  "Armenia": ["Yerevan", "Gyumri", "Vanadzor", "Vagharshapat", "Dilijan"],
  "Azerbaijan": ["Baku", "Ganja", "Sumqayit", "Mingachevir", "Shaki", "Lankaran"],
  "Kazakhstan": [
    "Almaty", "Astana", "Shymkent", "Aktobe", "Karaganda", "Taraz", "Pavlodar", "Atyrau", "Aktau"
  ],
  "Uzbekistan": ["Tashkent", "Samarkand", "Bukhara", "Namangan", "Andijan", "Khiva"],
  "Belarus": ["Minsk", "Gomel", "Mogilev", "Vitebsk", "Grodno", "Brest", "Bobruisk"],
  "Lithuania": ["Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys", "Palanga"],
  "Latvia": ["Riga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala", "Ventspils"],
  "Estonia": ["Tallinn", "Tartu", "Narva", "Pärnu", "Kohtla-Järve", "Kuressaare"],
  "Luxembourg": ["Luxembourg City", "Esch-sur-Alzette", "Differdange", "Dudelange"],
  "Malta": ["Valletta", "Sliema", "St. Julian's", "Birkirkara", "Mosta", "Mdina"],
  "Iceland": ["Reykjavik", "Kópavogur", "Hafnarfjörður", "Akureyri", "Keflavík"],
  "Thailand": [
    "Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Nonthaburi", "Hat Yai", "Surat Thani", "Hua Hin", "Koh Samui"
  ],
  "Indonesia": [
    "Jakarta", "Bali (Denpasar)", "Surabaya", "Bandung", "Medan", "Semarang", "Makassar", "Yogyakarta"
  ],
  "Malaysia": [
    "Kuala Lumpur", "George Town (Penang)", "Johor Bahru", "Ipoh", "Malacca City", "Kota Kinabalu", "Kuching"
  ],
  "Vietnam": [
    "Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong", "Nha Trang", "Hue", "Da Lat", "Phu Quoc"
  ],
  "Philippines": [
    "Manila", "Quezon City", "Davao City", "Cebu City", "Makati", "Taguig (BGC)", "Pasig", "Baguio"
  ],
  "Morocco": ["Casablanca", "Marrakech", "Rabat", "Tangier", "Fez", "Agadir", "Meknes", "Essaouira"],
  "Tunisia": ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Hammamet"],
  "Algeria": ["Algiers", "Oran", "Constantine", "Annaba", "Blida", "Batna"],
  "Kenya": ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Diani Beach"],
  "Nigeria": ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt", "Benin City"],
  "Ghana": ["Accra", "Kumasi", "Tamale", "Sekondi-Takoradi", "Cape Coast"],
  "Albania": ["Tirana", "Durrës", "Vlorë", "Shkodër", "Sarandë", "Korçë"],
  "Bosnia and Herzegovina": ["Sarajevo", "Banja Luka", "Tuzla", "Zenica", "Mostar", "Bijeljina"],
  "North Macedonia": ["Skopje", "Bitola", "Kumanovo", "Prilep", "Ohrid", "Tetovo"],
  "Montenegro": ["Podgorica", "Nikšić", "Herceg Novi", "Budva", "Bar", "Kotor", "Tivat"],
  "Monaco": ["Monaco", "Monte Carlo"],
  "Andorra": ["Andorra la Vella", "Escaldes-Engordany", "Encamp"],
  "San Marino": ["San Marino", "Serravalle", "Borgo Maggiore"],
  "Liechtenstein": ["Vaduz", "Schaan", "Balzers"],
  "Jordan": ["Amman", "Zarqa", "Irbid", "Aqaba", "Madaba"],
  "Lebanon": ["Beirut", "Tripoli", "Sidon", "Tyre", "Byblos", "Jounieh"],
  "Pakistan": ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"],
  "Bangladesh": ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Cox's Bazar"],
  "Sri Lanka": ["Colombo", "Kandy", "Galle", "Negombo", "Jaffna"],
  "Nepal": ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar", "Bharatpur"],
  "Costa Rica": ["San José", "Alajuela", "Cartago", "Heredia", "Liberia"],
  "Panama": ["Panama City", "San Miguelito", "David", "Colón"],
  "Uruguay": ["Montevideo", "Salto", "Ciudad de la Costa", "Punta del Este"],
  "Ecuador": ["Quito", "Guayaquil", "Cuenca", "Santo Domingo", "Ambato"],
  "Bolivia": ["La Paz", "Santa Cruz de la Sierra", "Cochabamba", "Sucre"],
  "Paraguay": ["Asunción", "Ciudad del Este", "San Lorenzo", "Luque"],
  "Guatemala": ["Guatemala City", "Mixco", "Villa Nueva", "Antigua Guatemala"],
  "Dominican Republic": ["Santo Domingo", "Santiago de los Caballeros", "Punta Cana", "Puerto Plata"]
};

// All other countries around the world to ensure 100% complete global coverage
const otherCountries = [
  "Afghanistan", "Angola", "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Benin", "Bhutan", 
  "Botswana", "Brunei", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Central African Republic", 
  "Chad", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cuba", "Djibouti", "Dominica", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Fiji", "Gabon", "Gambia", 
  "Grenada", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Iraq", "Jamaica", "Kiribati", 
  "Kyrgyzstan", "Laos", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Maldives", "Mali", 
  "Marshall Islands", "Mauritania", "Mauritius", "Micronesia", "Mongolia", "Mozambique", "Myanmar", 
  "Namibia", "Nauru", "Nicaragua", "Niger", "Palau", "Papua New Guinea", "Rwanda", "Saint Kitts and Nevis", 
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "Sao Tome and Principe", "Senegal", 
  "Seychelles", "Sierra Leone", "Solomon Islands", "Somalia", "South Sudan", "Sudan", "Suriname", 
  "Syria", "Tajikistan", "Tanzania", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Turkmenistan", 
  "Tuvalu", "Uganda", "Vanuatu", "Vatican City", "Venezuela", "Yemen", "Zambia", "Zimbabwe"
];

for (const country of otherCountries) {
  if (!data[country]) {
    data[country] = [];
  }
}

// Generate the output file
const sortedCountries = Object.keys(data).sort((a, b) => a.localeCompare(b));

const code = `// Comprehensive global database of countries and major cities
export const COUNTRIES_WITH_CITIES = ${JSON.stringify(data, null, 2)};

export const ALL_COUNTRIES = ${JSON.stringify(sortedCountries, null, 2)};

// Top featured / regional sanctuary countries for instant access
export const FEATURED_COUNTRIES = [
  "Moldova",
  "Romania",
  "Italy",
  "Spain",
  "Germany",
  "France",
  "United Kingdom",
  "Russia",
  "United States",
  "Canada",
  "India",
  "United Arab Emirates",
  "Switzerland",
  "Austria",
  "Ukraine",
  "Israel"
];

export function getCitiesForCountry(countryName) {
  if (!countryName) return [];
  const found = COUNTRIES_WITH_CITIES[countryName];
  if (found && found.length > 0) return found;
  
  // Case-insensitive lookup fallback
  const key = Object.keys(COUNTRIES_WITH_CITIES).find(
    k => k.toLowerCase() === countryName.trim().toLowerCase()
  );
  return key ? COUNTRIES_WITH_CITIES[key] : [];
}
`;

fs.writeFileSync(path.resolve('src/data/countriesAndCities.js'), code, 'utf-8');
console.log('Successfully generated src/data/countriesAndCities.js with ' + sortedCountries.length + ' countries!');
