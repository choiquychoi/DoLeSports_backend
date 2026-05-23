import mongoose, { Schema, Document } from 'mongoose';

export interface IPricingTier {
  fixed: number;
  casual: number;
}

export interface ICourtConfig extends Document {
  courtCount: number;
  pricing: {
    weekday: { morning: IPricingTier; evening: IPricingTier };
    weekend: { morning: IPricingTier; evening: IPricingTier };
  };
  operatingHours: { start: string; end: string };
  slotInterval: number;
}

const pricingTierSchema = new Schema({
  fixed: { type: Number, required: true },
  casual: { type: Number, required: true }
}, { _id: false });

const courtConfigSchema = new Schema({
  courtCount: { type: Number, default: 3 },
  pricing: {
    weekday: { 
      morning: { type: pricingTierSchema, default: { fixed: 120000, casual: 140000 } }, 
      evening: { type: pricingTierSchema, default: { fixed: 160000, casual: 180000 } } 
    },
    weekend: { 
      morning: { type: pricingTierSchema, default: { fixed: 140000, casual: 160000 } }, 
      evening: { type: pricingTierSchema, default: { fixed: 180000, casual: 200000 } } 
    }
  },
  operatingHours: { start: { type: String, default: "05:00" }, end: { type: String, default: "23:00" } },
  slotInterval: { type: Number, default: 30 }
});

export default mongoose.model<ICourtConfig>('CourtConfig', courtConfigSchema);
