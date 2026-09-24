/**
 * LA BEBE SMARTCARE — Demo Dataset
 * La Bebe Creche & Aftercare, Abuja, Nigeria
 * Realistic Fictional Demo Data
 */

import { 
  Child, 
  Parent, 
  AttendanceRecord, 
  AdmissionsLead, 
  Invoice, 
  DailyReport, 
  ClassRoom, 
  StaffMember, 
  ChildActivity, 
  IncidentReport, 
  AIAgent, 
  CommunicationMessage, 
  AuditLogItem 
} from '../types';

export const DEMO_CLASSES: ClassRoom[] = [
  {
    id: 'cls-1',
    name: 'Infants (Nestlings)',
    code: 'INF-01',
    programme: 'Infant Care',
    leadTeacher: 'Mrs. Grace Okoro',
    assistantTeacher: 'Ms. Blessing Danjuma',
    roomNumber: 'Ground Floor Room 101',
    ageRange: '3 months – 12 months',
    capacity: 12,
    enrolledCount: 10,
    presentToday: 9,
    ratio: '1:3',
    status: 'Active'
  },
  {
    id: 'cls-2',
    name: 'Toddlers (Explorers)',
    code: 'TOD-01',
    programme: 'Toddler Creche',
    leadTeacher: 'Mrs. Folake Adeleke',
    assistantTeacher: 'Ms. Amaka Uche',
    roomNumber: 'Ground Floor Room 102',
    ageRange: '13 months – 24 months',
    capacity: 18,
    enrolledCount: 16,
    presentToday: 15,
    ratio: '1:4',
    status: 'Active'
  },
  {
    id: 'cls-3',
    name: 'Preschool (Pioneers)',
    code: 'PRE-01',
    programme: 'Preschool',
    leadTeacher: 'Mr. Emmanuel Nwosu',
    assistantTeacher: 'Mrs. Hauwa Bello',
    roomNumber: 'First Floor Room 201',
    ageRange: '2.5 years – 4.5 years',
    capacity: 22,
    enrolledCount: 20,
    presentToday: 18,
    ratio: '1:6',
    status: 'Active'
  },
  {
    id: 'cls-4',
    name: 'Aftercare (Academics & Enrichment)',
    code: 'AFT-01',
    programme: 'Aftercare',
    leadTeacher: 'Mrs. Zainab Aliyu',
    assistantTeacher: 'Mr. Tunde Balogun',
    roomNumber: 'Annex Hall & Play Lab',
    ageRange: '4 years – 8 years',
    capacity: 25,
    enrolledCount: 18,
    presentToday: 16,
    ratio: '1:8',
    status: 'Active'
  }
];

export const DEMO_CHILDREN: Child[] = [
  {
    id: 'ch-01',
    regNumber: 'LBC/2026/001',
    firstName: 'David',
    lastName: 'Adeleke',
    gender: 'Male',
    dob: '2024-04-12',
    age: '2 yrs 4 mos',
    classId: 'cls-2',
    className: 'Toddlers (Explorers)',
    programme: 'Toddler Creche',
    parentId: 'par-01',
    parentName: 'Engr. Babatunde Adeleke',
    parentPhone: '+234 803 456 7890',
    parentEmail: 'babatunde.adeleke@gmail.com',
    attendanceStatus: 'Present',
    enrollmentStatus: 'Enrolled',
    bloodGroup: 'O+',
    genotype: 'AA',
    allergies: ['Peanuts', 'Strawberries'],
    dietaryRestrictions: 'No nuts or sesame products',
    medicalConditions: 'Mild eczema; moisturiser applied after outdoor play',
    emergencyContact: {
      name: 'Mrs. Folashade Adeleke',
      relationship: 'Aunt',
      phone: '+234 802 111 2233'
    },
    authorizedPickups: [
      { name: 'Engr. Babatunde Adeleke', relationship: 'Father', phone: '+234 803 456 7890' },
      { name: 'Mrs. Ronke Adeleke', relationship: 'Mother', phone: '+234 803 999 8877' },
      { name: 'Musa Garba', relationship: 'Family Driver (ID Verified)', phone: '+234 814 555 6677' }
    ],
    admissionDate: '2025-01-08',
    avatarColor: 'bg-teal-500'
  },
  {
    id: 'ch-02',
    regNumber: 'LBC/2026/002',
    firstName: 'Zainab',
    lastName: 'Ibrahim',
    gender: 'Female',
    dob: '2025-02-14',
    age: '1 yr 6 mos',
    classId: 'cls-2',
    className: 'Toddlers (Explorers)',
    programme: 'Toddler Creche',
    parentId: 'par-02',
    parentName: 'Hajia Fatima Ibrahim',
    parentPhone: '+234 805 777 3344',
    parentEmail: 'fatima.ibrahim@yahoo.com',
    attendanceStatus: 'Present',
    enrollmentStatus: 'Enrolled',
    bloodGroup: 'A+',
    genotype: 'AA',
    allergies: ['Egg Whites'],
    dietaryRestrictions: 'Halal meals only',
    medicalConditions: 'None',
    emergencyContact: {
      name: 'Alhaji Usman Ibrahim',
      relationship: 'Uncle',
      phone: '+234 803 123 9876'
    },
    authorizedPickups: [
      { name: 'Hajia Fatima Ibrahim', relationship: 'Mother', phone: '+234 805 777 3344' },
      { name: 'Nanny Laraba', relationship: 'Registered Nanny', phone: '+234 816 778 9900' }
    ],
    admissionDate: '2025-09-02',
    avatarColor: 'bg-rose-500'
  },
  {
    id: 'ch-03',
    regNumber: 'LBC/2026/003',
    firstName: 'Chinedu',
    lastName: 'Okonkwo',
    gender: 'Male',
    dob: '2023-08-20',
    age: '3 yrs',
    classId: 'cls-3',
    className: 'Preschool (Pioneers)',
    programme: 'Preschool',
    parentId: 'par-03',
    parentName: 'Dr. Emeka Okonkwo',
    parentPhone: '+234 809 333 4455',
    parentEmail: 'emeka.okonkwo@health.gov.ng',
    attendanceStatus: 'Present',
    enrollmentStatus: 'Enrolled',
    bloodGroup: 'B+',
    genotype: 'AS',
    allergies: [],
    dietaryRestrictions: 'None',
    medicalConditions: 'Asthma inhaler kept in nurse office for emergencies',
    emergencyContact: {
      name: 'Dr. Mrs. Ifeoma Okonkwo',
      relationship: 'Mother',
      phone: '+234 802 444 5566'
    },
    authorizedPickups: [
      { name: 'Dr. Emeka Okonkwo', relationship: 'Father', phone: '+234 809 333 4455' },
      { name: 'Dr. Mrs. Ifeoma Okonkwo', relationship: 'Mother', phone: '+234 802 444 5566' }
    ],
    admissionDate: '2024-09-10',
    avatarColor: 'bg-indigo-500'
  },
  {
    id: 'ch-04',
    regNumber: 'LBC/2026/004',
    firstName: 'Amina',
    lastName: 'Bello',
    gender: 'Female',
    dob: '2025-11-05',
    age: '9 mos',
    classId: 'cls-1',
    className: 'Infants (Nestlings)',
    programme: 'Infant Care',
    parentId: 'par-04',
    parentName: 'Barr. Mustapha Bello',
    parentPhone: '+234 803 888 1212',
    parentEmail: 'mustapha.bello@lawchambers.ng',
    attendanceStatus: 'Present',
    enrollmentStatus: 'Enrolled',
    bloodGroup: 'O+',
    genotype: 'AA',
    allergies: ['Dairy formula (Takes Breastmilk/Soy)'],
    dietaryRestrictions: 'Expressed breastmilk provided by mother in sterilised bottles',
    medicalConditions: 'Teething soothing gel applied when needed',
    emergencyContact: {
      name: 'Mrs. Maryam Bello',
      relationship: 'Mother',
      phone: '+234 806 222 3434'
    },
    authorizedPickups: [
      { name: 'Barr. Mustapha Bello', relationship: 'Father', phone: '+234 803 888 1212' },
      { name: 'Mrs. Maryam Bello', relationship: 'Mother', phone: '+234 806 222 3434' }
    ],
    admissionDate: '2026-01-05',
    avatarColor: 'bg-pink-500'
  },
  {
    id: 'ch-05',
    regNumber: 'LBC/2026/005',
    firstName: 'Somtochukwu',
    lastName: 'Eze',
    gender: 'Male',
    dob: '2022-06-18',
    age: '4 yrs 2 mos',
    classId: 'cls-4',
    className: 'Aftercare (Academics & Enrichment)',
    programme: 'Aftercare',
    parentId: 'par-05',
    parentName: 'Mrs. Ngozi Eze',
    parentPhone: '+234 803 666 7788',
    parentEmail: 'ngozi.eze@cbn.gov.ng',
    attendanceStatus: 'Late',
    enrollmentStatus: 'Enrolled',
    bloodGroup: 'A+',
    genotype: 'AA',
    allergies: [],
    dietaryRestrictions: 'None',
    medicalConditions: 'None',
    emergencyContact: {
      name: 'Mr. Kenneth Eze',
      relationship: 'Father',
      phone: '+234 802 777 9900'
    },
    authorizedPickups: [
      { name: 'Mrs. Ngozi Eze', relationship: 'Mother', phone: '+234 803 666 7788' }
    ],
    admissionDate: '2024-01-15',
    avatarColor: 'bg-amber-500'
  },
  {
    id: 'ch-06',
    regNumber: 'LBC/2026/006',
    firstName: 'Khadijah',
    lastName: 'Danladi',
    gender: 'Female',
    dob: '2024-07-22',
    age: '2 yrs 1 mo',
    classId: 'cls-2',
    className: 'Toddlers (Explorers)',
    programme: 'Toddler Creche',
    parentId: 'par-06',
    parentName: 'Mr. Umar Danladi',
    parentPhone: '+234 818 444 5566',
    parentEmail: 'umar.danladi@nnpcgroup.com',
    attendanceStatus: 'Absent',
    enrollmentStatus: 'Enrolled',
    bloodGroup: 'O+',
    genotype: 'AA',
    allergies: ['Dust mites'],
    dietaryRestrictions: 'None',
    medicalConditions: 'Parent reported slight cold today',
    emergencyContact: {
      name: 'Mrs. Halima Danladi',
      relationship: 'Mother',
      phone: '+234 813 555 7788'
    },
    authorizedPickups: [
      { name: 'Mr. Umar Danladi', relationship: 'Father', phone: '+234 818 444 5566' }
    ],
    admissionDate: '2025-05-10',
    avatarColor: 'bg-purple-500'
  },
  {
    id: 'ch-07',
    regNumber: 'LBC/2026/007',
    firstName: 'Femi',
    lastName: 'Oladipo',
    gender: 'Male',
    dob: '2023-11-30',
    age: '2 yrs 9 mos',
    classId: 'cls-3',
    className: 'Preschool (Pioneers)',
    programme: 'Preschool',
    parentId: 'par-07',
    parentName: 'Mrs. Yewande Oladipo',
    parentPhone: '+234 802 888 4433',
    parentEmail: 'yewande.oladipo@totalenergies.com',
    attendanceStatus: 'Present',
    enrollmentStatus: 'Enrolled',
    bloodGroup: 'O-',
    genotype: 'AA',
    allergies: [],
    dietaryRestrictions: 'Low sugar drinks only',
    medicalConditions: 'None',
    emergencyContact: {
      name: 'Mr. Segun Oladipo',
      relationship: 'Father',
      phone: '+234 803 222 1100'
    },
    authorizedPickups: [
      { name: 'Mrs. Yewande Oladipo', relationship: 'Mother', phone: '+234 802 888 4433' }
    ],
    admissionDate: '2025-03-01',
    avatarColor: 'bg-emerald-500'
  },
  {
    id: 'ch-08',
    regNumber: 'LBC/2026/008',
    firstName: 'Tari',
    lastName: 'Briggs',
    gender: 'Female',
    dob: '2025-08-10',
    age: '1 yr',
    classId: 'cls-1',
    className: 'Infants (Nestlings)',
    programme: 'Infant Care',
    parentId: 'par-08',
    parentName: 'Capt. Tamuno Briggs',
    parentPhone: '+234 803 111 9988',
    parentEmail: 'tamuno.briggs@airpeace.com',
    attendanceStatus: 'Present',
    enrollmentStatus: 'Enrolled',
    bloodGroup: 'B+',
    genotype: 'AA',
    allergies: [],
    dietaryRestrictions: 'Pureed fruits & oats only',
    medicalConditions: 'None',
    emergencyContact: {
      name: 'Mrs. Anita Briggs',
      relationship: 'Mother',
      phone: '+234 809 666 5544'
    },
    authorizedPickups: [
      { name: 'Mrs. Anita Briggs', relationship: 'Mother', phone: '+234 809 666 5544' }
    ],
    admissionDate: '2026-02-01',
    avatarColor: 'bg-sky-500'
  }
];

