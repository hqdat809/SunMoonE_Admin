import { CheckboxProps, Checkbox as MuiCheckbox } from "@mui/material";
import "./Checkbox.scss";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ICheckboxProps extends CheckboxProps { }

const Checkbox = ({ ...props }: ICheckboxProps) => {
  return <MuiCheckbox {...props} className={`${props.className} Checkbox`} />;
};

export default Checkbox;
