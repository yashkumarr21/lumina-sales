import mongoose from 'mongoose';
import { store } from '../data/store.js';
import { DemoBooking } from '../models/DemoBooking.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const createDemoBooking = async (req, res, next) => {
  try {
    const { fullName, workEmail, company, teamSize, interest } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        error: { message: 'Full name is required' },
      });
    }

    if (!workEmail || !workEmail.trim() || !workEmail.includes('@')) {
      return res.status(400).json({
        success: false,
        error: { message: 'A valid work email address is required' },
      });
    }

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        error: { message: 'Company name is required' },
      });
    }

    let booking;
    if (isMongoConnected()) {
      const doc = await DemoBooking.create({
        fullName: fullName.trim(),
        workEmail: workEmail.trim().toLowerCase(),
        company: company.trim(),
        teamSize: teamSize?.trim() || '10-50',
        interest: interest?.trim() || 'Autonomous Pipeline Automation',
        status: 'pending_contact',
      });
      booking = doc.toObject();
      booking.id = doc._id.toString();
    } else {
      booking = store.addDemoBooking({
        fullName: fullName.trim(),
        workEmail: workEmail.trim().toLowerCase(),
        company: company.trim(),
        teamSize: teamSize?.trim(),
        interest: interest?.trim(),
      });
    }

    res.status(201).json({
      success: true,
      message: 'Executive Briefing demo request received. A Lumina Specialist will contact you within 15 minutes.',
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

export const getDemoBookings = async (req, res, next) => {
  try {
    let bookings;
    if (isMongoConnected()) {
      const docs = await DemoBooking.find().sort({ createdAt: -1 });
      bookings = docs.map((d) => ({ ...d.toObject(), id: d._id.toString() }));
    } else {
      bookings = store.getDemoBookings();
    }

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

