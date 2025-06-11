import { redirect } from 'next/navigation';
import axios from "axios";
import ErrorModal from '@/app/components/ErrorModal';
import {getAccessToken} from "./getTokens";

const realmId = '9341454422054263';
const minorver = '4';
const qbapiurl = process.env.QB_API_URL;

export const readcompanyinfo_api = qbapiurl + realmId + '/companyinfo/' + realmId + '?minorversion=' + minorver;
export const companyinfo_api = qbapiurl + realmId + '/companyinfo?minorversion=' + minorver;
export const item_api = qbapiurl + realmId + '/item?minorversion=' + minorver;

export function query_api(query) {
    const res = qbapiurl + realmId + '/query?query=' + query + '&minorversion=' + minorver;
    return res;
}

// Request interceptor // used for debugging -- DO NOT DELETE
// axios.interceptors.request.use(
//   config => {
//     // Log request details
//     console.log('Request:', {
//       method: config.method.toUpperCase(),
//       url: config.url,
//       headers: config.headers,
//       data: config.data,
//     });
//     return config;
//   },
//   error => {
//     // Log request error
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

export async function getQBdata (qburl, method) {
    const accessT = await getAccessToken();
    // console.log("accessT in qbapis.js: ", accessT);
    console.log(qburl);

    try {
      const response = await axios({ 
          url: qburl, 
          method: method,
          headers: {
            Authorization: `bearer ${accessT}`,
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });
      // console.log("DATA: ", response.data);  
      return {success: true, res: response.data };
    } catch {
      return {success: false, res: "Error in getting QB data. ", }
    }
}