export const DEMO_PARENTS: Parent[] = [
  {
    id: 'par-01',
    title: 'Engr.',
    name: 'Babatunde Adeleke',
    phone: '+234 803 456 7890',
    email: 'babatunde.adeleke@gmail.com',
    address: 'Plot 412, Maitama District, Abuja',
    occupation: 'Lead Civil Engineer, Julius Berger Nig.',
    relationship: 'Father',
    linkedChildren: [
      { childId: 'ch-01', childName: 'David Adeleke', className: 'Toddlers (Explorers)' }
    ],
    outstandingBalance: 0,
    status: 'Active',
    consentGiven: true,
    preferredContact: 'WhatsApp',
    createdAt: '2025-01-08'
  },
  {
    id: 'par-02',
    title: 'Hajia',
    name: 'Fatima Ibrahim',
    phone: '+234 805 777 3344',
    email: 'fatima.ibrahim@yahoo.com',
    address: '14 Yedseram Street, Maitama, Abuja',
    occupation: 'Managing Partner, Northgate Capital',
    relationship: 'Mother',
    linkedChildren: [
      { childId: 'ch-02', childName: 'Zainab Ibrahim', className: 'Toddlers (Explorers)' }
    ],
    outstandingBalance: 120000,
    status: 'Active',
    consentGiven: true,
    preferredContact: 'In-App',
    createdAt: '2025-09-02'
  },
  {
    id: 'par-03',
    title: 'Dr.',
    name: 'Emeka Okonkwo',
    phone: '+234 809 333 4455',
    email: 'emeka.okonkwo@health.gov.ng',
    address: '28 Amazon Street, Ministers Hill, Maitama, Abuja',
    occupation: 'Consultant Paediatrician, National Hospital',
    relationship: 'Father',
    linkedChildren: [
      { childId: 'ch-03', childName: 'Chinedu Okonkwo', className: 'Preschool (Pioneers)' }
    ],
    outstandingBalance: 0,
    status: 'Active',
    consentGiven: true,
    preferredContact: 'WhatsApp',
    createdAt: '2024-09-10'
  },
  {
    id: 'par-04',
    title: 'Barr.',
    name: 'Mustapha Bello',
    phone: '+234 803 888 1212',
    email: 'mustapha.bello@lawchambers.ng',
    address: 'Flat 5B, Guzape Hills Luxury Court, Abuja',
    occupation: 'Senior Advocate of Nigeria (Partner)',
    relationship: 'Father',
    linkedChildren: [
      { childId: 'ch-04', childName: 'Amina Bello', className: 'Infants (Nestlings)' }
    ],
    outstandingBalance: 350000,
    status: 'Active',
    consentGiven: true,
    preferredContact: 'Phone Call',
    createdAt: '2026-01-05'
  },
  {
    id: 'par-05',
    title: 'Mrs.',
    name: 'Ngozi Eze',
    phone: '+234 803 666 7788',
    email: 'ngozi.eze@cbn.gov.ng',
    address: 'Block C, CBN Quarters, Garki 2, Abuja',
    occupation: 'Assistant Director, Central Bank of Nigeria',
    relationship: 'Mother',
    linkedChildren: [
      { childId: 'ch-05', childName: 'Somtochukwu Eze', className: 'Aftercare (Academics & Enrichment)' }
    ],
    outstandingBalance: 45000,
    status: 'Active',
    consentGiven: true,
    preferredContact: 'WhatsApp',
    createdAt: '2024-01-15'
  },
  {
    id: 'par-06',
    title: 'Mr.',
    name: 'Umar Danladi',
    phone: '+234 818 444 5566',
    email: 'umar.danladi@nnpcgroup.com',
    address: 'House 19, Wuse 2 Crescent, Abuja',
    occupation: 'Senior Analyst, NNPC Tower',
    relationship: 'Father',
    linkedChildren: [
      { childId: 'ch-06', childName: 'Khadijah Danladi', className: 'Toddlers (Explorers)' }
    ],
    outstandingBalance: 0,
    status: 'Active',
    consentGiven: true,
    preferredContact: 'Email',
    createdAt: '2025-05-10'
  },
  {
    id: 'par-07',
    title: 'Mrs.',
    name: 'Yewande Oladipo',
    phone: '+234 802 888 4433',
    email: 'yewande.oladipo@totalenergies.com',
    address: 'Villa 3, Asokoro Extension, Abuja',
    occupation: 'Finance Lead, TotalEnergies EP Nig.',
    relationship: 'Mother',
    linkedChildren: [
      { childId: 'ch-07', childName: 'Femi Oladipo', className: 'Preschool (Pioneers)' }
    ],
    outstandingBalance: 0,
    status: 'Active',
    consentGiven: true,
    preferredContact: 'In-App',
    createdAt: '2025-03-01'
  },
  {
    id: 'par-08',
    title: 'Capt.',
    name: 'Tamuno Briggs',
    phone: '+234 803 111 9988',
    email: 'tamuno.briggs@airpeace.com',
    address: '7 Jabi Lake Boulevard, Jabi, Abuja',
    occupation: 'Commercial Pilot, Air Peace Ltd.',
    relationship: 'Father',
    linkedChildren: [
      { childId: 'ch-08', childName: 'Tari Briggs', className: 'Infants (Nestlings)' }
    ],
    outstandingBalance: 85000,
    status: 'Active',
    consentGiven: true,
    preferredContact: 'WhatsApp',
    createdAt: '2026-02-01'
  }
];

