import { Request, Response } from 'express';
import axios from 'axios';
import { api_base_url } from './api-base-url';

export async function validatePostalCode(req: Request, res: Response) {
  let response: any;
  
  try {
    response = await axios.post(`${api_base_url}/interview-is-zip-valid`,
      { body: req.body },
      { headers: req.headers }
      );
    
    const validationResults: any[] = response.data.results;
    
    res.status(200).json({ payload: validationResults });
  }
  catch (error) {
    console.error(error);
  }
}
