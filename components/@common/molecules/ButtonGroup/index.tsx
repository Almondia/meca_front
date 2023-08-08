import { useRouter } from 'next/router';

import { useCallback } from 'react';

import Button from '@/components/@common/atoms/Button';

import { ButtonGroupWrapper } from './styled';

interface ButtonGroupProps {
  successText: string;
  cancelText?: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

const ButtonGroup = ({ successText, cancelText = '취소하기', onSuccess, onCancel }: ButtonGroupProps) => {
  const router = useRouter();
  const handleCancelClick = useCallback(() => {
    onCancel ? onCancel() : router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ButtonGroupWrapper>
      <Button width="160px" size="small" onClick={onSuccess} colorTheme="primary">
        {successText}
      </Button>
      <Button width="160px" size="small" onClick={handleCancelClick} colorTheme="cancel">
        {cancelText}
      </Button>
    </ButtonGroupWrapper>
  );
};

export default ButtonGroup;