export const DEMO_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    childId: 'ch-01',
    childName: 'David Adeleke',
    className: 'Toddlers (Explorers)',
    date: '2026-08-19',
    status: 'Present',
    arrivalTime: '07:45 AM',
    temperature: '36.4°C',
    recordedBy: 'Mrs. Folake Adeleke',
    notes: 'Received cheerful; breakfast porridge packet handed in.'
  },
  {
    id: 'att-2',
    childId: 'ch-02',
    childName: 'Zainab Ibrahim',
    className: 'Toddlers (Explorers)',
    date: '2026-08-19',
    status: 'Present',
    arrivalTime: '08:05 AM',
    temperature: '36.6°C',
    recordedBy: 'Mrs. Folake Adeleke',
    notes: 'Arrived with Nanny Laraba. Sleeping bunny toy brought.'
  },
  {
    id: 'att-3',
    childId: 'ch-03',
    childName: 'Chinedu Okonkwo',
    className: 'Preschool (Pioneers)',
    date: '2026-08-19',
    status: 'Present',
    arrivalTime: '07:50 AM',
    temperature: '36.5°C',
    recordedBy: 'Mr. Emmanuel Nwosu',
    notes: 'Excited for today’s sensory painting lesson.'
  },
  {
    id: 'att-4',
    childId: 'ch-04',
    childName: 'Amina Bello',
    className: 'Infants (Nestlings)',
    date: '2026-08-19',
    status: 'Present',
    arrivalTime: '08:15 AM',
    temperature: '36.7°C',
    recordedBy: 'Mrs. Grace Okoro',
    notes: '3 labelled breastmilk bottles stored in dedicated infant fridge.'
  },
  {
    id: 'att-5',
    childId: 'ch-05',
    childName: 'Somtochukwu Eze',
    className: 'Aftercare (Academics & Enrichment)',
    date: '2026-08-19',
    status: 'Late',
    arrivalTime: '09:20 AM',
    temperature: '36.5°C',
    recordedBy: 'Mrs. Zainab Aliyu',
    notes: 'Parent notified Abuja morning highway traffic on Shehu Shagari Way.'
  },
  {
    id: 'att-6',
    childId: 'ch-06',
    childName: 'Khadijah Danladi',
    className: 'Toddlers (Explorers)',
    date: '2026-08-19',
    status: 'Absent',
    recordedBy: 'Mrs. Folake Adeleke',
    notes: 'Mother called at 07:15 AM: mild nasal congestion, resting at home.'
  },
  {
    id: 'att-7',
    childId: 'ch-07',
    childName: 'Femi Oladipo',
    className: 'Preschool (Pioneers)',
    date: '2026-08-19',
    status: 'Present',
    arrivalTime: '07:30 AM',
    temperature: '36.3°C',
    recordedBy: 'Mr. Emmanuel Nwosu',
    notes: 'Early arrival, had quiet book reading time.'
  },
  {
    id: 'att-8',
    childId: 'ch-08',
    childName: 'Tari Briggs',
    className: 'Infants (Nestlings)',
    date: '2026-08-19',
    status: 'Present',
    arrivalTime: '08:00 AM',
    temperature: '36.6°C',
    recordedBy: 'Mrs. Grace Okoro',
    notes: 'Fruit mash bowl provided by mother.'
  }
];

export const DEMO_LEADS: AdmissionsLead[] = [
  {
    id: 'lead-01',
    parentName: 'Dr. Aisha Mohammed',
    phone: '+234 803 234 5678',
    email: 'aisha.mohammed@who.int',
    childName: 'Tahir Mohammed',
    childAge: '11 months',
    desiredProgramme: 'Infant Care',
    preferredStartDate: '2026-09-01',
    leadSource: 'Referral',
    stage: 'New Enquiry',
    notes: 'Inquired about infant nurse-to-baby ratio and sterilisation routines.',
    nextFollowUpDate: '2026-08-20',
    assignedStaff: 'Amina Yusuf (Admissions Lead)',
    estimatedFee: 450000,
    history: [
      { date: '2026-08-18', action: 'Website inquiry form submitted', user: 'System' }
    ]
  },
  {
    id: 'lead-02',
    parentName: 'Mr. Chidi Nwankwo',
    phone: '+234 802 999 1122',
    email: 'chidi.nwankwo@kpmg.com',
    childName: 'Kamsi Nwankwo',
    childAge: '2 years',
    desiredProgramme: 'Toddler Creche',
    preferredStartDate: '2026-09-15',
    leadSource: 'Instagram',
    stage: 'Tour Scheduled',
    notes: 'Wants to see the outdoor sensory play garden and toddler nap suites.',
    tourDate: '2026-08-21',
    tourTime: '10:30 AM',
    nextFollowUpDate: '2026-08-21',
    assignedStaff: 'Amina Yusuf (Admissions Lead)',
    estimatedFee: 420000,
    history: [
      { date: '2026-08-15', action: 'Instagram DM Enquiry', user: 'AI Admissions Agent' },
      { date: '2026-08-16', action: 'Direct phone follow-up call conducted', user: 'Amina Yusuf' },
      { date: '2026-08-17', action: 'Tour scheduled for Friday 10:30 AM', user: 'Amina Yusuf' }
    ]
  },
  {
    id: 'lead-03',
    parentName: 'Mrs. Halimat Sanusi',
    phone: '+234 807 444 8899',
    email: 'halimat.sanusi@gtbank.com',
    childName: 'Farouk Sanusi',
    childAge: '3 years 2 months',
    desiredProgramme: 'Preschool',
    preferredStartDate: '2026-09-01',
    leadSource: 'Parent Recommendation',
    stage: 'Application Submitted',
    notes: 'Recommended by Engr. Adeleke. Medical immunization record already attached.',
    nextFollowUpDate: '2026-08-22',
    assignedStaff: 'Mrs. Folake Adeleke',
    estimatedFee: 380000,
    history: [
      { date: '2026-08-10', action: 'Physical tour completed with Director', user: 'Mrs. Judith Ogbonna' },
      { date: '2026-08-14', action: 'Formal admission application pack returned', user: 'Amina Yusuf' }
    ]
  },
  {
    id: 'lead-04',
    parentName: 'Barr. & Mrs. Oladimeji Peters',
    phone: '+234 814 123 9090',
    email: 'oladimeji.peters@chambers.ng',
    childName: 'Tiwa Peters',
    childAge: '18 months',
    desiredProgramme: 'Toddler Creche',
    preferredStartDate: '2026-08-25',
    leadSource: 'Walk-in',
    stage: 'Payment Pending',
    notes: 'Assessment passed. Term invoice issued; awaiting bank transfer confirmation.',
    nextFollowUpDate: '2026-08-20',
    assignedStaff: 'Kelechi Okafor (Finance)',
    estimatedFee: 420000,
    history: [
      { date: '2026-08-12', action: 'Admission approved by Director', user: 'Mrs. Judith Ogbonna' },
      { date: '2026-08-16', action: 'Invoice INV-2026-089 generated & sent to parent', user: 'Kelechi Okafor' }
    ]
  },
  {
    id: 'lead-05',
    parentName: 'Dr. Obinna Okoye',
    phone: '+234 803 765 4321',
    email: 'obinna.okoye@nisa.org',
    childName: 'Chiamaka Okoye',
    childAge: '4 years',
    desiredProgramme: 'Aftercare',
    preferredStartDate: '2026-09-01',
    leadSource: 'Google Search',
    stage: 'Contacted',
    notes: 'Seeking aftercare pickup from nearby nursery school with homework assistance.',
    nextFollowUpDate: '2026-08-22',
    assignedStaff: 'Amina Yusuf (Admissions Lead)',
    estimatedFee: 180000,
    history: [
      { date: '2026-08-18', action: 'AI sent admissions brochure & curriculum overview', user: 'AI Admissions Agent' }
    ]
  },
  {
    id: 'lead-06',
    parentName: 'Alhaji Bashir Gidado',
    phone: '+234 809 555 1234',
    email: 'bashir.gidado@fcta.gov.ng',
    childName: 'Aliyu Gidado',
    childAge: '2.5 years',
    desiredProgramme: 'Preschool',
    preferredStartDate: '2026-09-01',
    leadSource: 'Referral',
    stage: 'Tour Completed',
    notes: 'Parent expressed immense satisfaction with safety cameras and play areas.',
    nextFollowUpDate: '2026-08-20',
    assignedStaff: 'Amina Yusuf (Admissions Lead)',
    estimatedFee: 380000,
    history: [
      { date: '2026-08-17', action: 'Campus tour hosted by Director', user: 'Mrs. Judith Ogbonna' }
    ]
  },
  {
    id: 'lead-07',
    parentName: 'Mrs. Sandra Umeh',
    phone: '+234 802 333 7711',
    email: 'sandra.umeh@firs.gov.ng',
    childName: 'Bryan Umeh',
    childAge: '14 months',
    desiredProgramme: 'Toddler Creche',
    preferredStartDate: '2026-07-01',
    leadSource: 'Instagram',
    stage: 'Enrolled',
    notes: 'Completed onboarding. Child successfully integrated into Explorers class.',
    nextFollowUpDate: '—',
    assignedStaff: 'Mrs. Folake Adeleke',
    estimatedFee: 420000,
    history: [
      { date: '2026-07-01', action: 'Enrollment confirmed and reg ID assigned', user: 'System' }
    ]
  },
  {
    id: 'lead-08',
    parentName: 'Mr. Jude Alakija',
    phone: '+234 806 888 2233',
    email: 'jude.alakija@gmail.com',
    childName: 'Leo Alakija',
    childAge: '3 years',
    desiredProgramme: 'Preschool',
    preferredStartDate: '2026-05-01',
    leadSource: 'Flyer',
    stage: 'Lost',
    notes: 'Relocated family to Lagos due to corporate transfer.',
    nextFollowUpDate: '—',
    assignedStaff: 'Amina Yusuf (Admissions Lead)',
    estimatedFee: 380000,
    history: [
      { date: '2026-05-10', action: 'Parent marked lead as lost due to interstate relocation', user: 'Amina Yusuf' }
    ]
  }
];

