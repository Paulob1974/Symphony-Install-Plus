export type PhotoItem = {
  id: string;
  uri: string;
  base64?: string | null;
};

export type SignatureData = {
  paths: string[];
  width: number;
  height: number;
};

export type CompletionStatus =
  | 'Installation Completed'
  | 'Completed with Issues'
  | 'Unable to Complete';

export type IssuePriority = 'Low' | 'Medium' | 'High';

export type ReportIssue = {
  id: string;
  type: string;
  priority: IssuePriority;
  description: string;
  actionTaken: string;
  outstanding: boolean;
  photos: PhotoItem[];
};

export type InstallationReport = {
  id: string;
  reportNumber: string;
  jobNumber: string;
  storeName: string;
  siteAddress: string;
  contactName: string;
  installationDate: string;

  fitterName: string;
  fitterSignature?: SignatureData;
  fitterComments: string;

  beforePhotos: PhotoItem[];
  duringPhotos: PhotoItem[];
  completedPhotos: PhotoItem[];

  issues: ReportIssue[];
  completionStatus: CompletionStatus;

  customerName: string;
  customerSignature?: SignatureData;
  customerComments: string;

  createdAt: string;
  updatedAt: string;
};

export const createBlankReport = (): InstallationReport => {
  const now = new Date().toISOString();
  const stamp = Date.now().toString().slice(-8);

  return {
    id: Date.now().toString(),
    reportNumber: `SI-${stamp}`,
    jobNumber: '',
    storeName: '',
    siteAddress: '',
    contactName: '',
    installationDate: new Date().toLocaleDateString('en-GB'),
    fitterName: '',
    fitterComments: '',
    beforePhotos: [],
    duringPhotos: [],
    completedPhotos: [],
    issues: [],
    completionStatus: 'Installation Completed',
    customerName: '',
    customerComments: '',
    createdAt: now,
    updatedAt: now,
  };
};
