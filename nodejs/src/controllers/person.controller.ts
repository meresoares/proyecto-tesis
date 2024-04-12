// src/controllers/PersonController.ts

import { Request, Response } from 'express';
import PersonService from '../services/person.service';

class PersonController {
  async getAllPersons(req: Request, res: Response) {
    try {
      const persons = await PersonService.getAllPersons();
      res.status(200).json(persons);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPersonById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const person = await PersonService.getPersonById(id);
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).json({ error: 'Person not found' });
      }
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createPerson(req: Request, res: Response) {
    try {
      const person = await PersonService.createPerson(req.body);
      res.status(201).json(person);
    } catch (error : any ) {
      res.status(500).json({ error: error.message });
    }
  }

  async updatePerson(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const person = await PersonService.updatePerson(id, req.body);
      res.status(200).json(person);
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletePerson(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await PersonService.deletePerson(id);
      res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error : any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PersonController();
