import React from 'react';
import { PageLayout } from '@components/layouts/page-layout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CreditCard, CreditCardBrand } from '@domain/types/common/credit-card';
import * as Yup from 'yup';
import CtaSecondary from '@components/buttons/cta-secondary';
import { FormikHelpers } from 'formik/dist/types';
import style from '@pages/add-credit-card/index.module.scss';
import TextInputFormField from '@components/inputs/text-input-form-field';
import { ExpiryDate } from '@components/inputs/expiry-date';
import DropdownSelect, { DropdownSelectProps } from '@components/inputs/dropdown-select';

export interface AddCreditCardDumbProps {
  onClick?: () => void;
  onSubmit: (values: CreditCard, formikHelpers: FormikHelpers<CreditCard>) => void | Promise<any>;

}

const initialValues: CreditCard = {
  CVV: '', cardNumber: '', expDate: '', brand: CreditCardBrand.Visa, cardholderName: '', address: {
    city: '', country: '', addressLine1: '', addressLine2: '', postalCode: '', state: '',
  },
};

const validationSchema = Yup.object({
  CVV: Yup.string().required('CVV is required'),
  cardNumber: Yup.string().required('Card Number is required'),
  expDate: Yup.string().required('Expiry Date is required'),
  brand: Yup.string().required('Brand is required'),
  cardholderName: Yup.string().required('Cardholder Name is required'),
  address: Yup.object({
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    addressLine1: Yup.string().required('Address Line 1 is required'),
    addressLine2: Yup.string(),
    postalCode: Yup.string().required('Postal Code is required'),
    state: Yup.string().required('State is required'),
  }),
});

export const AddCreditCardDumb = ({
                                    onClick, onSubmit,
                                  }: AddCreditCardDumbProps) => {
  return <PageLayout name={'Add Credit Card'} onClick={onClick}>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit,errors, values, setFieldValue }) => (<Form className={style.addCreditCard}>
        <h3>Card Information</h3>
        <div style={{ height: '16px' }} />
        <div>
          <TextInputFormField label={'Cardholder Name'}
                              onChanged={(value) => setFieldValue('cardholderName', value)}
          />
          <ErrorMessage name='cardholderName' />
        </div>
        <div style={{ height: '8px' }} />
        <div>
          <TextInputFormField label={'Card Number'}
                              onChanged={(value) => setFieldValue('cardNumber', value)}
          />
          <ErrorMessage name='cardNumber' />
        </div>
        <div style={{ height: '8px' }} />
        <div>
          <DropdownSelect initialValue={{ label: CreditCardBrand.Visa, value: CreditCardBrand.Visa }}
                          toggleWhenSelected={true}
                          options={Object.values(CreditCardBrand).map(value => ({
                            label: value, value,
                          }))} label={'Brand'} onSelect={(value) => setFieldValue('brand', value)} />
          <ErrorMessage name='brand' />
        </div>
        <div className={style.addCreditCard__row}>
          <div>
            <ExpiryDate onChange={(value) => setFieldValue('expDate', value)} />
            <ErrorMessage name='expDate' />
          </div>
          <div>
            <TextInputFormField onChanged={(value) => setFieldValue('CVV', value)} label={'CVV'}
                                type={'password'} />
            <ErrorMessage name='CVV' />
          </div>
        </div>
        <div style={{ height: '16px' }} />
        <h3>Address Information</h3>
        <div style={{ height: '16px' }} />
        <div>
          <TextInputFormField label={'Address Line 1'}
                              onChanged={(value) => setFieldValue('address.addressLine1', value)} />
          <ErrorMessage name={'address.addressLine1'} />
        </div>
        <div style={{ height: '8px' }} />
        <div>
          <TextInputFormField label={'Address Line 2'}
                              onChanged={(value) => setFieldValue('address.addressLine2', value)} />
          <ErrorMessage name={'address.addressLine2'} />
        </div>
        <div className={style.addCreditCard__row}>
          <div>
            <TextInputFormField label={'City'}
                                onChanged={(value) => setFieldValue('address.city', value)} />
            <ErrorMessage name={'address.city'} />
          </div>
          <div>
            <TextInputFormField label={'Country'}
                                onChanged={(value) => setFieldValue('address.country', value)} />
            <ErrorMessage name={'address.country'} />
          </div>

        </div>

        <div className={style.addCreditCard__row}>
          <div>
            <TextInputFormField label={'State'}
                                onChanged={(value) => setFieldValue('address.state', value)} />
            <ErrorMessage name={'address.state'} />
          </div>
          <div>
            <TextInputFormField label={'Postal Code'}
                                onChanged={(value) => setFieldValue('address.postalCode', value)} />
            <ErrorMessage name={'address.postalCode'} />
          </div>

        </div>
        <div style={{ height: '16px' }} />

        <CtaSecondary text={'Submit'} onClick={handleSubmit} />
      </Form>)}
    </Formik>
  </PageLayout>;
};
