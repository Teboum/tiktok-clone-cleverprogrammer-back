import mongoose from "mongoose";
//db schema
const tiktokSchema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  messages: String,
  description: String,
  shares: String,
});

//Collection inside the database
export default mongoose.model("tiktokVideos", tiktokSchema);
