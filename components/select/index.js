import { useState } from 'react';

import TokenModal from 'components/modal/token';
import NetworkModal from 'components/modal/network';

function Select({ data }) {
  const [selectedNetworkIndex, setSelectedNetworkIndex] = useState(0);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);

  return (
    <>
      <TokenModal
        data={data[selectedNetworkIndex].tokens}
        selectedIndex={selectedTokenIndex}
        setSelectedIndex={setSelectedTokenIndex}
      />
      <NetworkModal
        data={data}
        selectedIndex={selectedNetworkIndex}
        setSelectedIndex={setSelectedNetworkIndex}
      />
    </>
  );
}

export default Select;
