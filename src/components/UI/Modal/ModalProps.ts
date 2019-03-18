import { Props } from '../../../types/Props';

export interface ModalProps extends Props {
  show: boolean;
  backdropClicked: (event: any) => void;
}
