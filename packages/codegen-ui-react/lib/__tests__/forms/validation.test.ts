/*
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */
import { FieldValidationConfiguration, ValidationTypes } from '@aws-amplify/codegen-ui/lib/types/form/form-validation';
import { validateField } from '../../utils/forms/validation';

describe('validateField tests', () => {
  it('should validate REQUIRED type', () => {
    expect(validateField('123', [{ type: ValidationTypes.REQUIRED, validationMessage: '' }])).toEqual({
      hasError: false,
    });
    expect(validateField('', [{ type: ValidationTypes.REQUIRED, validationMessage: '' }])).toEqual({
      hasError: true,
      errorMessage: 'The value is required',
    });
    expect(validateField(0, [{ type: ValidationTypes.REQUIRED, validationMessage: 'test' }])).toEqual({
      hasError: false,
    });
  });
  it('should validate START_WITH type', () => {
    expect(
      validateField('abc', [{ type: ValidationTypes.START_WITH, strValues: [], validationMessage: 'test' }]),
    ).toEqual({ hasError: false });
    expect(
      validateField('abc', [{ type: ValidationTypes.START_WITH, strValues: ['4'], validationMessage: '' }]),
    ).toEqual({
      hasError: true,
      errorMessage: 'The value must start with 4',
    });
    expect(
      validateField('aardvark', [{ type: ValidationTypes.START_WITH, strValues: ['a', 'b'], validationMessage: '' }]),
    ).toEqual({ hasError: false });
  });
  it('should validate END_WITH type', () => {
    expect(
      validateField('abc', [{ type: ValidationTypes.END_WITH, strValues: ['c'], validationMessage: 'test' }]),
    ).toEqual({
      hasError: false,
    });
    expect(
      validateField('abc', [{ type: ValidationTypes.END_WITH, strValues: ['e', 'f'], validationMessage: '' }]),
    ).toEqual({ hasError: true, errorMessage: 'The value must end with e, f' });
    expect(validateField('', [{ type: ValidationTypes.END_WITH, strValues: [], validationMessage: 'test' }])).toEqual({
      hasError: false,
    });
  });
  it('should validate CONTAINS type', () => {
    expect(validateField('abc', [{ type: ValidationTypes.CONTAINS, strValues: ['a'], validationMessage: '' }])).toEqual(
      {
        hasError: false,
      },
    );
    expect(
      validateField('abcd', [{ type: ValidationTypes.CONTAINS, strValues: ['a', 'e'], validationMessage: '' }]),
    ).toEqual({ hasError: false });
    expect(
      validateField('abc', [{ type: ValidationTypes.CONTAINS, strValues: ['d'], validationMessage: 'test' }]),
    ).toEqual({ hasError: true, errorMessage: 'test' });
  });
  it('should validate NOT_CONTAINS type', () => {
    expect(
      validateField('abc', [{ type: ValidationTypes.NOT_CONTAINS, strValues: ['4'], validationMessage: '' }]),
    ).toEqual({ hasError: false });
    expect(
      validateField('abc', [{ type: ValidationTypes.NOT_CONTAINS, strValues: ['d', 'a'], validationMessage: '' }]),
    ).toEqual({ hasError: true, errorMessage: 'The value must not contain d, a' });
    expect(
      validateField('', [{ type: ValidationTypes.NOT_CONTAINS, strValues: [], validationMessage: 'test' }]),
    ).toEqual({
      hasError: false,
    });
  });
  it('should validate LESS_THAN_CHAR_LENGTH type', () => {
    expect(
      validateField('123', [{ type: ValidationTypes.LESS_THAN_CHAR_LENGTH, numValues: [3], validationMessage: '' }]),
    ).toEqual({ hasError: false });
    expect(
      validateField('', [{ type: ValidationTypes.LESS_THAN_CHAR_LENGTH, numValues: [3], validationMessage: '' }]),
    ).toEqual({ hasError: false });
    expect(
      validateField('23445', [{ type: ValidationTypes.LESS_THAN_CHAR_LENGTH, numValues: [3], validationMessage: '' }]),
    ).toEqual({ hasError: true, errorMessage: 'The value must be 3 characters or fewer' });
  });
  it('should validate GREATER_THAN_CHAR_LENGTH type', () => {
    expect(
      validateField('123', [{ type: ValidationTypes.GREATER_THAN_CHAR_LENGTH, numValues: [0], validationMessage: '' }]),
    ).toEqual({ hasError: false });
    expect(
      validateField('', [{ type: ValidationTypes.GREATER_THAN_CHAR_LENGTH, numValues: [3], validationMessage: '' }]),
    ).toEqual({ hasError: false });
    expect(
      validateField('df', [
        { type: ValidationTypes.GREATER_THAN_CHAR_LENGTH, numValues: [3], validationMessage: 'test' },
      ]),
    ).toEqual({ hasError: true, errorMessage: 'test' });
  });
  it('should validate LESS_THAN_NUM type', () => {
    expect(validateField(1, [{ type: ValidationTypes.LESS_THAN_NUM, numValues: [10], validationMessage: '' }])).toEqual(
      {
        hasError: false,
      },
    );
    expect(validateField(2, [{ type: ValidationTypes.LESS_THAN_NUM, numValues: [1], validationMessage: '' }])).toEqual({
      hasError: true,
      errorMessage: 'The value must be less than 1',
    });
    expect(
      validateField(0, [{ type: ValidationTypes.LESS_THAN_NUM, numValues: [0], validationMessage: 'test' }]),
    ).toEqual({
      hasError: true,
      errorMessage: 'test',
    });
  });
  it('should validate GREATER_THAN_NUM type', () => {
    expect(
      validateField(1, [{ type: ValidationTypes.GREATER_THAN_NUM, numValues: [0], validationMessage: '' }]),
    ).toEqual({
      hasError: false,
    });
    expect(
      validateField(2, [{ type: ValidationTypes.GREATER_THAN_NUM, numValues: [3], validationMessage: '' }]),
    ).toEqual({
      hasError: true,
      errorMessage: 'The value must be greater than 3',
    });
    expect(
      validateField(3, [{ type: ValidationTypes.GREATER_THAN_NUM, numValues: [3], validationMessage: 'test' }]),
    ).toEqual({ hasError: true, errorMessage: 'test' });
  });
  it('should validate EQUAL_TO_NUM type', () => {
    expect(
      validateField(1, [{ type: ValidationTypes.EQUAL_TO_NUM, numValues: [1, 2], validationMessage: '' }]),
    ).toEqual({
      hasError: false,
    });
    expect(validateField(2, [{ type: ValidationTypes.EQUAL_TO_NUM, numValues: [3], validationMessage: '' }])).toEqual({
      hasError: true,
      errorMessage: 'The value must be equal to 3',
    });
    expect(
      validateField(3, [{ type: ValidationTypes.EQUAL_TO_NUM, numValues: [4, 5, 6], validationMessage: 'test' }]),
    ).toEqual({ hasError: true, errorMessage: 'test' });
  });
  it('should validate BE_AFTER type', () => {
    const startDate = new Date().toDateString();
    const endDate1 = new Date('2021-01-09').toDateString();
    const endDate2 = new Date('3000-01-09').toDateString();
    expect(
      validateField(startDate, [{ type: ValidationTypes.BE_AFTER, strValues: [endDate1], validationMessage: '' }]),
    ).toEqual({ hasError: false });
    expect(
      validateField(startDate, [{ type: ValidationTypes.BE_AFTER, strValues: [endDate2], validationMessage: '' }]),
    ).toEqual({ hasError: true, errorMessage: `The value must be after ${endDate2}` });
    expect(
      validateField(startDate, [{ type: ValidationTypes.BE_AFTER, strValues: [''], validationMessage: 'test' }]),
    ).toEqual({ hasError: true, errorMessage: 'test' });

    const startTime = Date.now();
    const endTime1 = startTime - 10;
    expect(
      validateField(startTime, [
        { type: ValidationTypes.BE_AFTER, strValues: [endTime1.toString()], validationMessage: '' },
      ]),
    ).toEqual({ hasError: false });
    expect(
      validateField(endTime1, [
        { type: ValidationTypes.BE_AFTER, strValues: [startTime.toString()], validationMessage: '' },
      ]),
    ).toEqual({ hasError: true, errorMessage: `The value must be after ${startTime}` });
    expect(
      validateField(endTime1, [
        { type: ValidationTypes.BE_AFTER, strValues: [startTime.toString()], validationMessage: 'test' },
      ]),
    ).toEqual({ hasError: true, errorMessage: 'test' });
  });
  it('should validate BE_BEFORE type', () => {
    const startDate = new Date('2022-01-09').toString();
    const endDate1 = new Date('2023-01-09').toString();
    const endDate2 = new Date('2021-01-09').toString();

    expect(
      validateField(startDate, [
        { type: ValidationTypes.BE_BEFORE, strValues: [endDate1.toString()], validationMessage: '' },
      ]),
    ).toEqual({ hasError: false });
    expect(
      validateField(startDate, [
        { type: ValidationTypes.BE_BEFORE, strValues: [endDate2.toString()], validationMessage: '' },
      ]),
    ).toEqual({ hasError: true, errorMessage: `The value must be before ${endDate2}` });
    expect(
      validateField(startDate, [
        { type: ValidationTypes.BE_BEFORE, strValues: [endDate2.toString()], validationMessage: 'test' },
      ]),
    ).toEqual({ hasError: true, errorMessage: 'test' });

    const startTime = Date.now();
    const endTime1 = startTime + 10;
    expect(
      validateField(startTime, [
        { type: ValidationTypes.BE_BEFORE, strValues: [endTime1.toString()], validationMessage: '' },
      ]),
    ).toEqual({ hasError: false });
    expect(
      validateField(endTime1, [
        { type: ValidationTypes.BE_BEFORE, strValues: [startTime.toString()], validationMessage: '' },
      ]),
    ).toEqual({ hasError: true, errorMessage: `The value must be before ${startTime}` });
    expect(
      validateField(endTime1, [
        { type: ValidationTypes.BE_BEFORE, strValues: [startTime.toString()], validationMessage: 'test' },
      ]),
    ).toEqual({ hasError: true, errorMessage: 'test' });
  });
  it('should validate EMAIL type', () => {
    expect(validateField('ab-cd@amazon.com', [{ type: ValidationTypes.EMAIL, validationMessage: '' }])).toEqual({
      hasError: false,
    });
    expect(validateField('@amazon.com', [{ type: ValidationTypes.EMAIL, validationMessage: '' }])).toEqual({
      hasError: true,
      errorMessage: 'The value must be a valid email address',
    });
    expect(validateField('abcd', [{ type: ValidationTypes.EMAIL, validationMessage: 'test' }])).toEqual({
      hasError: true,
      errorMessage: 'test',
    });
  });
  it('should validate JSON type', () => {
    expect(validateField('{}', [{ type: ValidationTypes.JSON, validationMessage: '' }])).toEqual({
      hasError: false,
    });
    expect(validateField('{"name": "test"}', [{ type: ValidationTypes.JSON, validationMessage: '' }])).toEqual({
      hasError: false,
    });
    expect(validateField('\\\\', [{ type: ValidationTypes.JSON, validationMessage: 'test' }])).toEqual({
      hasError: true,
      errorMessage: 'test',
    });
    expect(validateField('', [{ type: ValidationTypes.JSON, validationMessage: 'test' }])).toEqual({
      hasError: false,
    });
  });
  it('should validate IP_ADDRESS type', () => {
    expect(validateField('192.168.1.1', [{ type: ValidationTypes.IP_ADDRESS, validationMessage: '' }])).toEqual({
      hasError: false,
    });
    expect(
      validateField('2001:0db8:85a3:0000:0000:8a2e:0370:7334', [
        { type: ValidationTypes.IP_ADDRESS, validationMessage: '' },
      ]),
    ).toEqual({ hasError: false });
    expect(validateField('1.1', [{ type: ValidationTypes.IP_ADDRESS, validationMessage: 'test' }])).toEqual({
      hasError: true,
      errorMessage: 'test',
    });
    expect(validateField('', [{ type: ValidationTypes.IP_ADDRESS, validationMessage: 'test' }])).toEqual({
      hasError: false,
    });
  });
  it('should validate URL type', () => {
    expect(validateField('http://amazon.com', [{ type: ValidationTypes.URL, validationMessage: '' }])).toEqual({
      hasError: false,
    });
    expect(validateField('mailto:amazon.com', [{ type: ValidationTypes.URL, validationMessage: '' }])).toEqual({
      hasError: false,
    });
    expect(validateField('.amazon.com', [{ type: ValidationTypes.URL, validationMessage: '' }])).toEqual({
      hasError: true,
      errorMessage: 'The value must be a valid URL that begins with a schema (i.e. http:// or mailto:)',
    });
    expect(validateField('/aws.com', [{ type: ValidationTypes.URL, validationMessage: 'test' }])).toEqual({
      hasError: true,
      errorMessage: 'test',
    });
  });

  it('should validate Phone type', () => {
    expect(validateField('kdj34324', [{ type: ValidationTypes.PHONE }])).toEqual({
      hasError: true,
      errorMessage: 'The value must be a valid phone number',
    });

    expect(validateField('2938493029', [{ type: ValidationTypes.PHONE, validationMessage: 'test' }])).toEqual({
      hasError: false,
    });

    expect(validateField('293 849 3029', [{ type: ValidationTypes.PHONE, validationMessage: 'test' }])).toEqual({
      hasError: false,
    });

    expect(validateField('293-849-3029', [{ type: ValidationTypes.PHONE, validationMessage: 'test' }])).toEqual({
      hasError: false,
    });

    expect(validateField('293 849-3029', [{ type: ValidationTypes.PHONE, validationMessage: 'test' }])).toEqual({
      hasError: false,
    });
  });

  it('should test value against all configured validations', () => {
    const validationList: FieldValidationConfiguration[] = [
      { type: ValidationTypes.START_WITH, strValues: ['he'], validationMessage: 'startFailed' },
      { type: ValidationTypes.END_WITH, strValues: ['o'], validationMessage: 'endFailed' },
    ];

    expect(validateField('hello', validationList)).toEqual({
      hasError: false,
    });
    expect(validateField('hey', validationList)).toEqual({
      hasError: true,
      errorMessage: 'endFailed',
    });
    expect(validateField('yes', validationList)).toEqual({
      hasError: true,
      errorMessage: 'startFailed',
    });
  });
});