export const DEMO_INVOICES: Invoice[] = [
  {
    id: 'inv-01',
    invoiceNumber: 'INV-2026-001',
    parentId: 'par-01',
    parentName: 'Engr. Babatunde Adeleke',
    parentEmail: 'babatunde.adeleke@gmail.com',
    childId: 'ch-01',
    childName: 'David Adeleke',
    className: 'Toddlers (Explorers)',
    term: 'Term 1 (Sept – Dec 2026)',
    items: [
      { id: 'item-1', description: 'Toddler Creche Tuition & Care', quantity: 1, unitPrice: 380000, amount: 380000 },
      { id: 'item-2', description: 'Organic Lunch & Snack Plan', quantity: 1, unitPrice: 60000, amount: 60000 },
      { id: 'item-3', description: 'Sensory Learning & Arts Material Kit', quantity: 1, unitPrice: 35000, amount: 35000 }
    ],
    subtotal: 475000,
    discount: 25000,
    totalAmount: 450000,
    paidAmount: 450000,
    dueDate: '2026-08-15',
    issueDate: '2026-08-01',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    paymentDate: '2026-08-05',
    receiptNumber: 'REC-2026-0041',
    notes: 'Paid in full via Zenith Bank corporate transfer.'
  },
  {
    id: 'inv-02',
    invoiceNumber: 'INV-2026-002',
    parentId: 'par-02',
    parentName: 'Hajia Fatima Ibrahim',
    parentEmail: 'fatima.ibrahim@yahoo.com',
    childId: 'ch-02',
    childName: 'Zainab Ibrahim',
    className: 'Toddlers (Explorers)',
    term: 'Term 1 (Sept – Dec 2026)',
    items: [
      { id: 'item-1', description: 'Toddler Creche Tuition & Care', quantity: 1, unitPrice: 380000, amount: 380000 },
      { id: 'item-2', description: 'Halal Hot Meal & Fruit Plan', quantity: 1, unitPrice: 60000, amount: 60000 }
    ],
    subtotal: 440000,
    discount: 0,
    totalAmount: 440000,
    paidAmount: 320000,
    dueDate: '2026-08-20',
    issueDate: '2026-08-01',
    status: 'Partially Paid',
    paymentMethod: 'POS',
    paymentDate: '2026-08-08',
    receiptNumber: 'REC-2026-0058',
    notes: 'First installment ₦320,000 paid at front desk POS; balance ₦120,000 due Aug 20.'
  },
  {
    id: 'inv-03',
    invoiceNumber: 'INV-2026-003',
    parentId: 'par-03',
    parentName: 'Dr. Emeka Okonkwo',
    parentEmail: 'emeka.okonkwo@health.gov.ng',
    childId: 'ch-03',
    childName: 'Chinedu Okonkwo',
    className: 'Preschool (Pioneers)',
    term: 'Term 1 (Sept – Dec 2026)',
    items: [
      { id: 'item-1', description: 'Preschool Pioneers Tuition & Learning Program', quantity: 1, unitPrice: 400000, amount: 400000 },
      { id: 'item-2', description: 'Robotics & STEM Early Intro Kit', quantity: 1, unitPrice: 45000, amount: 45000 },
      { id: 'item-3', description: 'School Uniform Pack (3 sets + apron)', quantity: 1, unitPrice: 30000, amount: 30000 }
    ],
    subtotal: 475000,
    discount: 0,
    totalAmount: 475000,
    paidAmount: 475000,
    dueDate: '2026-08-10',
    issueDate: '2026-08-01',
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    paymentDate: '2026-08-03',
    receiptNumber: 'REC-2026-0032',
    notes: 'Paid in full via GTBank transfer.'
  },
  {
    id: 'inv-04',
    invoiceNumber: 'INV-2026-004',
    parentId: 'par-04',
    parentName: 'Barr. Mustapha Bello',
    parentEmail: 'mustapha.bello@lawchambers.ng',
    childId: 'ch-04',
    childName: 'Amina Bello',
    className: 'Infants (Nestlings)',
    term: 'Term 1 (Sept – Dec 2026)',
    items: [
      { id: 'item-1', description: 'Premium Infant Full-Day Care (3-12 mos)', quantity: 1, unitPrice: 480000, amount: 480000 },
      { id: 'item-2', description: 'Sterilisation & Nursery Care Supplies', quantity: 1, unitPrice: 40000, amount: 40000 }
    ],
    subtotal: 520000,
    discount: 0,
    totalAmount: 520000,
    paidAmount: 170000,
    dueDate: '2026-08-15',
    issueDate: '2026-08-01',
    status: 'Overdue',
    paymentMethod: 'Bank Transfer',
    paymentDate: '2026-08-02',
    receiptNumber: 'REC-2026-0012',
    notes: 'Deposit paid. Outstanding balance of ₦350,000 is overdue by 4 days.'
  },
  {
    id: 'inv-05',
    invoiceNumber: 'INV-2026-005',
    parentId: 'par-05',
    parentName: 'Mrs. Ngozi Eze',
    parentEmail: 'ngozi.eze@cbn.gov.ng',
    childId: 'ch-05',
    childName: 'Somtochukwu Eze',
    className: 'Aftercare (Academics & Enrichment)',
    term: 'Term 1 (Sept – Dec 2026)',
    items: [
      { id: 'item-1', description: 'Daily Aftercare & Homework Mentorship', quantity: 1, unitPrice: 180000, amount: 180000 },
      { id: 'item-2', description: 'Evening Snack & Fruit Platter', quantity: 1, unitPrice: 35000, amount: 35000 }
    ],
    subtotal: 215000,
    discount: 0,
    totalAmount: 215000,
    paidAmount: 170000,
    dueDate: '2026-08-25',
    issueDate: '2026-08-05',
    status: 'Partially Paid',
    paymentMethod: 'Bank Transfer',
    paymentDate: '2026-08-10',
    receiptNumber: 'REC-2026-0067',
    notes: '₦45,000 final installment scheduled for end of month.'
  },
  {
    id: 'inv-06',
    invoiceNumber: 'INV-2026-006',
    parentId: 'par-08',
    parentName: 'Capt. Tamuno Briggs',
    parentEmail: 'tamuno.briggs@airpeace.com',
    childId: 'ch-08',
    childName: 'Tari Briggs',
    className: 'Infants (Nestlings)',
    term: 'Term 1 (Sept – Dec 2026)',
    items: [
      { id: 'item-1', description: 'Infant Care Half-Day Program', quantity: 1, unitPrice: 380000, amount: 380000 }
    ],
    subtotal: 380000,
    discount: 0,
    totalAmount: 380000,
    paidAmount: 295000,
    dueDate: '2026-08-28',
    issueDate: '2026-08-10',
    status: 'Pending',
    notes: '₦85,000 balance invoice sent; due in 9 days.'
  }
];

