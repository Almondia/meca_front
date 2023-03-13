import snakeToCamel from '@/utils/snakeToCamel';

describe('snakeToCamel', () => {
  test('snake_case 객체는 camelCase 객체로 변환되어야 한다.', () => {
    const snakeCaseData = {
      first_name: 'John',
      last_name: 'Doe',
      age: 28,
    };
    const expected = {
      firstName: 'John',
      lastName: 'Doe',
      age: 28,
    };
    expect(snakeToCamel(snakeCaseData)).toEqual(expected);
  });

  test('nested snake_case 객체는 camelCase 객체로 모두 변환되어야 한다.', () => {
    const snakeCaseData = {
      user_info: {
        first_name: 'John',
        last_name: 'Doe',
        age: 28,
      },
      hello_world: {
        hell: 'hello_world',
      },
    };
    const expected = {
      userInfo: {
        firstName: 'John',
        lastName: 'Doe',
        age: 28,
      },
      helloWorld: {
        hell: 'hello_world',
      },
    };
    expect(snakeToCamel(snakeCaseData)).toEqual(expected);
  });

  test('배열이 포함된 nested snake_case 객체는 camelCase 객체로 모두 변환되어야 한다.', () => {
    const snakeCaseData = {
      data: [
        {
          user_info: {
            user_name: 'user_name',
            skill_list: ['sk_1', 'sk_2', 'sK3'],
          },
        },
        {
          user_info: {
            user_name: 'user_name_2',
            skill_list: ['sk_1', 'sk_2', 'sK3'],
            hell_world: [{ hell_world: 1234 }, { abc_hello: '1234' }],
          },
        },
      ],
    };
    const expected = {
      data: [
        {
          userInfo: {
            userName: 'user_name',
            skillList: ['sk_1', 'sk_2', 'sK3'],
          },
        },
        {
          userInfo: {
            userName: 'user_name_2',
            skillList: ['sk_1', 'sk_2', 'sK3'],
            hellWorld: [{ hellWorld: 1234 }, { abcHello: '1234' }],
          },
        },
      ],
    };
    expect(snakeToCamel(snakeCaseData)).toEqual(expected);
  });
});
