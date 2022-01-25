import react, {useRef} from 'react';

let uniqueId = 0;
const getUniqueId = () => uniqueId++;

function useIdShim() {
  const idRef = useRef(getUniqueId());
  return idRef.current;
}

export default react.useId ?? useIdShim;