export const DEMO_DAILY_REPORTS: DailyReport[] = [
  {
    id: 'rep-01',
    childId: 'ch-01',
    childName: 'David Adeleke',
    className: 'Toddlers (Explorers)',
    date: '2026-08-19',
    teacherId: 'stf-02',
    teacherName: 'Mrs. Folake Adeleke',
    meals: {
      breakfast: 'Oatmeal with banana slices — Ate 100%',
      lunch: 'Jollof rice with steamed diced carrots & tender shredded chicken — Ate 85%',
      snack: 'Watermelon cubes & water biscuit — Finished completely',
      waterIntake: '450ml throughout the day'
    },
    nap: {
      startTime: '1:00 PM',
      endTime: '2:15 PM',
      duration: '1 hr 15 mins',
      quality: 'Deep and peaceful after sensory rhythm music'
    },
    activities: 'Building block color towers, sandbox exploration, circle rhyme time ("Old MacDonald")',
    mood: 'Cheerful & Energetic',
    learningActivity: 'Recognised and named primary colors (Blue and Yellow) during group sorting game',
    pottyDiaper: {
      wet: 3,
      soiled: 1,
      pottyTrips: 2
    },
    generalObservation: 'David had a joyful day! He showed great empathy sharing blocks with his friend Zainab.',
    status: 'Approved',
    isAiGenerated: true,
    rawTeacherNotes: 'David ate most of his lunch, slept from 1pm to 2:15pm and enjoyed outdoor play. Shared toys nicely with Zainab.',
    approvedBy: 'Mrs. Folake Adeleke',
    approvedAt: '2026-08-19 03:30 PM'
  },
  {
    id: 'rep-02',
    childId: 'ch-02',
    childName: 'Zainab Ibrahim',
    className: 'Toddlers (Explorers)',
    date: '2026-08-19',
    teacherId: 'stf-02',
    teacherName: 'Mrs. Folake Adeleke',
    meals: {
      breakfast: 'Custard with fortified milk — Ate 90%',
      lunch: 'Steamed mashed plantain with vegetable stew (Halal chicken) — Ate 75%',
      snack: 'Sliced pawpaw & apple wedges',
      waterIntake: '400ml'
    },
    nap: {
      startTime: '12:45 PM',
      endTime: '2:00 PM',
      duration: '1 hr 15 mins',
      quality: 'Rested comfortably holding her bedtime rabbit'
    },
    activities: 'Finger painting with washable non-toxic greens and blues, outdoor tricycle riding',
    mood: 'Social & Playful',
    learningActivity: 'Fine motor coordination: stringing large wooden beads onto safety cords',
    pottyDiaper: {
      wet: 4,
      soiled: 0,
      pottyTrips: 3
    },
    generalObservation: 'Zainab was very communicative today, practicing multi-word sentences and singing the greeting song.',
    status: 'Draft',
    isAiGenerated: false
  },
  {
    id: 'rep-03',
    childId: 'ch-03',
    childName: 'Chinedu Okonkwo',
    className: 'Preschool (Pioneers)',
    date: '2026-08-19',
    teacherId: 'stf-03',
    teacherName: 'Mr. Emmanuel Nwosu',
    meals: {
      breakfast: 'Pancake roll with pure honey drizzle — 100%',
      lunch: 'Fried rice with green peas & grilled fish — 90%',
      snack: 'Granola biscuit & warm milk',
      waterIntake: '600ml'
    },
    nap: {
      startTime: '1:15 PM',
      endTime: '2:30 PM',
      duration: '1 hr 15 mins',
      quality: 'Sound sleep'
    },
    activities: 'Phonics flashcard bingo, outdoor mini-obstacle relay, planting bean seeds in indoor bio-cups',
    mood: 'Calm & Engaged',
    learningActivity: 'Recognized letter sounds /b/, /m/, /s/ and traced their shapes in colored sand trays',
    pottyDiaper: {
      wet: 0,
      soiled: 0,
      pottyTrips: 4
    },
    generalObservation: 'Chinedu took great initiative watering the classroom garden project.',
    status: 'Approved',
    isAiGenerated: true,
    rawTeacherNotes: 'Chinedu took good lead in phonics game, ate all breakfast and had a solid 1hr 15m rest.',
    approvedBy: 'Mr. Emmanuel Nwosu',
    approvedAt: '2026-08-19 03:45 PM'
  }
];

export const DEMO_STAFF: StaffMember[] = [
  {
    id: 'stf-01',
    staffNumber: 'STF-001',
    name: 'Mrs. Judith Ogbonna',
    role: 'School Director & Founder',
    department: 'Administration',
    phone: '+234 803 100 2000',
    email: 'director@labebesmartcare.ng',
    employmentStatus: 'Full-time',
    attendanceToday: 'Present',
    leaveDaysRemaining: 18,
    certifications: ['M.Ed. Early Childhood Leadership (Univ of Ibadan)', 'Montessori Certified Director (NAMC)', 'Paediatric First Aid & CPR (Red Cross)'],
    joinedDate: '2020-01-15',
    emergencyContact: 'Engr. Victor Ogbonna (+234 802 333 4411)',
    avatarColor: 'bg-indigo-600'
  },
  {
    id: 'stf-02',
    staffNumber: 'STF-002',
    name: 'Mrs. Folake Adeleke',
    role: 'Lead Toddler Educator',
    department: 'Teaching',
    classAssigned: 'Toddlers (Explorers)',
    phone: '+234 802 345 6789',
    email: 'folake.adeleke@labebesmartcare.ng',
    employmentStatus: 'Full-time',
    attendanceToday: 'Present',
    leaveDaysRemaining: 14,
    certifications: ['B.Sc. Primary Education (UNILAG)', 'Early Years Foundation Stage (EYFS) Specialist', 'Child Safeguarding Level 3'],
    joinedDate: '2021-08-01',
    emergencyContact: 'Mr. Kolade Adeleke (+234 803 555 8899)',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'stf-03',
    staffNumber: 'STF-003',
    name: 'Mr. Emmanuel Nwosu',
    role: 'Lead Preschool Teacher & STEM Coordinator',
    department: 'Teaching',
    classAssigned: 'Preschool (Pioneers)',
    phone: '+234 806 777 8899',
    email: 'emmanuel.nwosu@labebesmartcare.ng',
    employmentStatus: 'Full-time',
    attendanceToday: 'Present',
    leaveDaysRemaining: 15,
    certifications: ['B.Ed. Science Education', 'Lego Early STEM Educator Certified', 'Paediatric Basic Life Support'],
    joinedDate: '2022-09-01',
    emergencyContact: 'Mrs. Chinyere Nwosu (+234 809 111 2244)',
    avatarColor: 'bg-teal-600'
  },
  {
    id: 'stf-04',
    staffNumber: 'STF-004',
    name: 'Mrs. Grace Okoro',
    role: 'Senior Registered Paediatric Nurse / Infant Lead',
    department: 'Care & Creche',
    classAssigned: 'Infants (Nestlings)',
    phone: '+234 803 999 0011',
    email: 'grace.okoro@labebesmartcare.ng',
    employmentStatus: 'Full-time',
    attendanceToday: 'Present',
    leaveDaysRemaining: 12,
    certifications: ['Registered Paediatric Nurse (NMCN)', 'Neonatal Care & Resuscitation', 'Infection Control Specialist'],
    joinedDate: '2021-01-10',
    emergencyContact: 'Mr. Paul Okoro (+234 802 888 7766)',
    avatarColor: 'bg-rose-600'
  },
  {
    id: 'stf-05',
    staffNumber: 'STF-005',
    name: 'Mr. Kelechi Okafor',
    role: 'Finance Officer & Bursar',
    department: 'Finance',
    phone: '+234 805 222 3344',
    email: 'finance@labebesmartcare.ng',
    employmentStatus: 'Full-time',
    attendanceToday: 'Present',
    leaveDaysRemaining: 16,
    certifications: ['B.Sc. Accounting (UNN)', 'ICAN Chartered Accountant', 'SaaS Financial Management'],
    joinedDate: '2023-03-15',
    emergencyContact: 'Mrs. Nkechi Okafor (+234 807 666 5544)',
    avatarColor: 'bg-amber-600'
  },
  {
    id: 'stf-06',
    staffNumber: 'STF-006',
    name: 'Mrs. Amina Yusuf',
    role: 'Admissions & Parent Relations Officer',
    department: 'Administration',
    phone: '+234 803 444 1100',
    email: 'admissions@labebesmartcare.ng',
    employmentStatus: 'Full-time',
    attendanceToday: 'Present',
    leaveDaysRemaining: 10,
    certifications: ['B.A. Mass Communication', 'Customer Experience & CRM Specialist'],
    joinedDate: '2023-01-05',
    emergencyContact: 'Alhaji Haruna Yusuf (+234 802 111 8899)',
    avatarColor: 'bg-purple-600'
  },
  {
    id: 'stf-07',
    staffNumber: 'STF-007',
    name: 'Mrs. Zainab Aliyu',
    role: 'Aftercare Lead & Homework Mentor',
    department: 'Teaching',
    classAssigned: 'Aftercare (Academics & Enrichment)',
    phone: '+234 809 222 6677',
    email: 'zainab.aliyu@labebesmartcare.ng',
    employmentStatus: 'Full-time',
    attendanceToday: 'Present',
    leaveDaysRemaining: 15,
    certifications: ['B.Sc. Psychology & Child Development (ABU Zaria)', 'First Aid Certified'],
    joinedDate: '2023-08-15',
    emergencyContact: 'Mr. Kabir Aliyu (+234 803 999 5511)',
    avatarColor: 'bg-cyan-600'
  },
  {
    id: 'stf-08',
    staffNumber: 'STF-008',
    name: 'Ms. Blessing Danjuma',
    role: 'Infant Assistant Nurse',
    department: 'Care & Creche',
    classAssigned: 'Infants (Nestlings)',
    phone: '+234 818 777 4433',
    email: 'blessing.danjuma@labebesmartcare.ng',
    employmentStatus: 'Full-time',
    attendanceToday: 'Present',
    leaveDaysRemaining: 20,
    certifications: ['Diploma in Community Health (CHEW)', 'Paediatric CPR'],
    joinedDate: '2024-02-01',
    emergencyContact: 'Mr. Danjuma Yakubu (+234 803 444 3322)',
    avatarColor: 'bg-pink-600'
  }
];

