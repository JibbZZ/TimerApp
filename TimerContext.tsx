import React, { createContext, useState, useEffect, useContext } from 'react';

interface TimerContextProps {
  sekunder: number;
  setSekunder: React.Dispatch<React.SetStateAction<number>>;
  aktiverad: boolean;
  setAktiverad: React.Dispatch<React.SetStateAction<boolean>>;
  startTimer: () => void;
  stoppTimer: () => void;
  återställTimer: (hours: number, minutes: number, seconds: number) => void;
}

export const TimerContext = createContext<TimerContextProps | undefined>(undefined);

interface TimerProviderProps {
    children: React.ReactNode;
  }

  export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {

  const [sekunder, setSekunder] = useState<number>(0);
  const [aktiverad, setAktiverad] = useState<boolean>(false);

  useEffect(() => {
    let intervall: ReturnType<typeof setInterval> | null = null;

    if (sekunder <= 0 && aktiverad) {
      setAktiverad(false);
      
    } else if (aktiverad) {
      intervall = setInterval(() => {
        setSekunder((prevSekunder) => prevSekunder - 1);
      }, 1000);
    }

    return () => {
      if (intervall) {
        clearInterval(intervall);
      }
    };
  }, [aktiverad, sekunder]);

  const startTimer = () => {
    setAktiverad(true);
  };

  const stoppTimer = () => {
    setAktiverad(false);
  };

  const återställTimer = (hours: number, minutes: number, seconds: number) => {
    setAktiverad(false);
    setSekunder(hours * 3600 + minutes * 60 + seconds);
  };

  return (
    
    <TimerContext.Provider value={{ sekunder, setSekunder, aktiverad, setAktiverad, startTimer, stoppTimer, återställTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

// Skapa en anpassad hook för att använda TimerContext på ett enklare sätt
export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer måste användas inom en TimerProvider');
  }
  return context;
};
