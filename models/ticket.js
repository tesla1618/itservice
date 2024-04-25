import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the ticket"],
  },
  issue: {
    type: String,
    required: [true, "Please provide the issue description"],
  },
  status: {
    type: String,
    enum: ["open", "closed", "in progress"],
    default: "open",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