export const DEMO_ACTIVITIES: ChildActivity[] = [
  {
    id: 'act-01',
    title: 'Sensory Color Sorting & Texture Trays',
    classId: 'cls-2',
    className: 'Toddlers (Explorers)',
    date: '2026-08-19',
    time: '10:00 AM – 10:45 AM',
    teacherName: 'Mrs. Folake Adeleke',
    category: 'Motor Skills',
    learningObjective: 'Develop pincer grasp and categorize soft, rough, and smooth sensory materials.',
    participantsCount: 15,
    materialsNeeded: ['Colored silk scarves', 'Smooth river pebbles', 'Foam sponges', 'Sorting bins'],
    notes: 'Toddlers demonstrated great enthusiasm matching yellow sponges and blue silk scarves.',
    status: 'Completed',
    evaluationSummary: '14 out of 15 children successfully completed 3 texture pairings without frustration.'
  },
  {
    id: 'act-02',
    title: 'Early Phonics Sound Bingo (/s/, /a/, /t/, /p/)',
    classId: 'cls-3',
    className: 'Preschool (Pioneers)',
    date: '2026-08-19',
    time: '09:30 AM – 10:15 AM',
    teacherName: 'Mr. Emmanuel Nwosu',
    category: 'Language',
    learningObjective: 'Phonemic awareness: recognize starting sound of animals and household items.',
    participantsCount: 18,
    materialsNeeded: ['Illustrated picture tokens', 'Phonics bingo cards', 'Magnetic sound board'],
    notes: 'High peer interaction; Chinedu and Femi assisted peers in sound matching.',
    status: 'Completed',
    evaluationSummary: 'Exceeded target: 80% of children identified all 4 initial sounds.'
  },
  {
    id: 'act-03',
    title: 'Nursery Rhyme Percussion Jam',
    classId: 'cls-2',
    className: 'Toddlers (Explorers)',
    date: '2026-08-19',
    time: '11:15 AM – 11:45 AM',
    teacherName: 'Mrs. Folake Adeleke',
    category: 'Music',
    learningObjective: 'Rhythm synchronization, stop-and-go listening cues with mini maracas.',
    participantsCount: 15,
    materialsNeeded: ['Wooden egg shakers', 'Mini African talking drums (Toy)', 'Xylophones'],
    notes: 'Practiced tempo changes (fast, slow, freeze).',
    status: 'In Progress'
  },
  {
    id: 'act-04',
    title: 'Counting with Nature: Pinecones & Acorns',
    classId: 'cls-3',
    className: 'Preschool (Pioneers)',
    date: '2026-08-20',
    time: '10:00 AM – 10:45 AM',
    teacherName: 'Mr. Emmanuel Nwosu',
    category: 'Numeracy',
    learningObjective: 'One-to-one correspondence counting numbers 1 through 10.',
    participantsCount: 20,
    materialsNeeded: ['Numbered counting logs', 'Pinecones', 'Felt counting dots'],
    notes: 'Hands-on numeracy session planned in the outdoor courtyard.',
    status: 'Planned'
  },
  {
    id: 'act-05',
    title: 'Safe Road Signs & Community Helpers Roleplay',
    classId: 'cls-4',
    className: 'Aftercare (Academics & Enrichment)',
    date: '2026-08-19',
    time: '03:30 PM – 04:30 PM',
    teacherName: 'Mrs. Zainab Aliyu',
    category: 'School Readiness',
    learningObjective: 'Understanding traffic light cues, pedestrian safety, and doctors/firefighters roles.',
    participantsCount: 16,
    materialsNeeded: ['Traffic lights toy prop', 'Zebra crossing mat', 'Helper hats'],
    notes: 'Focus on road safety habits in urban Abuja.',
    status: 'Planned'
  }
];

export const DEMO_INCIDENTS: IncidentReport[] = [
  {
    id: 'inc-01',
    incidentNumber: 'INC-2026-012',
    childId: 'ch-01',
    childName: 'David Adeleke',
    className: 'Toddlers (Explorers)',
    date: '2026-08-14',
    time: '11:20 AM',
    location: 'Toddler Soft Playground',
    category: 'Accident',
    severity: 'Low',
    description: 'David tripped while chasing a foam ball on the padded turf and sustained a tiny scratch on his left knee (no bleeding).',
    immediateActionTaken: 'Nurse Grace cleaned area with saline solution and applied a soothing cartoon plaster. Child comforted immediately.',
    staffInvolved: ['Mrs. Folake Adeleke', 'Mrs. Grace Okoro (Nurse)'],
    firstAidGiven: true,
    firstAidDetails: 'Saline wipe and protective skin strip applied.',
    parentNotified: true,
    parentNotificationTime: '11:35 AM',
    parentNotificationMethod: 'WhatsApp / App',
    managementReview: 'Reviewed & Approved',
    managementNotes: 'Minor incident managed strictly per protocol. Turf integrity inspected and cleared.',
    status: 'Resolved',
    isSafeguarding: false
  },
  {
    id: 'inc-02',
    incidentNumber: 'INC-2026-013',
    childId: 'ch-05',
    childName: 'Somtochukwu Eze',
    className: 'Aftercare (Academics & Enrichment)',
    date: '2026-08-18',
    time: '04:15 PM',
    location: 'Front Reception Gate',
    category: 'Parent Complaint',
    severity: 'Medium',
    description: 'Driver Musa arrived for pickup without the secondary physical QR authorization card; security held driver until verified with mother.',
    immediateActionTaken: 'Security called Mrs. Ngozi Eze directly to verify one-time authorization before releasing child with security escort.',
    staffInvolved: ['Security Officer Bitrus', 'Mrs. Judith Ogbonna'],
    firstAidGiven: false,
    parentNotified: true,
    parentNotificationTime: '04:20 PM',
    parentNotificationMethod: 'Phone Call',
    managementReview: 'Reviewed & Approved',
    managementNotes: 'Child safety protocol executed 100% correctly by security gate. Mother appreciated the strict verification.',
    status: 'Resolved',
    isSafeguarding: false
  },
  {
    id: 'inc-03',
    incidentNumber: 'INC-2026-014',
    childId: 'ch-02',
    childName: 'Zainab Ibrahim',
    className: 'Toddlers (Explorers)',
    date: '2026-08-19',
    time: '08:45 AM',
    location: 'Classroom 102',
    category: 'Safeguarding',
    severity: 'Critical (Safeguarding)',
    description: 'Routine morning health check noted faint bruise on right wrist. Teacher immediately logged for nurse verification per school safeguarding standard.',
    immediateActionTaken: 'Nurse Grace and Director Judith held a gentle, non-leading conversation with child; Mother Hajia Fatima contacted. Mother explained child fell off home sofa bed yesterday evening.',
    staffInvolved: ['Mrs. Folake Adeleke', 'Mrs. Grace Okoro', 'Mrs. Judith Ogbonna'],
    firstAidGiven: false,
    parentNotified: true,
    parentNotificationTime: '09:10 AM',
    parentNotificationMethod: 'Phone Call',
    managementReview: 'Reviewed & Approved',
    managementNotes: 'Mother confirmed domestic sofa tumble. Nurse logged documented photograph in secure safeguarding audit file.',
    status: 'Resolved',
    isSafeguarding: true
  }
];

