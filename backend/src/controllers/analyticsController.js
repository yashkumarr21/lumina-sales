import { store } from '../data/store.js';

export const getAnalytics = (req, res, next) => {
  try {
    const analytics = store.getAnalytics();
    res.json({
      success: true,
      data: analytics,
    });
  } catch (err) {
    next(err);
  }
};

export const getOverview = (req, res, next) => {
  try {
    const overview = store.getOverview();
    res.json({
      success: true,
      data: overview,
    });
  } catch (err) {
    next(err);
  }
};
