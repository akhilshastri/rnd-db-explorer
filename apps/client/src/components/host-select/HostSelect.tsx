import {
  Autocomplete,
  Box,
  Button,
  ComboboxItem,
  OptionsFilter,
} from "@mantine/core";

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const splittedSearch = search.toLowerCase().trim().split(" ");
  return (options as ComboboxItem[]).filter((option) => {
    const words = option.label.toLowerCase().trim().split(" ");
    return splittedSearch.every((searchWord) =>
      words.some((word) => word.includes(searchWord)),
    );
  });
};

export const HostSelect = () => {
  return (
    <Box style={{ display: "flex" }}>
      <Autocomplete
        maxDropdownHeight={200}
        placeholder="HOST name"
        data={["React", "Angular", "Express", "Django"]}
        filter={optionsFilter}
      />
      <Button size="compact-md"> Connect</Button>
    </Box>
  );
};
