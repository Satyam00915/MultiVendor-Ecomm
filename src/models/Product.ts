import mongoose, { Document } from "mongoose";
import { IUser } from "./User";

interface IReview {
  user: IUser;
  rating: number;
  comment?: string;
  image?: string;
  createdAt: Date;
}

interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;

  stock: number;
  isStockAvailable: boolean;

  vendor: IUser;

  images: string[];

  category: string;

  isWearable: boolean;
  sizes?: string[];

  verificationStatus: "Pending" | "Approved" | "Rejected";
  requestedAt?: Date;
  approvedAt?: Date;
  rejectedReason?: string;

  isActive?: boolean;

  replacementDays?: number;
  freeDelivery?: boolean;
  warranty?: string;
  payOnDelivery?: boolean;

  detailsPoints: string[];

  reviews?: IReview[];

  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    isStockAvailable: {
      type: Boolean,
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (images: string[]) => images.length === 4,
        message: "A product can have exactly 4 images",
      },
    },
    category: {
      type: String,
      required: true,
    },
    isWearable: {
      type: Boolean,
      default: false,
    },
    sizes: {
      type: [String],
      default: [],
    },
    verificationStatus: {
      type: String,
      enum: ["Approved", "Pending", "Rejected"],
      default: "Pending",
    },
    requestedAt: {
      type: Date,
    },
    approvedAt: {
      type: Date,
    },
    rejectedReason: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    replacementDays: {
      type: Number,
      default: 0,
    },
    freeDelivery: {
      type: Boolean,
      default: false,
    },
    warranty: {
      type: String,
      default: "No warranty",
    },
    payOnDelivery: {
      type: Boolean,
      default: false,
    },
    detailsPoints: {
      type: [String],
      required: true,
      default: [],
    },
    reviews: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
          },
          comment: {
            type: String,
            trim: true,
          },
          image: {
            type: String,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const Product =
  mongoose.models?.Product ||
  mongoose.model<IProduct>("Product", productSchema);

export default Product;
