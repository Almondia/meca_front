import { memo, useMemo, useRef, useState } from 'react';

import InputGroup from '@/components/@common/molecules/InputGroup';
import QuillWriter from '@/components/@common/organisms/Editor/QuillWriter';
import useClickAway from '@/hooks/useClickAway';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';

import { MecaWriteFormQuestionProps } from '../type';

export const SelectQuestion = memo(({ value, setValue, selectionNum = 3 }: MecaWriteFormQuestionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>
      <InputGroup.Label>객관식 문제 제목을 작성하세요</InputGroup.Label>
      <div ref={ref}>
        <QuillWriter
          minHeight="150px"
          maxHeight="780px"
          contents={sampleValues[0]}
          setContents={setQuestion}
          placeholder="객관식 문제를 설명하세요"
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
          </InputGroup>
        ))}
      </div>
    </>
  );
});
