import React, {createContext, useState, useContext} from 'react';

const ScannedDataContext = createContext();

export const ScannedDataProvider = ({children}) => {
  const [scannedHistory, setScannedHistory] = useState([]);

  const addScannedData = data => {
    setScannedHistory(prev => [data, ...prev]);
  };

  return (
    <ScannedDataContext.Provider value={{scannedHistory, addScannedData}}>
      {children}
    </ScannedDataContext.Provider>
  );
};

export const useScannedData = () => useContext(ScannedDataContext);
