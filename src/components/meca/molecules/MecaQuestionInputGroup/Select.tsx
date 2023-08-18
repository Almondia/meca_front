/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useMemo, useRef, useState } from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import { QuestionInputGroupProps } from '@/components/meca/molecules/MecaQuestionInputGroup/types';
import {
  useMecaQuestionContext,
  useMecaSelectTypeCaseNumberContext,
} from '@/components/meca/molecules/MecaWriteContextProvider';
import useClickAway from '@/hooks/useClickAway';
import { InputValidations } from '@/utils/constants';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';

export const Select = memo(({ QuestionEditor }: QuestionInputGroupProps) => {
  const { input: value, setInput: setValue, isValid, message } = useMecaQuestionContext();
  const { number: selectionNum } = useMecaSelectTypeCaseNumberContext();
  const ref = useRef<HTMLDivElement>(null);
  const existed = useMemo(() => (value ? stringToJsonStringArrayConverter(value) : []), []);
  const [sampleValues, setSampleValues] = useState<string[]>(existed.concat(new Array(6 - existed.length).fill('')));
  const parsedSampleValue = JSON.stringify(sampleValues.slice(0, selectionNum + 1));

  useClickAway(
    ref,
    () => {
      setValue(parsedSampleValue);
    },
    parsedSampleValue !== value,
  );

  const changeQuestionCase = (inputValue: string, index: number) => {
    const newSampleValues = sampleValues.map((v, i) => (i === index ? inputValue : v));
    setSampleValues(newSampleValues);
    return newSampleValues;
  };
  const setQuestion = (action: React.SetStateAction<string>): void => {
    typeof action === 'string' && setSampleValues((prev) => [action, ...prev.slice(1)]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    changeQuestionCase(e.target.value, index);
  };

  return (
    <InputGroup>
      <InputGroup.Label>객관식 문제 제목을 작성하세요</InputGroup.Label>
      <div ref={ref}>
        <QuestionEditor
          contents={sampleValues[0]}
          setContents={setQuestion}
          placeholder={`객관식의 각 문항은 ${InputValidations.MAX_MULTICHOICE_QUESTION}자 이내로 작성하세요`}
        />
        {[...Array(selectionNum)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <InputGroup key={i}>
            <InputGroup.Label>보기 ({i + 1})</InputGroup.Label>
            <InputGroup.Input.Text
              name={`meca-case-${i + 1}`}
              value={sampleValues[i + 1]}
              onChange={(e) => handleChange(e, i + 1)}
              placeholder=""
              ariaLabel={`input-meca-case-${i + 1}`}
            />
            {!isValid && i === selectionNum - 1 && (
              <InputGroup.Validation visible={!isValid}>{message}</InputGroup.Validation>
            )}
          </InputGroup>
        ))}
      </div>
    </InputGroup>
  );
});
