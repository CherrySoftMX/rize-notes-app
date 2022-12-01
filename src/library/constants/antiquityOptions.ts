export interface AntiquityOption {
  label: string;
  days: number;
}

export const ALL_TIME: AntiquityOption = {
  label: 'All time',
  days: Number.MAX_VALUE,
};

export const LAST_WEEK: AntiquityOption = {
  label: 'Last week',
  days: 7,
};

export const LAST_MONTH: AntiquityOption = {
  label: 'Last month',
  days: 30,
};

export const LAST_SIX_MONTHS: AntiquityOption = {
  label: 'Last 6 months',
  days: 180,
};

export const LAST_YEAR: AntiquityOption = {
  label: 'Last year',
  days: 365,
};

export const antiquityOptions: AntiquityOption[] = [
  ALL_TIME,
  LAST_WEEK,
  LAST_MONTH,
  LAST_SIX_MONTHS,
  LAST_YEAR,
];
