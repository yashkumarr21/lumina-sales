import mongoose from 'mongoose';
import { store } from '../data/store.js';
import { Lead } from '../models/Lead.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const getLeads = async (req, res, next) => {
  try {
    let leads;
    if (isMongoConnected()) {
      const dbLeads = await Lead.find().sort({ createdAt: -1 });
      if (dbLeads.length > 0) {
        leads = dbLeads.map((l) => ({ ...l.toObject(), id: l._id.toString() }));
      } else {
        leads = store.getLeads();
      }
    } else {
      leads = store.getLeads();
    }

    res.json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (err) {
    next(err);
  }
};

export const createLead = async (req, res, next) => {
  try {
    const { company, contact, val, employees, location } = req.body;

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        error: { message: 'Company name is required' },
      });
    }

    let newLead;
    const leadPayload = {
      company: company.trim(),
      contact: contact?.trim() || 'TBD (Key Stakeholder)',
      val: val?.trim() || '$100k',
      employees: employees?.trim() || '100-250',
      location: location?.trim() || 'North America',
      score: `${Math.floor(85 + Math.random() * 14)}%`,
      stage: 'New',
    };

    if (isMongoConnected()) {
      const doc = await Lead.create(leadPayload);
      newLead = { ...doc.toObject(), id: doc._id.toString() };
      store.addLead(leadPayload);
    } else {
      newLead = store.addLead(leadPayload);
    }

    res.status(201).json({
      success: true,
      message: 'Autonomous lead created and scored',
      data: newLead,
    });
  } catch (err) {
    next(err);
  }
};

