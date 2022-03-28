export interface SubmissionDetailsPaperProps {
  index: number;
  submissionDetailsLength: number;
  createSubmissionDetails: () => any;
  removeSubmissionDetails: any;
  handleChangeSubmissionDetails: ({
    index,
    type,
    eventName,
    imagePath,
  }: handleChangeSubmissionDetailsProps) => any;
}

export interface handleChangeSubmissionDetailsProps {
  index: number;
  type: "eventName" | "imagePath";
  eventName?: string;
  imagePath?: string;
  imageId?: string;
}

export interface submitFormProps {
  submitObject: {
    fullName: string;
    eventId: string;
    submissionDetails: {
      eventName: string;
      imagePath: string;
      imageId: string;
    }[];
  };
}
