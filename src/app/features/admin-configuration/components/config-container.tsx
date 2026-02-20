import useConfig from '../hooks/use-config';
import ConfigFilter from './config-filter';
import ConfigurationList from './config-list';

const ConfigurationContainer = () => {
  const {
    configData,
    isLoading,
    handleSearch,
    createConfigOption,
    updateConfigOption,
    deleteConfigOption,
  } = useConfig();

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-white mb-2">
        Configurations
      </h1>
      <p className="text-[#99A1AF]">
        Edit and manage the dropdown list of the OPOM system.
      </p>
      <ConfigFilter searching={isLoading} onSearch={handleSearch} />
      {(configData && configData.length) > 0 ? (
        <ConfigurationList
          configData={configData}
          createOption={createConfigOption}
          updateOption={updateConfigOption}
          deleteOption={deleteConfigOption}
        />
      ) : (
        <div className="col-span-full text-center py-50">
          <p className="text-white/50 text-lg">
            {isLoading ? 'Loading...' : 'No Configuration found'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConfigurationContainer;
