export type ElementSizeType = `${number}px` | `${number}rem` | `${number}%`;

export interface DefaultModalOptions {
  /** [필수] 모달이 보여지는지 여부입니다. */
  visible: boolean;
  /** [필수] 모달을 닫는 함수입니다. */
  onClose: () => void;
}
