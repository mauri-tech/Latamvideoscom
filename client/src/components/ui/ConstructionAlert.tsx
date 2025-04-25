import React from 'react';
import { ConstructionBanner } from './ConstructionBanner';
import { ConstructionModal } from './modal/ConstructionModal';

// URL del formulario de Google Forms
const CONSTRUCTION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf_A9wsGu--SzvCw6TsHpAk5hSPXqP6jna1W5f2GnQDu4Tn2w/viewform?embedded=true";

export const ConstructionAlert: React.FC = () => {
  return (
    <>
      {/* Barra de progreso de construcción */}
      <ConstructionBanner progress={63} />
      
      {/* Modal de construcción */}
      <ConstructionModal formUrl={CONSTRUCTION_FORM_URL} />
    </>
  );
};

export default ConstructionAlert;