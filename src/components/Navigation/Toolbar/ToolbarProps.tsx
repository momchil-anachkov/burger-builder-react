import { Props } from '../../../types/Props';

export interface ToolbarProps extends Props {
  isAuthenticated: boolean;
  drawerToggleClicked: (event: any) => void;
}