export const DEMO_AI_AGENTS: AIAgent[] = [
  {
    id: 'agt-01',
    number: 1,
    name: 'Parent Concierge',
    code: 'CONCIERGE_AI',
    category: 'Operations',
    purpose: 'Instant 24/7 intelligent answering for parent FAQs, drop-off guidelines, calendar events, and menu inquiries.',
    status: 'Active',
    capabilities: ['Multilingual conversational NLP', 'Handbook & Policy lookup', 'Drop-off & Pick-up FAQ triage'],
    tools: ['Knowledge Base Query', 'Parent Directory Search', 'Menu & Events API'],
    lastActivity: '12 mins ago (Answered meal schedule query)',
    executionCount: 1420,
    enabled: true,
    triggerEvent: 'Parent in-app message or portal chat'
  },
  {
    id: 'agt-02',
    number: 2,
    name: 'Admissions Agent',
    code: 'ADMISSIONS_AI',
    category: 'Admissions & CRM',
    purpose: 'Nurtures prospective parent leads, schedules physical campus tours, and automates admission packet follow-ups.',
    status: 'Active',
    capabilities: ['Lead qualification scoring', 'Automated tour calendar booking', 'Admissions CRM stage transitions'],
    tools: ['Admissions CRM', 'Tour Scheduler Engine', 'WhatsApp/Email Dispatcher'],
    lastActivity: '35 mins ago (Tour booked for Friday 10:30 AM)',
    executionCount: 890,
    enabled: true,
    triggerEvent: 'New enquiry submission / Lead status change'
  },
  {
    id: 'agt-03',
    number: 3,
    name: 'Finance Agent',
    code: 'FINANCE_AI',
    category: 'Finance',
    purpose: 'Tracks school fee collections, drafts automated gentle payment reminders, and computes daily cash flow reconciliations.',
    status: 'Active',
    capabilities: ['Overdue account detection', 'Smart payment reminder dispatch', 'Term fee reconciliation & reporting'],
    tools: ['Invoice Ledger', 'Fee Calculator', 'Statement Generator'],
    lastActivity: '1 hr ago (Reconciled ₦450,000 Term 1 receipts)',
    executionCount: 654,
    enabled: true,
    triggerEvent: 'Invoice due date trigger / Bank payment log'
  },
  {
    id: 'agt-04',
    number: 4,
    name: 'Daily Report Agent',
    code: 'DAILY_REPORT_AI',
    category: 'Care & Safety',
    purpose: 'Converts unstructured teacher voice notes and rough bullet points into beautifully formatted, structured daily reports.',
    status: 'Active',
    capabilities: ['Natural language parsing into meals/nap/mood', 'Vocabulary enrichment for milestones', 'Teacher approval routing'],
    tools: ['Daily Report Parser', 'Child Activity Logger', 'Parent Feed Gateway'],
    lastActivity: '4 mins ago (Drafted report for David Adeleke)',
    executionCount: 3120,
    enabled: true,
    triggerEvent: 'Teacher voice/text draft submission'
  },
  {
    id: 'agt-05',
    number: 5,
    name: 'Parent Communication Agent',
    code: 'COMMUNICATION_AI',
    category: 'Operations',
    purpose: 'Drafts professional school broadcasts, weather advisories, holiday announcements, and empathetic parent replies.',
    status: 'Active',
    capabilities: ['Tone adjustment (warm, reassuring, formal)', 'Broadcast segmentation by class', 'Multi-channel drafting'],
    tools: ['Announcements Engine', 'Parent Segmentation Tool', 'SMS/Email Gateway'],
    lastActivity: '2 hrs ago (Drafted Abuja public holiday memo)',
    executionCount: 940,
    enabled: true,
    triggerEvent: 'Broadcast composer trigger'
  },
  {
    id: 'agt-06',
    number: 6,
    name: 'Attendance Agent',
    code: 'ATTENDANCE_AI',
    category: 'Care & Safety',
    purpose: 'Monitors real-time headcounts, flags unnotified morning absences by 9:00 AM, and alerts teachers to missing check-ins.',
    status: 'Active',
    capabilities: ['Automated 9:00 AM absence sweep', 'Teacher check-in reminder triggers', 'Monthly attendance pattern analytics'],
    tools: ['Live Attendance Scanner', 'Parent SMS Ping', 'Ratio Calculator'],
    lastActivity: '8:45 AM today (Swept 4 classrooms; 58/64 present)',
    executionCount: 2200,
    enabled: true,
    triggerEvent: 'Daily time-based trigger (09:00 AM)'
  },
  {
    id: 'agt-07',
    number: 7,
    name: 'Child Safety Agent',
    code: 'SAFETY_AI',
    category: 'Care & Safety',
    purpose: 'Continuously validates allergy alerts, medical dietary restrictions, and authorized pickup photo verification.',
    status: 'Active',
    capabilities: ['Allergy alert flagging on daily meals', 'Pickup identity authorization check', 'Medical condition expiry alerts'],
    tools: ['Medical Registry', 'Authorized Pickup Validator', 'Kitchen Meal Dispatch'],
    lastActivity: '07:45 AM (Verified allergy tag for David Adeleke)',
    executionCount: 4500,
    enabled: true,
    triggerEvent: 'Check-in event / Meal service preparation'
  },
  {
    id: 'agt-08',
    number: 8,
    name: 'Incident Agent',
    code: 'INCIDENT_AI',
    category: 'Care & Safety',
    purpose: 'Guides staff through standardized incident reporting protocols, ensures mandatory first-aid logging, and routes safeguarding alerts.',
    status: 'Active',
    capabilities: ['Safeguarding severity escalation', 'Mandatory field verification', 'Management notification routing'],
    tools: ['Incident Logger', 'Director Alert Gateway', 'Safeguarding Registry'],
    lastActivity: 'Yesterday 04:15 PM (Logged pickup verification event)',
    executionCount: 180,
    enabled: true,
    triggerEvent: 'Incident creation event'
  },
  {
    id: 'agt-09',
    number: 9,
    name: 'Teacher Assistant',
    code: 'TEACHER_ASST_AI',
    category: 'Operations',
    purpose: 'Helps educators generate age-appropriate sensory lesson plans, circle-time stories, and developmental transition prompts.',
    status: 'Active',
    capabilities: ['EYFS aligned lesson generator', 'Montessori activity generator', 'Sensory supply list creator'],
    tools: ['Curriculum DB', 'Activity Planner', 'Resource Generator'],
    lastActivity: '3 hrs ago (Generated Toddler texture sorting plan)',
    executionCount: 1890,
    enabled: true,
    triggerEvent: 'Teacher planning session request'
  },
  {
    id: 'agt-10',
    number: 10,
    name: 'Curriculum Agent',
    code: 'CURRICULUM_AI',
    category: 'Operations',
    purpose: 'Maps weekly classroom activities against national early learning benchmarks and developmental milestones.',
    status: 'Active',
    capabilities: ['Milestone gap analysis', 'Weekly learning theme structuring', 'Term syllabus tracker'],
    tools: ['Milestones Evaluator', 'Classroom Syllabus Matrix', 'Progress Card Generator'],
    lastActivity: 'Yesterday (Audited Term 1 Preschool STEM coverage)',
    executionCount: 520,
    enabled: true,
    triggerEvent: 'Weekly curriculum audit cycle'
  },
  {
    id: 'agt-11',
    number: 11,
    name: 'Staff Operations Agent',
    code: 'STAFF_OPS_AI',
    category: 'Operations',
    purpose: 'Maintains required teacher-to-child care ratios, tracks leave requests, and automates shift coverage alerts.',
    status: 'Active',
    capabilities: ['Live child-to-teacher ratio auditing', 'Relief teacher dispatch notifications', 'Certification expiration warnings'],
    tools: ['Staff Roster Engine', 'Classroom Ratio Monitor', 'HR Calendar'],
    lastActivity: '08:00 AM (Verified optimal 1:3 ratio in Infant room)',
    executionCount: 1150,
    enabled: true,
    triggerEvent: 'Staff clock-in / Child headcount shift'
  },
  {
    id: 'agt-12',
    number: 12,
    name: 'Marketing Agent',
    code: 'MARKETING_AI',
    category: 'Admissions & CRM',
    purpose: 'Generates engaging social media highlights, newsletter snippets, and seasonal enrollment campaign copy.',
    status: 'Standby',
    capabilities: ['Child privacy compliant post drafting', 'Newsletter highlight compilation', 'Open-day campaign generator'],
    tools: ['Content Drafter', 'Brand Voice Guide', 'Newsletter Publisher'],
    lastActivity: '2 days ago (Drafted August Newsletter teaser)',
    executionCount: 310,
    enabled: true,
    triggerEvent: 'Marketing campaign trigger'
  },
  {
    id: 'agt-13',
    number: 13,
    name: 'Compliance Agent',
    code: 'COMPLIANCE_AI',
    category: 'Operations',
    purpose: 'Audits health, hygiene, food-safety certifications, immunization records, and FCT Abuja creche regulatory checklists.',
    status: 'Active',
    capabilities: ['Immunization card audit', 'Sanitation schedule checklist tracker', 'Staff First-Aid renewal alerts'],
    tools: ['Audit Engine', 'Regulatory Standards Matrix', 'Facility Checklist'],
    lastActivity: 'Yesterday (Checked 100% Infant immunization logs)',
    executionCount: 430,
    enabled: true,
    triggerEvent: 'Monthly regulatory audit'
  },
  {
    id: 'agt-14',
    number: 14,
    name: 'Director Intelligence',
    code: 'DIRECTOR_INTEL_AI',
    category: 'Executive Intelligence',
    purpose: 'Executive conversational copilot providing real-time answers on revenue, admissions velocity, staffing, and risk points.',
    status: 'Active',
    capabilities: ['Multi-table operational data synthesis', 'Predictive admissions forecasting', 'Executive briefing summaries'],
    tools: ['Executive Analytics Core', 'Full-Database NLP Engine', 'Strategic Forecast Generator'],
    lastActivity: 'Just now (Ready for executive Q&A queries)',
    executionCount: 1780,
    enabled: true,
    triggerEvent: 'Director query input'
  },
  {
    id: 'agt-15',
    number: 15,
    name: 'Finance Intelligence',
    code: 'FINANCE_INTEL_AI',
    category: 'Executive Intelligence',
    purpose: 'Analyzes term-on-term tuition revenue trends, scholarship allocations, overdue account recovery, and expense margins.',
    status: 'Active',
    capabilities: ['Fee collection velocity projection', 'Expense margin analysis', 'Cash flow liquidity forecasts'],
    tools: ['Financial Analytics Engine', 'Aging Ledger Analyzer', 'Budget Projections Model'],
    lastActivity: '3 hrs ago (Generated August Cashflow Projection)',
    executionCount: 890,
    enabled: true,
    triggerEvent: 'Financial dashboard review'
  }
];

