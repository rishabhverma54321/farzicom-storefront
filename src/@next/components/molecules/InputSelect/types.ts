// import { ISelect } from "@components/atoms/Ise";
import { ISelect } from "@components/atoms/Select";
import { IFormError } from "@types";

export interface IProps extends ISelect {
  label: string;
  inputProps?: object;
  errors?: IFormError[];
}
