export const enum transactionType {
  Credit = 1,
  Debit = -1,
}

export type userDetailsKeys = "salary" | "workingDays" | "workingHours";

export type userDetails = {
  [key in userDetailsKeys]: number | null;
};

export type inputFieldMeta = {
  id: "title" | "description" | "duration";
  label: string;
  inputType: "text" | "number";
  placeholder: string;
  step?: string;
};

export type cardType = "task" | "shop" | "reward";

export type timerCard = {
  cardType: cardType;
  title: string;
  description: string;
  duration: string;
  id: string;
};

export type timerCardList = {
  [key: string]: timerCard;
};
