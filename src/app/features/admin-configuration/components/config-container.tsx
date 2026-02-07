import ConfigurationTable from './config-table';

const ConfigurationContainer = () => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-white mb-2">
        Configurations
      </h1>
      <p className="text-[#99A1AF]">
        Edit and manage the dropdown list of the OPOM system.
      </p>
      <ConfigurationTable />
    </div>
  );
};

export default ConfigurationContainer;
