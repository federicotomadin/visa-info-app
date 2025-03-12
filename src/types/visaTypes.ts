export type VisaCategory =
    | 'Work'
    | 'Study'
    | 'Tourism/Business'
    | 'Investment'
    | 'Special';

export interface VisaRequirement {
    title: string;
    description: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface VisaInfo {
    id: string;
    name: string;
    code: string;
    category: VisaCategory;
    summary: string;
    description: string;
    eligibility: string[];
    duration: string;
    canExtend: boolean;
    extendInfo?: string;
    requirements: VisaRequirement[];
    processingTime: string;
    applicationFee: string;
    officialLink: string;
    tags: string[];
    faqs: FAQ[];
}

// export type VisaInfo = {
//     id: string;
//     name: string;
//     description: string;
//     category: VisaCategory;
//     duration: string;
//     canExtend: boolean;
//     tags: string[];
// };
