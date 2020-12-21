import axios from 'axios';

export async function isDeliverable(postalCode: string) {
  try {
    const response: any = await axios.post(
      '/api/interview-is-zip-valid',
      { zip: postalCode },
      {
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line
          'Accept': 'application/json'
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