export const DEMO_COMMUNICATIONS: CommunicationMessage[] = [
  {
    id: 'msg-01',
    type: 'Announcement',
    sender: 'Mrs. Judith Ogbonna (Director)',
    senderRole: 'School Director',
    recipient: 'All Parents (La Bebe Community)',
    recipientGroup: 'Whole School',
    subject: 'Term 1 Resumption, Safety Upgrades & Term Calendar Highlights',
    content: 'Dear La Bebe Families, we are delighted to welcome all our wonderful children back for an enriching term! Please note that morning drop-off commences at 07:00 AM with biometric and photo ID check-in.',
    timestamp: '2026-08-18 08:30 AM',
    channel: 'In-App',
    read: true,
    status: 'Delivered'
  },
  {
    id: 'msg-02',
    type: 'Parent Message',
    sender: 'Mrs. Folake Adeleke (Teacher)',
    senderRole: 'Lead Educator',
    recipient: 'Engr. Babatunde Adeleke',
    subject: 'David had a marvelous painting session today!',
    content: 'Good afternoon Engr. Adeleke, David showed exceptional focus during our primary color blending activity today. His daily report is approved and ready in your portal.',
    timestamp: '2026-08-19 02:45 PM',
    channel: 'In-App',
    read: true,
    status: 'Delivered'
  },
  {
    id: 'msg-03',
    type: 'Notification',
    sender: 'AI Attendance Agent',
    senderRole: 'System Agent',
    recipient: 'Mr. Umar Danladi',
    subject: 'Absence Acknowledged — Khadijah Danladi',
    content: 'We have logged Khadijah as resting at home today due to mild cold symptoms. Wishing her a swift recovery! Her class teacher has been notified.',
    timestamp: '2026-08-19 07:30 AM',
    channel: 'In-App',
    read: true,
    status: 'Delivered'
  },
  {
    id: 'msg-04',
    type: 'Broadcast',
    sender: 'Kelechi Okafor (Finance)',
    senderRole: 'Bursar',
    recipient: 'Parents with Outstanding Balances',
    subject: 'Term 1 Fee Reconciliation Notice',
    content: 'Dear Parents, please be reminded that the grace period for Term 1 tuition balance completion concludes on August 25th. We appreciate your partnership.',
    timestamp: '2026-08-17 10:00 AM',
    channel: 'Email',
    read: false,
    status: 'Delivered'
  }
];

export const DEMO_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-01',
    action: 'Approved Daily Report',
    module: 'Daily Reports',
    performedBy: 'Mrs. Folake Adeleke',
    role: 'Lead Educator',
    timestamp: '2026-08-19 03:30:15',
    ipAddress: '102.89.23.14 (Abuja, NG)',
    details: 'Approved and published AI-assisted daily report for David Adeleke (Reg: LBC/2026/001)'
  },
  {
    id: 'aud-02',
    action: 'Recorded Tuition Payment',
    module: 'Finance',
    performedBy: 'Kelechi Okafor',
    role: 'Finance Officer',
    timestamp: '2026-08-19 01:15:44',
    ipAddress: '102.89.23.14 (Abuja, NG)',
    details: 'Logged POS receipt ₦320,000 from Hajia Fatima Ibrahim for invoice INV-2026-002'
  },
  {
    id: 'aud-03',
    action: 'Added Safeguarding Incident Note',
    module: 'Incidents & Safety',
    performedBy: 'Mrs. Judith Ogbonna',
    role: 'Director',
    timestamp: '2026-08-19 09:20:00',
    ipAddress: '102.89.23.14 (Abuja, NG)',
    details: 'Reviewed and closed incident INC-2026-014 following parent verification'
  },
  {
    id: 'aud-04',
    action: 'Scheduled Campus Tour',
    module: 'Admissions CRM',
    performedBy: 'Mrs. Amina Yusuf',
    role: 'Admissions Lead',
    timestamp: '2026-08-18 11:00:22',
    ipAddress: '102.89.23.14 (Abuja, NG)',
    details: 'Booked physical campus tour for lead Mr. Chidi Nwankwo for 2026-08-21 10:30 AM'
  },
  {
    id: 'aud-05',
    action: 'Clocked In Staff Member',
    module: 'Staff Operations',
    performedBy: 'Security Bitrus (Gate Biometrics)',
    role: 'Security',
    timestamp: '2026-08-19 06:55:10',
    ipAddress: '192.168.1.50 (Abuja Gate Terminal)',
    details: 'Verified morning biometric arrival for Mrs. Grace Okoro (Nurse)'
  }
];

export const DEMO_AI_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    priority: 'High',
    title: 'Follow up with overdue accounts',
    description: '3 parent accounts currently have overdue balances totaling ₦555,000 from Term 1 billing.',
    actionLabel: 'Review Overdue Invoices',
    targetTab: 'finance'
  },
  {
    id: 'rec-2',
    priority: 'Medium',
    title: 'Confirm today’s scheduled tours',
    description: '1 physical tour scheduled for Mr. Chidi Nwankwo (2 yrs Toddler enquiry). Send reminder confirmation.',
    actionLabel: 'View Admissions CRM',
    targetTab: 'admissions'
  },
  {
    id: 'rec-3',
    priority: 'Medium',
    title: 'Review unresolved parent enquiries',
    description: 'Dr. Aisha Mohammed submitted an Infant Care enquiry yesterday regarding sterilisation routines.',
    actionLabel: 'Open Enquiries',
    targetTab: 'admissions'
  },
  {
    id: 'rec-4',
    priority: 'Low',
    title: 'Review staffing coverage',
    description: 'Optimal ratio verified (Infants 1:3, Toddlers 1:4). All 8 rostered educators and nurses present today.',
    actionLabel: 'View Staff Roster',
    targetTab: 'staff'
  },
  {
    id: 'rec-5',
    priority: 'Medium',
    title: 'Follow up with pending admissions',
    description: 'Barr. & Mrs. Oladimeji Peters application approved. Follow up on fee deposit transfer.',
    actionLabel: 'Check Admissions Leads',
    targetTab: 'admissions'
  }
];
