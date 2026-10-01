import mongoose from 'mongoose';

const demoBookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    workEmail: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
    teamSize: { type: String, default: '10-50' },
    interest: { type: String, default: 'Autonomous Pipeline Automation' },
    status: { type: String, default: 'pending_contact' },
  },
  {
    timestamps: true,
  }
);

export const DemoBooking = mongoose.model('DemoBooking', demoBookingSchema);
