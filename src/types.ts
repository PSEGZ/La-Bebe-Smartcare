/**
 * LA BEBE SMARTCARE — Type Definitions
 * La Bebe Creche & Aftercare, Abuja, Nigeria
 */

export type UserRole = 
  | 'Super Administrator'
  | 'Director'
  | 'Administrator'
  | 'Teacher'
  | 'Finance Officer'
  | 'Parent';

export type NavigationTab = 
  | 'dashboard'
  | 'children'
  | 'parents'
  | 'attendance'
  | 'admissions'
  | 'finance'
  | 'daily_reports'
  | 'classes'
  | 'staff'
  | 'activities'
  | 'incidents'
  | 'communications'
  | 'ai_agents'
  | 'intelligence'
  | 'reports'
  | 'settings';

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Early Pickup' | 'Departed';
export type EnrollmentStatus = 'Enrolled' | 'Graduated' | 'On Leave' | 'Withdrawn' | 'Pending';
export type ProgrammeType = 'Infant Care' | 'Toddler Creche' | 'Preschool' | 'Aftercare' | 'Holiday Camp';

export interface Child {
  id: string;
  regNumber: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dob: string;
  age: string;
  classId: string;
  className: string;
  programme: ProgrammeType;
  parentId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  attendanceStatus: AttendanceStatus;
  enrollmentStatus: EnrollmentStatus;
  bloodGroup: string;
  genotype: string;
  allergies: string[];
  dietaryRestrictions: string;
  medicalConditions: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  authorizedPickups: {
    name: string;
    relationship: string;
    phone: string;
    photoUrl?: string;
  }[];
  admissionDate: string;
  avatarColor: string;
}

export interface Parent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  occupation: string;
  relationship: 'Mother' | 'Father' | 'Guardian';
  linkedChildren: {
    childId: string;
    childName: string;
    className: string;
  }[];
  outstandingBalance: number;
  status: 'Active' | 'Inactive' | 'Pending';
  consentGiven: boolean;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Email' | 'In-App';
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  childId: string;
  childName: string;
  className: string;
  date: string;
  status: AttendanceStatus;
  arrivalTime?: string;
  departureTime?: string;
  temperature?: string;
  recordedBy: string;
  notes?: string;
  pickupPerson?: string;
}

export type AdmissionsStage = 
  | 'New Enquiry'
  | 'Contacted'
  | 'Interested'
  | 'Tour Scheduled'
  | 'Tour Completed'
  | 'Application Started'
  | 'Application Submitted'
  | 'Payment Pending'
  | 'Enrolled'
  | 'Lost';

export interface AdmissionsLead {
  id: string;
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  childAge: string;
  desiredProgramme: ProgrammeType;
  preferredStartDate: string;
  leadSource: 'Referral' | 'Instagram' | 'Walk-in' | 'Google Search' | 'Parent Recommendation' | 'Flyer';
  stage: AdmissionsStage;
  notes: string;
  nextFollowUpDate: string;
  assignedStaff: string;
  estimatedFee: number;
  tourDate?: string;
  tourTime?: string;
  history: {
    date: string;
    action: string;
    user: string;
  }[];
}

export type InvoiceStatus = 'Draft' | 'Pending' | 'Paid' | 'Partially Paid' | 'Overdue' | 'Cancelled';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  parentId: string;
  parentName: string;
  parentEmail: string;
  childId: string;
  childName: string;
  className: string;
  term: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  issueDate: string;
  status: InvoiceStatus;
  paymentMethod?: 'Bank Transfer' | 'POS' | 'Cash' | 'Online (Pending)';
  paymentDate?: string;
  receiptNumber?: string;
  notes?: string;
}

