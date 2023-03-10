import React from 'react';

export const QuizContext = React.createContext<{
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setMail: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  trackScore: boolean;
  setTracker: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  score: 0,
  setScore: () => {},
  name: '',
  setName: () => {},
  email: '',
  setMail: () => {},
  phone: '',
  setPhone: () => {},
  selectedValue: '',
  setSelected: () => {},
  trackScore: false,
  setTracker: () => {},
});
