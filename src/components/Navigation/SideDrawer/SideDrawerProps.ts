import { Props } from '../../../types/Props';

export interface SideDrawerProps extends Props {
  isAuthenticated: boolean;
  open: boolean;
  backdropClicked: (event: any) => void;
}
