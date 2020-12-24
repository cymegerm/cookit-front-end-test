import axios from 'axios';

export async function isDeliverable(postalCode: string) {
  try {
    const response: any = await axios.get(`/api/zipTest?zip=${postalCode}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
