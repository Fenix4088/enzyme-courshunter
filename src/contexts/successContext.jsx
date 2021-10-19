import React from 'react';

const successContext = React.createContext();


/**
 * @function useSuccess
 * @returns {array}
 */
export const useSuccess = () => {
  const context = React.useContext(successContext);

  if(!context) {
    throw new Error('useSuccess must be used within a  SuccessProvider');
  }

  return context;
}

/**
 *
 * @function SuccessProvider
 * @param {object} props
 * @returns {JSX.Element} Provider
 */
export const SuccessProvider = (props) => {
    const [success, setSuccess] = React.useState(false);

    const value = React.useMemo(() => [success, setSuccess], [success]);

    return (
        <successContext.Provider value={value} {...props}/>
    )
}