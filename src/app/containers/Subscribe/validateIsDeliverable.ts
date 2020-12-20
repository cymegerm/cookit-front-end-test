import axios from 'axios';

const url = 'https://s9g64p6vzb.execute-api.us-east-1.amazonaws.com/default/interview-is-zip-valid';

export async function validateIsDeliverable(postalCode: string) {
  try {
    const response: any = await axios.post(url, { zip: postalCode }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}
