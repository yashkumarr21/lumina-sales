import { store } from '../data/store.js';

export const getDeals = (req, res, next) => {
  try {
    const deals = store.getDeals();
    res.json({
      success: true,
      data: deals,
    });
  } catch (err) {
    next(err);
  }
};

export const createDeal = (req, res, next) => {
  try {
    const { stage, name, company, amount, probability } = req.body;

    const validStages = ['discovery', 'proposal', 'negotiation'];
    const normalizedStage = stage?.toLowerCase();

    if (!validStages.includes(normalizedStage)) {
      return res.status(400).json({
        success: false,
        error: { message: `Invalid stage. Must be one of: ${validStages.join(', ')}` },
      });
    }

    if (!name || !company) {
      return res.status(400).json({
        success: false,
        error: { message: 'Deal name and company are required' },
      });
    }

    const newDeal = store.addDeal(normalizedStage, {
      name: name.trim(),
      company: company.trim(),
      amount: amount?.trim() || '$100,000',
      probability: typeof probability === 'number' ? probability : 50,
    });

    res.status(201).json({
      success: true,
      message: 'Deal registered in pipeline',
      data: newDeal,
    });
  } catch (err) {
    next(err);
  }
};
