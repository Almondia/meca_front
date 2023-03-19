import React, { useState } from 'react';

import InputGroup from '@/components/molcules/InputGroup';
import { stringToJsonStringArrayConverter } from '@/utils/jsonHandler';

import { MecaWriteFormInputProps } from '../type';

const SelectQuestion = ({ value, onChange, selectionNum = 3 }: MecaWriteFormInputProps) => {
  const existed = value ? stringToJsonStringArrayConverter(value) : [];
  const [sampleValues, setSampleValues] = useState(existed.concat(new Array(6 - existed.length).fill('')));

  const changeQuestionCase = (inputValue: string, index: number) => {
    const newSampleValues = sampleValues.map((v, i) => (i === index ? inputValue : v));
    setSampleValues(newSampleValues);
    return newSampleValues;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const changedValues = changeQuestionCase(e.target.value, index);
    e.target.value = JSON.stringify(changedValues);
    onChange(e);
  };

  return (
    <div>
      <InputGroup>
        <InputGroup.Label>객관식 문제 제목을 작성하세요</InputGroup.Label>
        <InputGroup.Input.TextArea
          name="meca-question"
          value={sampleValues[0]}
          onChange={(e) => handleChange(e, 0)}
          placeholder="객관식 문제 제목을 설명하세요"
          ariaLabel="input-meca-select-question"
        />
      </InputGroup>
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
  );
};

export default SelectQuestion;
