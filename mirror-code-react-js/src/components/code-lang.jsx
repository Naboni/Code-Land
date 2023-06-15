import { forwardRef } from "react";
import { Group, Text, Select } from "@mantine/core";
const data = [
  {
    // image: "/assets/svg/python.svg",
    label: "Python",
    value: "py",
  },
  {
    // image: "/assets/svg/python.svg",
    label: "Javascript",
    value: "js",
  },
  {
    // image: "/assets/svg/python.svg",
    label: "Cpp",
    value: "cpp",
  },
];

const SelectItem = forwardRef(({ image, label, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      {/* <img src={image} height="25px" width="25px" alt="logo" /> */}
      <Text size="sm">{label}</Text>
    </Group>
  </div>
));
export default function CodeLang({optionRef}) {
  return <Select ref={optionRef} itemComponent={SelectItem} data={data} defaultValue={"py"} />;
}
