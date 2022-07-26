import fetch from "node-fetch";

import getMomox from "./src/utils/getMomox.js";
import getAmmareal from "./src/utils/getAmmareal.js";
import getBourseAuxLivres from "./src/utils/getBourseAuxLivres.js";
import getGoogleBookAPI from "./src/utils/getGoogleBookAPI.js";
import getAmazon from "./src/utils/getAmazon.js";

const ISBN1 = "9782344050996"; //Sakamoto Days - Tome 02
const ISBN2 = "9782811650230"; //Fairy Tail : city hero. Vol. 1
const ISBN3 = "9791032704431"; //Dead Mount Death Play T01 (01)
const ISBN4 = "9782413045618"; // Mon Destin : Entre les main des femmes
const ISBN5 = "9782820325402"; // Platinum End
const ISBN6 = "9782351429389"; // Blood Lab - T8
const ISBN7 = "9782351429013"; // Blood Lab - T7

getMomox(ISBN1);
getAmmareal(ISBN1);
getBourseAuxLivres(ISBN1);
getGoogleBookAPI(ISBN1);
getAmazon(ISBN1);
