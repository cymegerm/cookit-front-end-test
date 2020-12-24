import { Request, Response } from 'express';
import axios from 'axios';
import { api_base_url } from './api-base-url';
import { headers } from './headers';

export async function validatePostalCode(req: Request, res: Response) {
  try {
    const response: any = await axios.get(`${api_base_url}/zipTest?zip=${req.query.zip}`, { headers });
    
    const validationResults: any = response.data;
    
    res.status(200).json(validationResults);
  }
  catch (error) {
    console.error(error);
  }
}
