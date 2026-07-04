import React from 'react';
import PropTypes from 'prop-types';
import TemasSection from './CartelaSections/TemasSection';
import CoresSection from './CartelaSections/CoresSection';
import TipografiaSection from './CartelaSections/TipografiaSection';
import MolduraSection from './CartelaSections/MolduraSection';

function CartelaTab({ config, updateConfig }) {
  return (
    <div className="space-y-4 flex flex-col">
      <TemasSection updateConfig={updateConfig} />
      <CoresSection config={config} updateConfig={updateConfig} />
      <TipografiaSection config={config} updateConfig={updateConfig} />
      <MolduraSection config={config} updateConfig={updateConfig} />
    </div>
  );
}

CartelaTab.propTypes = {
  config: PropTypes.object.isRequired,
  updateConfig: PropTypes.func.isRequired,
};

export default CartelaTab;
