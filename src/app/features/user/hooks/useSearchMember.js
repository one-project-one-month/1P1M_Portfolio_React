export const useSearchMember = (devs = [], search) => {
  if (search) {
    const filteredDevs = devs.filter((d) => d.name.includes(search));
    return filteredDevs;
  } else [];
};
