import mongoose from 'mongoose';
import { store } from '../data/store.js';
import { Activity } from '../models/Activity.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const getActivities = async (req, res, next) => {
  try {
    const { type } = req.query;
    let activities;

    if (isMongoConnected()) {
      const query = type ? { type } : {};
      const dbActivities = await Activity.find(query).sort({ createdAt: -1 });
      if (dbActivities.length > 0) {
        activities = dbActivities.map((a) => ({ ...a.toObject(), id: a._id.toString() }));
      } else {
        activities = store.getActivities(type);
      }
    } else {
      activities = store.getActivities(type);
    }

    res.json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (err) {
    next(err);
  }
};

export const createActivity = async (req, res, next) => {
  try {
    const { title, amount, subtitle, type, icon, statusColor } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: { message: 'Activity title is required and must be a non-empty string' },
      });
    }

    const payload = {
      title: title.trim(),
      amount: amount?.trim(),
      subtitle: subtitle?.trim() || `New inbound pipeline created (${amount || 'Custom'})`,
      type: type || 'deal',
      icon: icon || 'add_task',
      statusColor: statusColor || 'secondary',
      timeAgo: 'Just now',
    };

    let newActivity;
    if (isMongoConnected()) {
      const doc = await Activity.create(payload);
      newActivity = { ...doc.toObject(), id: doc._id.toString() };
      store.addActivity(payload);
    } else {
      newActivity = store.addActivity(payload);
    }

    res.status(201).json({
      success: true,
      message: 'Deal activity logged successfully',
      data: newActivity,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (isMongoConnected() && mongoose.Types.ObjectId.isValid(id)) {
      const resDoc = await Activity.findByIdAndDelete(id);
      if (resDoc) deleted = true;
    }

    const storeDeleted = store.deleteActivity(id);
    if (storeDeleted) deleted = true;

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: { message: `Activity with ID '${id}' not found` },
      });
    }

    res.json({
      success: true,
      message: `Activity '${id}' removed successfully`,
    });
  } catch (err) {
    next(err);
  }
};

