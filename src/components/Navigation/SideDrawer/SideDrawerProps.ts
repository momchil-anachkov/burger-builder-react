import { Props } from '../../../types/Props';

export interface SideDrawerProps extends Props {
  open: boolean;
  backdropClicked: (event: any) => void;
}
