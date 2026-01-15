import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      required: false,
    },
    education: [
      {
        institute: String,
        degree: String,
        field: String,
        startYear: Number,
        endYear: Number,
      },
    ],
    workExperience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        isCurrent: Boolean,
        description: String,
      },
    ],
    contactDetails: {
      links: [
        {
          label: String,
          url: String,
        },
      ],
    },
    resume: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: false,
    },
    skills: [String],
    title: {
      type: String,
      required: false,
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);
export default user;
