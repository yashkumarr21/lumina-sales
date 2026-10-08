import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    score: { type: String, default: '95%' },
    contact: { type: String, default: 'Key Stakeholder' },
    val: { type: String, default: '$100k' },
    stage: { type: String, default: 'Qualified' },
    employees: { type: String, default: '100-250' },
    location: { type: String, default: 'North America' },
  },
  {
    timestamps: true,
  }
);

export const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
