export interface CityData {
  citySlug: string;
  cityName: string;
  county: string;
  zipCodes: string[];
  latitude: number;
  longitude: number;
  weatherMaxTemp: number;
  localPoiMarkers: string[];
  permitOfficeUrl: string;
  nearbyCity: string; // closest major city for "near X" searches
  population: number;
  driveFromHub: string;
  uniqueNote: string; // city-specific roofing context
}

export const cities: CityData[] = [
  {
    citySlug: "merced",
    cityName: "Merced",
    county: "Merced County",
    zipCodes: ["95340", "95341", "95348"],
    latitude: 37.30216,
    longitude: -120.48297,
    weatherMaxTemp: 108,
    localPoiMarkers: ["Bellevue Ranch", "Loughborough", "South Merced", "University area (UC Merced)"],
    permitOfficeUrl: "https://www.cityofmerced.org/depts/cd/building/default.asp",
    nearbyCity: "Modesto",
    population: 90000,
    driveFromHub: "0 min",
    uniqueNote:
      "Merced summers regularly exceed 105°F, accelerating shingle blistering and underlayment degradation. UC Merced area sees new construction activity; Central Valley dust storms add UV and abrasion stress.",
  },
  {
    citySlug: "atwater",
    cityName: "Atwater",
    county: "Merced County",
    zipCodes: ["95301"],
    latitude: 37.34769,
    longitude: -120.60881,
    weatherMaxTemp: 105,
    localPoiMarkers: ["Castle Air Force Base corridor", "Winton Parkway area", "Buhach Colony"],
    permitOfficeUrl: "https://www.atwater.org/224/Building",
    nearbyCity: "Merced",
    population: 30000,
    driveFromHub: "12 min",
    uniqueNote:
      "Atwater sits in the Castle AFB corridor. Many homes date from the 1960s–80s and have original 3-tab shingles at end of life. CertainTeed Landmark Solaris cool-roof shingles are popular for Title 24 compliance.",
  },
  {
    citySlug: "los-banos",
    cityName: "Los Banos",
    county: "Merced County",
    zipCodes: ["93635"],
    latitude: 37.05771,
    longitude: -120.84966,
    weatherMaxTemp: 107,
    localPoiMarkers: ["Pacheco Pass corridor", "Del Puerto area", "Volta Wildlife Area"],
    permitOfficeUrl: "https://www.losbanos.org/departments/community_development",
    nearbyCity: "Merced",
    population: 46000,
    driveFromHub: "38 min",
    uniqueNote:
      "Los Banos sits near Pacheco Pass, where high-wind events can lift valley homes' ridge caps and peel flashing. Storm-related emergency tarping is high-frequency from November through March.",
  },
  {
    citySlug: "livingston",
    cityName: "Livingston",
    county: "Merced County",
    zipCodes: ["95334"],
    latitude: 37.38686,
    longitude: -120.72366,
    weatherMaxTemp: 106,
    localPoiMarkers: ["Foster Farms corridor", "Peach Ave subdivisions", "Main Street district"],
    permitOfficeUrl: "https://www.livingstoncity.com/building",
    nearbyCity: "Merced",
    population: 15000,
    driveFromHub: "18 min",
    uniqueNote:
      "Livingston's agricultural dust environment accelerates granule loss on asphalt shingles. Architectural shingles (vs. 3-tab) are strongly recommended for their impact resistance and longer lifespan in this environment.",
  },
  {
    citySlug: "chowchilla",
    cityName: "Chowchilla",
    county: "Madera County",
    zipCodes: ["93610"],
    latitude: 37.12298,
    longitude: -120.26012,
    weatherMaxTemp: 106,
    localPoiMarkers: ["Robertson Boulevard corridor", "Chowchilla Airport area", "Avenue 24 farmland"],
    permitOfficeUrl: "https://www.chowchilla.com/departments/building",
    nearbyCity: "Merced",
    population: 19000,
    driveFromHub: "30 min",
    uniqueNote:
      "Chowchilla has a significant commercial and agricultural building stock. Metal panel restoration with elastomeric roof coatings is a high-demand service for warehouse and cold-storage facilities in this market.",
  },
  {
    citySlug: "winton",
    cityName: "Winton",
    county: "Merced County",
    zipCodes: ["95388"],
    latitude: 37.38685,
    longitude: -120.61726,
    weatherMaxTemp: 105,
    localPoiMarkers: ["Winton Way", "Merced County rural areas"],
    permitOfficeUrl: "https://www.co.merced.ca.us/index.aspx?nid=153",
    nearbyCity: "Atwater",
    population: 10000,
    driveFromHub: "15 min",
    uniqueNote:
      "Winton is an unincorporated community; permits go through Merced County. Older ranch-style homes with low-slope roofs commonly need flat-roof conversion or TPO overlay systems.",
  },
];

export default cities;
