module.exports = (mongoose) => {
    const Project = mongoose.model(
      'projects',
      mongoose.Schema(
        {
          temple_id: Number,
          name: String,
          location: String,
          dedicated: String,
          additionalInfo: Boolean,
        },
        { timestamps: true }
      )
    );
  
    return Project;
  };