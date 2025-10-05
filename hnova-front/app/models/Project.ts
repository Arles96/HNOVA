import mongoose, { Schema, Model } from 'mongoose';
import { ExoplanetData } from './Exoplanet';

interface Project {
  projectName: string;
  email: string;
  results?: ExoplanetData;
  timestamp?: string;
}

const ProjectSchema = new Schema<Project>({
  projectName: { type: String, required: true },
  email: { type: String, required: true },
  timestamp: { type: String },
}, { 
  collection: 'projects',
  timestamps: true 
});

// Prevent model recompilation in Next.js hot reload
const ProjectModel: Model<Project> = mongoose.models.Project || mongoose.model<Project>('Project', ProjectSchema);

export default ProjectModel;
export type { Project };