export interface DailyReport {
  id: string;
  childId: string;
  childName: string;
  className: string;
  date: string;
  teacherId: string;
  teacherName: string;
  meals: {
    breakfast: string;
    lunch: string;
    snack: string;
    waterIntake: string;
  };
  nap: {
    startTime: string;
    endTime: string;
    duration: string;
    quality: string;
  };
  activities: string;
  mood: 'Cheerful & Energetic' | 'Calm & Engaged' | 'Sleepy / Fussy' | 'Social & Playful' | 'A Bit Unwell';
  learningActivity: string;
  pottyDiaper: {
    wet: number;
    soiled: number;
    pottyTrips: number;
  };
  generalObservation: string;
  status: 'Draft' | 'Approved' | 'Sent to Parent';
  isAiGenerated: boolean;
  rawTeacherNotes?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface ClassRoom {
  id: string;
  name: string;
  code: string;
  programme: ProgrammeType;
  leadTeacher: string;
  assistantTeacher: string;
  roomNumber: string;
  ageRange: string;
  capacity: number;
  enrolledCount: number;
  presentToday: number;
  ratio: string;
  status: 'Active' | 'Maintenance' | 'Full';
}

export interface StaffMember {
  id: string;
  staffNumber: string;
  name: string;
  role: string;
  department: 'Teaching' | 'Care & Creche' | 'Administration' | 'Finance' | 'Health & Safety' | 'Security';
  classAssigned?: string;
  phone: string;
  email: string;
  employmentStatus: 'Full-time' | 'Part-time' | 'Contract' | 'On Leave';
  attendanceToday: 'Present' | 'Absent' | 'Late' | 'On Leave';
  leaveDaysRemaining: number;
  certifications: string[];
  joinedDate: string;
  emergencyContact: string;
  avatarColor: string;
}

export type ActivityCategory = 
  | 'Language'
  | 'Numeracy'
  | 'Creativity'
  | 'Music'
  | 'Motor Skills'
  | 'Social Development'
  | 'Outdoor Play'
  | 'School Readiness';

export interface ChildActivity {
  id: string;
  title: string;
  classId: string;
  className: string;
  date: string;
  time: string;
  teacherName: string;
  category: ActivityCategory;
  learningObjective: string;
  participantsCount: number;
  materialsNeeded: string[];
  notes: string;
  status: 'Planned' | 'In Progress' | 'Completed';
  evaluationSummary?: string;
}

export type IncidentCategory = 
  | 'Accident'
  | 'Injury'
  | 'Behaviour'
  | 'Safeguarding'
  | 'Parent Complaint'
  | 'Health Concern'
  | 'Other';

export interface IncidentReport {
  id: string;
  incidentNumber: string;
  childId: string;
  childName: string;
  className: string;
  date: string;
  time: string;
  location: string;
  category: IncidentCategory;
  severity: 'Low' | 'Medium' | 'High' | 'Critical (Safeguarding)';
  description: string;
  immediateActionTaken: string;
  staffInvolved: string[];
  firstAidGiven: boolean;
  firstAidDetails?: string;
  parentNotified: boolean;
  parentNotificationTime?: string;
  parentNotificationMethod?: 'Phone Call' | 'In-Person' | 'WhatsApp / App';
  managementReview: 'Pending Review' | 'Reviewed & Approved' | 'Escalated to Director';
  managementNotes?: string;
  status: 'Open' | 'Under Investigation' | 'Resolved';
  isSafeguarding: boolean;
}

export interface AIAgent {
  id: string;
  number: number;
  name: string;
  code: string;
  category: 'Operations' | 'Care & Safety' | 'Admissions & CRM' | 'Finance' | 'Executive Intelligence';
  purpose: string;
  status: 'Active' | 'Standby' | 'Processing' | 'Maintenance';
  capabilities: string[];
  tools: string[];
  lastActivity: string;
  executionCount: number;
  enabled: boolean;
  triggerEvent: string;
}

export interface CommunicationMessage {
  id: string;
  type: 'Parent Message' | 'Announcement' | 'Notification' | 'Broadcast';
  sender: string;
  senderRole: string;
  recipient: string;
  recipientGroup?: string;
  subject: string;
  content: string;
  timestamp: string;
  channel: 'In-App' | 'Email' | 'WhatsApp (Pending)' | 'SMS';
  read: boolean;
  status: 'Delivered' | 'Pending' | 'Failed';
}

export interface AuditLogItem {
  id: string;
  action: string;
  module: string;
  performedBy: string;
  role: string;
  timestamp: string;
  ipAddress: string;
  details: string;
}
