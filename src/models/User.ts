import mongoose, { Document } from "mongoose";

enum Role {
  User = "user",
  Admin = "admin",
  Vendor = "vendor",
}

interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
  image?: string;
  phone?: string;
  role: Role;
  vendor?: {
    shopName: string;
    shopAddress: string;
    gstNumber: string;

    isApproved: boolean;
    verificationStatus: "Pending" | "Approved" | "Rejected";

    requestedAt?: Date;
    approvedAt?: Date;
    rejectedReason: string;

    products?: mongoose.Types.ObjectId[];
  };

  orders?: mongoose.Types.ObjectId[];

  cart?: {
    product: mongoose.Types.ObjectId;
    quantity: number;
  }[];

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.User,
    },
    vendor: {
      shopName: { type: String },
      shopAddress: {
        type: String,
      },
      gstNumber: {
        type: String,
      },
      isApproved: {
        type: Boolean,
        default: false,
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
      products: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      ],
    },

    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Orders",
      },
    ],

    cart: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
